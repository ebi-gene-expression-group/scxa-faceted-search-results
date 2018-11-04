import React from 'react'
import Enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetchMock from 'fetch-mock'

import { getRandomInt } from './TestUtils'

import FetchLoader from '../src/FetchLoader'
import CalloutAlert from '../src/CalloutAlert'

Enzyme.configure({ adapter: new Adapter() })

const DummyComponentClass = () => <div></div>

describe(`FetchLoader`, () => {
  beforeEach(() => {
    fetchMock.restore()
  })

  const props = {
    host: `glip/`,
    resource: `glops`,
    ResultElementClass: DummyComponentClass
  }

  const getRandomHttpErrorCode = () => getRandomInt(400, 600)

  test(`until the fetch promise is not resolved a loading message is displayed, then goes away`, async () => {
    fetchMock.get(`*`, `{"results":[]}`)
    const wrapper = shallow(<FetchLoader {...props} />)

    expect(wrapper.find(`#loader`)).toHaveLength(1)
    expect(wrapper.find(CalloutAlert)).toHaveLength(0)

    await wrapper.instance().componentDidMount()
    wrapper.update()

    expect(wrapper.find(`#loader`)).toHaveLength(0)
    expect(wrapper.find(CalloutAlert)).toHaveLength(0)
  })

  test(`renders an error message if request to the server returns 4xx or 5xx`, async () => {
    fetchMock.get(`*`, getRandomHttpErrorCode)
    const wrapper = shallow(<FetchLoader {...props} />)

    await wrapper.instance().componentDidMount()
    wrapper.update()
    expect(wrapper.find(CalloutAlert)).toHaveLength(1)
  })

  test(`renders an error message if the component does not receive JSON`, async () => {
    fetchMock.get(`*`, `Break the cycle, Morty. Rise above. Focus on the science`)
    const wrapper = shallow(<FetchLoader {...props} />)

    await wrapper.instance().componentDidMount()
    wrapper.update()
    expect(wrapper.find(CalloutAlert)).toHaveLength(1)
  })

  test(`renders an error message if the child receives invalid JSON (and the error boundary kicks in)`, async () => {
    fetchMock.get(`*`, `{}`)
    const wrapper = shallow(<FetchLoader {...props} />)

    const e = new Error(`They’re inside you building a monument to compromise!`)
    wrapper.instance().componentDidCatch(e, `Ruben’s seen some rough years, Morty.`)
    wrapper.update()
    expect(wrapper.find(CalloutAlert)).toHaveLength(1)
  })

  test(`re-fetches on props change and recovers from error if new fetch succeeds`, async () => {
    fetchMock.get(`/glip/glops`, getRandomHttpErrorCode)
    const wrapper = shallow(<FetchLoader {...props} />)

    await wrapper.instance().componentDidMount()
    wrapper.update()
    expect(wrapper.find(CalloutAlert)).toHaveLength(1)

    fetchMock.get(`/glops/glip`, `{"results":[]}`)
    wrapper.setProps({
      host: `glops/`,
      resource: `glip`
    })

    await wrapper.instance().componentDidUpdate()
    wrapper.update()
    expect(wrapper.find(CalloutAlert)).toHaveLength(0)
  })
})

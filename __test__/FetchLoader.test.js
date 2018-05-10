import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetchMock from 'fetch-mock'

import FetchLoader from '../src/FetchLoader'

Enzyme.configure({ adapter: new Adapter() })

// Stolen from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

describe(`FetchLoader`, () => {
  beforeEach(() => {
    fetchMock.restore()
  })

  const props = {
    host: `glip/`,
    resource: `glops`
  }

  const getRandomHttpErrorCode = () => getRandomInt(400, 600)

  test(`until the fetch promise is not resolved a loading message is displayed, then goes away`, async () => {
    fetchMock.get(`*`, `{}`)
    const wrapper = mount(<FetchLoader {...props} />)

    expect(wrapper.find(`#loader`)).toHaveLength(1)
    expect(wrapper.find(`.callout .alert`)).toHaveLength(0)
    await wrapper.instance().componentDidMount()
    wrapper.update()
    expect(wrapper.find(`#loader`)).toHaveLength(0)
    expect(wrapper.find(`.callout .alert`)).toHaveLength(0)
  })

  test(`renders an error message if request to the server returns 4xx or 5xx`, async () => {
    fetchMock.get(`*`, getRandomHttpErrorCode);
    const wrapper = mount(<FetchLoader {...props} />)

    await wrapper.instance().componentDidMount()
    wrapper.update()
    expect(wrapper.find(`.callout .alert`)).toHaveLength(1)
  })

  test(`renders an error message if the component does not receive JSON`, async () => {
    fetchMock.get(`*`, `Break the cycle, Morty. Rise above. Focus on the science`)
    const wrapper = mount(<FetchLoader {...props} />)

    await wrapper.instance().componentDidMount()
    wrapper.update()
    expect(wrapper.find(`.callout .alert`)).toHaveLength(1)
  })

  test(`renders an error message if the error boundary kicks in`, async () => {
    fetchMock.get(`*`, `{}`)
    const wrapper = mount(<FetchLoader {...props} />)

    const e = new Error(`They’re inside you building a monument to compromise!`)
    wrapper.instance().componentDidCatch(e, `Ruben’s seen some rough years, Morty.`)
    wrapper.update()
    expect(wrapper.find(`.callout .alert`)).toHaveLength(1)
  })

})
import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { getRandomInt, episodes, ExperimentTableHeader, ExperimentTableCard } from './TestUtils'

import FilterList from '../src/FilterList'

Enzyme.configure({ adapter: new Adapter() })

const props = {
  filteredResults: episodes,
  ResultsHeaderClass: ExperimentTableHeader,
  ResultElementClass: ExperimentTableCard
}

describe(`FilterList`, () => {
  test(`renders as many components of ResultElementClass as filtered results`, () => {
    const wrapper = mount(<FilterList {...props} filteredResults={episodes} />)
    expect(wrapper.find(`#title`)).toHaveLength(Object.keys(ExperimentTableHeader().titles).length-1)
    expect(wrapper.find(`#selected`)).toHaveLength(1)
    expect(wrapper.find(ExperimentTableCard)).toHaveLength(episodes.length)
  })

  test(`highlights the user selected table header`, () => {
    const titleNames = Object.keys(ExperimentTableHeader().titles)
    const wrapper = mount(<FilterList {...props} filteredResults={episodes} />)
    const mockState = (str) => {
      const splitStr = str.toLowerCase().split(' ').map((string, index)=>
        index === 0 ?
          string.charAt(0).toLowerCase() + string.substring(1) :
          string.charAt(0).toUpperCase() + string.substring(1)    
      )
      return splitStr.join('')
    }
    wrapper.setState({sortTitle: mockState(titleNames[getRandomInt(0, titleNames.length)])})
    expect(wrapper.find(`#title`)).toHaveLength(1)
    expect(wrapper.find(`#selected`)).toHaveLength(1)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<FilterList {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

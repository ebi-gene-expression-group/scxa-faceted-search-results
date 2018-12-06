import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { episodes, ExperimentTableHeader, ExperimentTableCard } from './TestUtils'

import FilterList from '../src/FilterList'

Enzyme.configure({ adapter: new Adapter() })

const props = {
  filteredResults: episodes,
  ResultsHeaderClass: ExperimentTableHeader,
  ResultElementClass: ExperimentTableCard
}

describe(`FilterList`, () => {
  test(`renders as many components of ResultElementClass as filtered results`, () => {
    const randomFilteredResults = episodes.filter(() => Math.random() > 0.5)
    console.log(Object.keys(ExperimentTableHeader().titles).length)
    const wrapper = mount(<FilterList {...props} filteredResults={randomFilteredResults}/>)
    expect(wrapper.find(`#title`)).toHaveLength(Object.keys(ExperimentTableHeader().titles).length)
    expect(wrapper.find(ExperimentTableCard)).toHaveLength(randomFilteredResults.length)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<FilterList {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

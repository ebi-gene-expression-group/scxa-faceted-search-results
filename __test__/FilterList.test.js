import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {getRandomInt, episodes, EpisodeCard} from './TestUtils'

import FilterList from '../src/FilterList'

Enzyme.configure({ adapter: new Adapter() })

const props = {
  filteredResults: episodes,
  ResultElementClass: EpisodeCard
}

describe(`FilterList`, () => {
  test(`renders as many components of ResultElementClass as filtered results`, () => {
    const wrapper = shallow(<FilterList {...props} />)
    expect(wrapper.find(props.ResultElementClass)).toHaveLength(props.filteredResults.length)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<FilterList {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

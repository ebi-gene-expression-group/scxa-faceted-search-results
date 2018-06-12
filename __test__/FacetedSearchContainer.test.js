import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {getRandomInt, episodes, EpisodeCard} from './TestUtils'

import FacetedSearchContainer from '../src/FacetedSearchContainer'
import FilterSidebar from '../src/FilterSidebar'

Enzyme.configure({ adapter: new Adapter() })

const props = {
  results: episodes,
  checkboxFacetGroups: [`Season`],
  ResultElementClass: EpisodeCard
}

describe(`FilterList`, () => {
  test(`when results have no facets only the results list is displayed`, () => {
    const wrapperWithFacets = mount(<FacetedSearchContainer {...props} />)
    expect(wrapperWithFacets.find(FilterSidebar)).toHaveLength(1)
    const wrapperWithoutFacets = mount(<FacetedSearchContainer {...props} results={props.results.map((result) => ({element: result.element}))}/>)
    expect(wrapperWithoutFacets.find(FilterSidebar)).toHaveLength(0)
  })

  test(`clicking on facets works`, () => {
    const wrapper = mount(<FacetedSearchContainer {...props} />)
    wrapper.find(FilterSidebar).find({ type: `checkbox` }).first(0).simulate(`change`)
    expect(wrapper.find(EpisodeCard).length).toBeLessThan(props.results.length)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<FacetedSearchContainer {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

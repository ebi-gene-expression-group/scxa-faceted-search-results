import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {getRandomInt, episodes} from './TestUtils'

import FilterSidebar from '../src/FilterSidebar'
import CheckboxFacetGroup from '../src/facetgroups/CheckboxFacetGroup'
import MultiselectDropdownFacetGroup from '../src/facetgroups/MultiselectDropdownFacetGroup'

Enzyme.configure({ adapter: new Adapter() })

describe(`FilterSidebar`, () => {
  const props = {
    results: episodes,
    checkboxFacetGroups: [`Season`],
    onChange: () => {}
  }

  test(`shows checbox facet groups above dropdown filters`, () => {
    const wrapper = mount(<FilterSidebar {...props} />)
    expect(wrapper.find(`h4`).first().text()).toEqual(props.checkboxFacetGroups[0])
    expect(wrapper.find(`h4`).last().text()).not.toEqual(props.checkboxFacetGroups[0])
  }),

  test(`doesn’t display duplicates`, () => {
    const allFacets = episodes.reduce((acc, episode) => acc.concat(episode.facets), [])
    const uniqueFacetsByGroup =
      allFacets
        .filter((facet, index) => allFacets.findIndex((thatFacet) => facet.value === thatFacet.value) === index)
        .reduce((acc, facet) => {
          acc[facet.group] = (acc[facet.group] || []).concat(facet.value)
          return acc
        }, {})

    const wrapper = mount(<FilterSidebar {...props} />)

    wrapper.find(CheckboxFacetGroup).forEach(
      (facetGroup) =>
        expect(facetGroup.props().facets).toHaveLength(uniqueFacetsByGroup[facetGroup.props().facetGroupName].length))

    wrapper.find(MultiselectDropdownFacetGroup).forEach(
      (facetGroup) =>
        expect(facetGroup.props().facets).toHaveLength(uniqueFacetsByGroup[facetGroup.props().facetGroupName].length))
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<FilterSidebar {...props}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

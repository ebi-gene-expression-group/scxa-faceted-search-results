import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import _ from 'lodash'

import {getRandomInt, episodes} from './TestUtils'

import FilterSidebar from '../src/FilterSidebar'
import CheckboxFacetGroup from '../src/facetgroups/CheckboxFacetGroup'

Enzyme.configure({ adapter: new Adapter() })

describe(`FilterSidebarCheckboxDropdownFacetGroup`, () => {
  const allFacets = episodes.reduce((acc, episode) => acc.concat(episode.facets), [])
  const uniqueFacets =
    allFacets
      .filter((facet, index) => allFacets.findIndex((thatFacet) => facet.value === thatFacet.value) === index)
      .map((facet) => ({
        ...facet,
        disabled: false
      }))

  const props = {
    facets: uniqueFacets,
    checkboxFacetGroups: [`Season`],
    facetGroupName: `Planet`,
    facetGroupNameDescription: `Planet tooltip`,
    onChange: () => {}
  }

  const noTooltipProps = {
    facets:[
          {
            group: `Guest character`,
            value: `birdperson`,
            label: `Birdperson`,
            description:``,
          }],
    checkboxFacetGroups: [`Season`],
    facetGroupName: `Planet`,
    onChange: () => {}
  }

  test(`checks wether tooltip exists`, () => {
    const wrapper = mount(<CheckboxFacetGroup facetGroupName= {props.facetGroupName}
                                                            facetGroupNameDescription={props.facetGroupNameDescription}
                                                            facets={props.facets}
                                                            onChange={props.onChange}
                                                            key={props.facetGroupName} />)
    expect(wrapper.find(`sup`).first().html()).toEqual(expect.stringMatching(`data-tooltip`))
  })

  test(`checks tooltip does not exist when no tooltip text in payload`, () => {
    const wrapper = mount(<CheckboxFacetGroup facetGroupName= {noTooltipProps.facetGroupName}
                                                            facetGroupNameDescription={""}
                                                            facets={noTooltipProps.facets}
                                                            onChange={noTooltipProps.onChange}
                                                            key={noTooltipProps.facetGroupName} />)
    expect(wrapper.find(`sup`).exists()).toEqual(false)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<CheckboxFacetGroup facetGroupName= {props.facetGroupName}
                                                            facetGroupNameDescription={props.facetGroupNameDescription}
                                                            facets={props.facets}
                                                            onChange={props.onChange}
                                                            key={props.facetGroupName} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {getRandomInt, episodes} from './TestUtils'

import MultiselectDropdownFacetGroup from '../src/facetgroups/MultiselectDropdownFacetGroup'

Enzyme.configure({ adapter: new Adapter() })

describe(`MultiselectDropdownFacetGroup`, () => {
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
            label: `Birdperson`
          }],
    checkboxFacetGroups: [`Season`],
    facetGroupName: `Planet`,
    onChange: () => {}
  }

  test(`checks whether tooltip exists`, () => {
    const groups = [...new Set(uniqueFacets.map((facet) => facet.group))]
    const descriptions = [...new Set(uniqueFacets.map((facet) => facet.description))]
    const randomMultiselectFacetGroup = groups[getRandomInt(0, groups.length)]
    const randomMultiselectFacetGroupDescription = descriptions[getRandomInt(0, descriptions.length)]

    const wrapper = mount(<MultiselectDropdownFacetGroup facetGroupName= {randomMultiselectFacetGroup}
                                                            facetGroupNameDescription={randomMultiselectFacetGroupDescription}
                                                            facets={props.facets}
                                                            onChange={props.onChange}
                                                            key={randomMultiselectFacetGroup} />)
    expect(wrapper.find(`sup`).first().html()).toEqual(expect.stringMatching(`data-tooltip`))
  })

  test(`checks tooltip does not exist when no tooltip text in payload`, () => {
    const wrapper = mount(<MultiselectDropdownFacetGroup facetGroupName= {noTooltipProps.facetGroupName}
                                                            facetGroupNameDescription={null}
                                                            facets={noTooltipProps.facets}
                                                            onChange={noTooltipProps.onChange}
                                                            key={noTooltipProps.facetGroupName} />)
    expect(wrapper.find(`sup`).exists()).toEqual(false)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<MultiselectDropdownFacetGroup facetGroupName= {props.facetGroupName}
                                                            facetGroupNameDescription={props.facetGroupNameDescription}
                                                            facets={props.facets}
                                                            onChange={props.onChange}
                                                            key={props.facetGroupName} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

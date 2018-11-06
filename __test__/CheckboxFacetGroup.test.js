import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { getRandomInt, episodes } from './TestUtils'

import CheckboxFacetGroup from '../src/facetgroups/CheckboxFacetGroup'

Enzyme.configure({ adapter: new Adapter() })

describe(`CheckboxFacetGroup`, () => {
  const allFacets = episodes.reduce((acc, episode) => acc.concat(episode.facets), [])
  const uniqueFacets =
    allFacets
      .filter((facet, index) => allFacets.findIndex((thatFacet) => facet.value === thatFacet.value) === index)
      .map((facet) => ({
        ...facet,
        disabled: false
      }))

  const props = {
    facetGroupName: `Planet`,
    facetGroupNameDescription: `Planets where the events of this episode take place`,
    facets: uniqueFacets,
    onChange: () => {}
  }

  const noTooltipProps = {
    facetGroupName: `Planet`,
    facets: [{
      group: `Guest character`,
      value: `birdperson`,
      label: `Birdperson`
    }],
    onChange: () => {}
  }

  test(`checks whether tooltip exists`, () => {
    const groups = [...new Set(uniqueFacets.map((facet) => facet.group))]
    const descriptions = [...new Set(uniqueFacets.map((facet) => facet.description))]
    const randomCheckboxFacetGroup = groups[getRandomInt(0, groups.length)]
    const randomCheckboxFacetGroupDescription = descriptions[getRandomInt(0, descriptions.length)]

    const wrapper =
      mount(
        <CheckboxFacetGroup
          facetGroupName= {randomCheckboxFacetGroup}
          facetGroupNameDescription={randomCheckboxFacetGroupDescription}
          facets={props.facets}
          onChange={props.onChange}
          key={randomCheckboxFacetGroup} />)
    expect(wrapper.find(`sup`).first().html()).toEqual(expect.stringMatching(`data-tooltip`))
  })

  test(`checks tooltip does not exist when no tooltip text in payload`, () => {
    const wrapper =
      mount(
        <CheckboxFacetGroup
          facetGroupName= {noTooltipProps.facetGroupName}
          facetGroupNameDescription={null}
          facets={noTooltipProps.facets}
          onChange={noTooltipProps.onChange}
          key={noTooltipProps.facetGroupName} />)
    expect(wrapper.find(`sup`).exists()).toEqual(false)
  })

  test(`matches snapshot`, () => {
    const tree =
      renderer.create(
        <CheckboxFacetGroup
          facetGroupName= {props.facetGroupName}
          facetGroupNameDescription={props.facetGroupNameDescription}
          facets={props.facets}
          onChange={props.onChange}
          key={props.facetGroupName} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

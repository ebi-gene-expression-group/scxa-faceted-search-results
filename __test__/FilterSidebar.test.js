import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { getRandomInt, episodes } from './TestUtils'

import FilterSidebar from '../src/FilterSidebar'

Enzyme.configure({ adapter: new Adapter() })

describe(`FilterSidebar`, () => {
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
    results: episodes,
    onChange: () => {}
  }

  console.log(uniqueFacets)
  const noTooltipProps = {
    facets:[
      {
        group: `Guest character`,
        value: `birdperson`,
        label: `Birdperson`
      }],
    results: episodes,
    checkboxFacetGroups: [`Season`],
    onChange: () => {}
  }

  test(`shows checkbox facet groups above dropdown filters`, () => {
    const groups = [...new Set(uniqueFacets.map((facet) => facet.group))]
    const randomCheckboxFacetGroup = groups[getRandomInt(0, groups.length)]
    const wrapper = mount(<FilterSidebar {...props} checkboxFacetGroups={[randomCheckboxFacetGroup]} />)
    expect(wrapper.find(`h4`).first().text()).toEqual(expect.stringMatching(randomCheckboxFacetGroup))
    expect(wrapper.find(`h4`).last().text()).not.toEqual(expect.stringMatching(randomCheckboxFacetGroup))
  })

  test(`checks whether tooltip exists`, () => {
    const groups = [...new Set(uniqueFacets.map((facet) => facet.group))]
    const randomCheckboxFacetGroup = groups[getRandomInt(0, groups.length)]
    const wrapper = mount(<FilterSidebar {...props} checkboxFacetGroups={[randomCheckboxFacetGroup]} />)
    expect(wrapper.find(`sup`).first().html()).toEqual(expect.stringMatching(`data-tip`))
  })

  test(`checks tooltip does not exist when no tooltip text in payload`, () => {
    const groups = [...new Set(uniqueFacets.map((facet) => facet.group))]
    const randomCheckboxFacetGroup = groups[getRandomInt(0, groups.length)]
    const wrapper = mount(<FilterSidebar {...noTooltipProps} checkboxFacetGroups={[randomCheckboxFacetGroup]} />)
    expect(wrapper.find(`sup`).exists()).toEqual(false)
  })

  test(`hides checkbox if all results share the same facets`, () => {

    const sameSpecies = [
      { group: `Species`,
        value: `gazorpazorp`,
        label: `Gazorpazorp`,
        description: `Planets where events in this episode take place`,
        disabled: false },
      { group: `Species`,
        value: `gazorpazorp`,
        label: `Gazorpazorp`,
        description: `Planets where events in this episode take place`,
        disabled: false },
      { group: `Species`,
        value: `gazorpazorp`,
        label: `Gazorpazorp`,
        description: `Planets where events in this episode take place`,
        disabled: false },
      { group: `Guest character`,
        value: `gwendolyn`,
        label: `Gwendolyn`,
        description:
              `Guest characters that tag along for the adventures in this episodes`,
        disabled: false },
      { group: `Season`,
        value: `1`,
        label: `Season 1`,
        disabled: false },
      { group: `Guest character`,
        value: `birdperson`,
        label: `Birdperson`,
        description:
              `Guest characters that tag along for the adventures in this episodes`,
        disabled: false },
      { group: `Guest character`,
        value: `squanchy`,
        label: `Squanchy`,
        description:
              `Guest characters that tag along for the adventures in this episodes`,
        disabled: false },
      { group: `Season`,
        value: `2`,
        label: `Season 2`,
        disabled: false },
      { group: `Season`,
        value: `3`,
        label: `Season 3`,
        disabled: false },
      { group: `Season`,
        value: `3`,
        label: `Season 3`,
        disabled: false }]

    const wrapper = mount(<FilterSidebar facets={sameSpecies} checkboxFacetGroups={[`Species`]} results={episodes} onChange={() => {}} />)
    expect(wrapper.find({ type: `checkbox` }).length).toBeLessThan(sameSpecies.length)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<FilterSidebar {...props}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

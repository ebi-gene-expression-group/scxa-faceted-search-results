import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import randomWords from 'random-words'
import {getRandomInt, episodesFacets} from './TestUtils'

import FilterSidebar from '../src/FilterSidebar'
import CheckboxFacetGroup from '../src/facetgroups/CheckboxFacetGroup'
import MultiselectDropdownFacetGroup from '../src/facetgroups/MultiselectDropdownFacetGroup'

Enzyme.configure({ adapter: new Adapter() })

describe(`FilterSidebar`, () => {
  const NUMBER_OF_GROUPS = 4
  const NUMBER_OF_FACETS = 20

  const groups = randomWords({min: 2, max: 4})

  const facets =
    [...Array(NUMBER_OF_FACETS).keys()]
      .map(
        () => ({
          group: groups[getRandomInt(0, groups.length)],
          label: randomWords(),
          value: randomWords(),
          disabled: false
        }))


  const props = {
    facets: facets,
    checkboxFacetGroups: [groups[getRandomInt(0, groups.length)]],
    onChange: () => {}
  }

  test(`shows checbox facet groups above dropdown filters`, () => {
    const wrapper = mount(<FilterSidebar {...props} />)
    expect(wrapper.find(`h4`).first().text()).toEqual(props.checkboxFacetGroups[0])
    expect(wrapper.find(`h4`).last().text()).not.toEqual(props.checkboxFacetGroups[0])
  }),

  test(`matches snapshot`, () => {
    const tree =
      renderer
        .create(<FilterSidebar facets={episodesFacets} checkboxFacetGroups={[`Season`]} onChange={() => {}}/>)
        .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

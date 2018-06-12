import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {getRandomInt, episodes, EpisodeCard} from './TestUtils'

import FilterList from '../src/FilterList'

Enzyme.configure({ adapter: new Adapter() })

const props = {
  results: episodes,
  selectedFacets: {},
  checkboxFacetGroups: [`Season`],
  ResultElementClass: EpisodeCard
}

describe(`FilterList`, () => {
  test(`shows all results when no facets are selected`, () => {
    const wrapper = mount(<FilterList {...props} />)
    expect(wrapper.find(EpisodeCard)).toHaveLength(props.results.length)
  })

  test(`shows a subset of results which match the selected facet`, () => {
    const randomEpisode = props.results[getRandomInt(0, props.results.length)]
    const randomFacet = randomEpisode.facets[getRandomInt(0, randomEpisode.facets.length)]

    const selectedFacets = { [randomFacet.group]: [randomFacet.value] }

    const wrapper = mount(<FilterList {...props} selectedFacets={selectedFacets}/>)
    expect(wrapper.find(EpisodeCard).length).toBeLessThan(props.results.length)
    expect(wrapper.find(EpisodeCard).map(e => e.props())).toContainEqual(randomEpisode.element)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<FilterList {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

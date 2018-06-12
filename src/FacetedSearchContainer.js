import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import FilterSidebar from './FilterSidebar'
import FilterList from './FilterList'

import {ResultPropTypes} from './ResultPropTypes'

class FacetedSearchContainer extends React.Component {
  constructor(props) {
    super(props)

    // TODO Build initial state of checked filters from props if wrapping in React Router to make it RESTful
    this.state = {
      selectedFacets: {}
    }

    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(facetGroupName, facets) {
    const _selectedFacets = _.defaultsDeep({}, this.state.selectedFacets)
    _selectedFacets[facetGroupName] = facets.map((facet) => facet.value)  // Store values only, discard labels

    const nextSelectedFacets =
      Object.keys(_selectedFacets)
        .filter((key) => _selectedFacets[key] && _selectedFacets[key].length > 0)
        .reduce((acc, key) => {
          acc[key] = _selectedFacets[key]
          return acc
        }, {})

    this.setState({
      selectedFacets: nextSelectedFacets
    })
  }

  render() {
    const {results} = this.props
    const {selectedFacets} = this.state

    const {checkboxFacetGroups} = this.props
    const {ResultElementClass, resultsMessage} = this.props

    const resultsHaveFacets =
      results.some((result) =>
        result.facets &&
        result.facets.some((facet) =>
          typeof(facet.group) === `string` && typeof(facet.value) === `string` && typeof(`label`) === `string` &&
          facet.group.length && facet.value.length && facet.value.length))

    return(
      <div className={`row expanded`}>
        { resultsHaveFacets &&
          <div className={`small-12 medium-2 columns`}>
            <FilterSidebar {...{results, selectedFacets, checkboxFacetGroups}}
                           onChange={this._handleChange}/>
          </div>
        }
        <div className={`small-12 medium-10 columns`}>
          <FilterList {...{results, selectedFacets, resultsMessage, ResultElementClass}} />
        </div>
      </div>
    )
  }
}

FacetedSearchContainer.propTypes = {
  // A list of results from where facets can be inferred by inspecting each result’s facets field
  // Supplied by FetchLoader, or set manually for testing
  results: PropTypes.arrayOf(ResultPropTypes).isRequired,
  checkboxFacetGroups: PropTypes.arrayOf(PropTypes.string),
  resultsMessage: PropTypes.string,
  // Must be a class that extends React.Component, sadly there’s no such prop type :(
  // See also https://stackoverflow.com/questions/45315918/react-proptypes-component-class
  ResultElementClass: PropTypes.func.isRequired
}

FacetedSearchContainer.defaultProps = {
  resultsMessage: ``,
  checkboxFacetGroups: []
}

export default FacetedSearchContainer

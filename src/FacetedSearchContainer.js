import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import FilterSidebar from './FilterSidebar'
import FilterList from './FilterList'

import {ResultPropTypes} from './ResultPropTypes'

class FacetedSearchContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      facets:
        _(props.results)
          .flatMap(`facets`)
          .uniqWith(_.isEqual)
          .map((facet) => ({...facet, disabled: false}))
          .value(),
      selectedFacets: {}  // TODO (?) Build initial state of checked filters from props if wrapped in React Router
    }

    this._handleChange = this._handleChange.bind(this)
  }

  _filterResults(facets) {
    return this.props.results.filter((result) =>
      // Leave the results that, for every group, have at least one matching property within that group
      // Note: every returns true for empty arrays
      Object.entries(facets)
        .every(
          ([facetGroup, facetValues]) =>
            result.facets.some(
              (resultFacet) =>
                facetGroup === resultFacet.group && facetValues.map(f => f.value).includes(resultFacet.value))))
  }

  _hasNoResults(selectedFacets, additionalFacet) {
    const mergedFacets =
      _.mergeWith(
        _.defaultsDeep({}, selectedFacets),
        {[additionalFacet.group]: additionalFacet},
        (objValue, srcValue) => _.uniq((objValue || []).concat(srcValue))
      )

    return this._filterResults(mergedFacets).length === 0
  }

  _handleChange(facetGroup, selectedFacetsInGroup) {
    const _selectedFacets = _.defaultsDeep({}, this.state.selectedFacets)
    _selectedFacets[facetGroup] = selectedFacetsInGroup

    const nextSelectedFacets =
       Object.keys(_selectedFacets)
         .filter((key) => _selectedFacets[key] && _selectedFacets[key].length > 0)
         .reduce((acc, key) => {
           acc[key] = _selectedFacets[key]
           return acc
         }, {})

     const previousNumberOfSelectedFacetsInGroup = this.state.selectedFacets[facetGroup] ?
       this.state.selectedFacets[facetGroup].length : 0

    // if (_selectedFacets[facetGroup].length == previousNumberOfSelectedFacetsInGroup) // Unreachable !
    const nextFacets = _selectedFacets[facetGroup].length > previousNumberOfSelectedFacetsInGroup ?
      // Facet added: check enabled facets in other groups and disable them if they produce no results
      _.cloneDeep(this.state.facets)
        .map((facet) => ({
          ...facet,
          disabled:
            facet.group !== facetGroup ?
              facet.disabled ? true : this._hasNoResults(nextSelectedFacets, facet) :
              facet.disabled
        })) :
        // Facet removed: check disabled facets in other groups and enable them if they produce results
        _.cloneDeep(this.state.facets)
          .map((facet) => ({
            ...facet,
            disabled:
              facet.group !== facetGroup ?
                facet.disabled ? this._hasNoResults(nextSelectedFacets, facet) : false :
                facet.disabled
          }))

    this.setState({
       facets: nextFacets,
       selectedFacets: nextSelectedFacets
    })
  }

  render() {
    const {results} = this.props
    const {checkboxFacetGroups} = this.props

    const {ResultElementClass, resultsMessage} = this.props
    const {facets, selectedFacets} = this.state

    return(
      <div className={`row expanded`}>
        <div className={`small-12 medium-2 columns`}>
          <FilterSidebar {...{facets, checkboxFacetGroups}} onChange={this._handleChange}/>
        </div>

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

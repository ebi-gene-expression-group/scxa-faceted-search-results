import React from 'react'
import ReactTooltip from 'react-tooltip'
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
          .compact()   // lodash will emit undefined if `facets` doesn’t exist :/
          .uniqWith(_.isEqual)
          .map((facet) => ({...facet, disabled: false}))
          .value(),
      selectedFacets: {} , // TODO (?) Build initial state of checked filters from props if wrapped in React Router,
      currentSelection: ``
    }

    this._handleChange = this._handleChange.bind(this)
    this._clearFacets = this._clearFacets.bind(this)
  }

  _clearFacets(facets, filteredResults){
    const groupedFacetByResults = filteredResults.map( result => _.groupBy(result.facets,`group`))
    const groupedFacetByAll = Object.keys(_.groupBy(facets,`group`))

    const clearedFacet = groupedFacetByAll.filter(group => !groupedFacetByResults.every((result, idx, results) => _.isEqual(result[group],results[0][group])))
    //clear shared facets in the initial search results and disable the facets after user selection in side bar, except the current selected facet
    return facets.map(facet => {return {...facet, disabled: this.state.currentSelection!==facet.group && !clearedFacet.includes(facet.group)}})
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

  _disableEnabledFacetsWithNoResults(selectedFacets, facetGroup) {
    return _.cloneDeep(this.state.facets)
      .map((facet) => ({
        ...facet,
        disabled:
          facet.group !== facetGroup ?
            facet.disabled ? true : this._hasNoResults(selectedFacets, facet) :
            facet.disabled
      }))
  }

  _enableDisabledFacetsWithResults(selectedFacets, facetGroup) {
    return _.cloneDeep(this.state.facets)
      .map((facet) => ({
        ...facet,
        disabled:
          facet.group !== facetGroup ?
            facet.disabled ? this._hasNoResults(selectedFacets, facet) : false :
            facet.disabled
      }))
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

    let nextFacets = {}
    if (_selectedFacets[facetGroup].length > previousNumberOfSelectedFacetsInGroup) {
      if (_selectedFacets[facetGroup].length === 1) {
        // First facet in group selected: less results, disable enabled facets
        nextFacets = this._disableEnabledFacetsWithNoResults(nextSelectedFacets, facetGroup)
      } else {
        // Add a second or subsequent facet to a group: more results, enable disabled facets
        nextFacets = this._enableDisabledFacetsWithResults(nextSelectedFacets, facetGroup)
      }
    } else {
      if (_selectedFacets[facetGroup].length === 0) {
        // No facets in group selected: more results, enable disabled facets
        nextFacets = this._enableDisabledFacetsWithResults(nextSelectedFacets, facetGroup)
      } else {
        // Facet has been deselected but others in group remain: less results, disable enabled facets
        nextFacets = this._disableEnabledFacetsWithNoResults(nextSelectedFacets, facetGroup)
      }
    }

    this.setState({
      facets: nextFacets,
      selectedFacets: nextSelectedFacets,
      currentSelection: facetGroup
    })
  }

  render() {
    const {facets, selectedFacets} = this.state
    const {checkboxFacetGroups, ResultElementClass, ResultsHeaderClass, resultsMessage, results} = this.props
    const clearedFacets = this._clearFacets(facets, this._filterResults(selectedFacets))

    return(
      <div className={`row expanded`}>
        {
          facets.length > 0 &&
          <div className={`small-12 medium-4 large-3 columns`}>
            <FilterSidebar {...{checkboxFacetGroups, results}} facets={clearedFacets} onChange={this._handleChange}/>
          </div>
        }

        <div className={`small-12 medium-8 large-9 columns`}>
          <FilterList {...{resultsMessage, ResultElementClass, ResultsHeaderClass}}
            filteredResults={this._filterResults(selectedFacets)}/>
        </div>
        <ReactTooltip effect={`solid`}/>
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
  // Must be classes that extends React.Component, sadly there’s no such prop type :(
  // See also https://stackoverflow.com/questions/45315918/react-proptypes-component-class
  ResultsHeaderClass: PropTypes.func,
  ResultElementClass: PropTypes.func.isRequired
}

FacetedSearchContainer.defaultProps = {
  resultsMessage: ``,
  checkboxFacetGroups: []
}

export default FacetedSearchContainer

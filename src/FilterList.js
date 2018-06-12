import React from 'react'
import PropTypes from 'prop-types'
import {ResultPropTypes} from './ResultPropTypes'

const FilterList = ({results, selectedFacets, title, ResultElementClass}) => {
  const filteredElements =
    results.filter((result) =>
      // Results that have at least one matching facet (some) in all (every) selected groups
      Object.entries(selectedFacets)
        .every(([selectedFacetName, selectedFacetValues]) =>
          result.facets.some((resultFacet) =>
            selectedFacetName === resultFacet.group && selectedFacetValues.includes(resultFacet.value))))
        .map((result) => result.element)

  return (
    <div>
      <h4>{title}</h4>
      {filteredElements.map((element, index) => <div key={index}><ResultElementClass {...element}/></div>)}
    </div>
  )
}

FilterList.propTypes = {
  results: PropTypes.arrayOf(ResultPropTypes).isRequired,
  selectedFacets: PropTypes.object,
  title: PropTypes.string,
  ResultElementClass: PropTypes.func.isRequired
}

FilterList.defaultProps = {
  title: ``,
  selectedFacets: {}
}

export default FilterList

import React from 'react'
import PropTypes from 'prop-types'
import CheckboxFacetGroup from './facetgroups/CheckboxFacetGroup'
import MultiselectDropdownFacetGroup from './facetgroups/MultiselectDropdownFacetGroup'
import _ from "lodash"

import {ResultPropTypes} from './ResultPropTypes'

const FilterSidebar = ({facets, checkboxFacetGroups, onChange}) => {
  const facetGroups =
      _(facets)
        .sortBy([`group`, `label`])
        .groupBy(`group`)
        .toPairs()
        .partition((facetGroup) => checkboxFacetGroups.includes(facetGroup[0]))
        .value()

  // Facets as checkboxes go first by design
  return(
    [
      facetGroups[0]
        .map((facetGroup) => facetGroup &&
             <CheckboxFacetGroup facetGroupName={facetGroup[0]}
               facetGroupNameDescription={facetGroup[1][0].description}
               facets={facetGroup[1]}
               onChange={onChange}
               key={facetGroup[0]} />),
      facetGroups[1]
        .map((facetGroup) =>
          <MultiselectDropdownFacetGroup facetGroupName={facetGroup[0]}
            facetGroupNameDescription={facetGroup[1][0].description}
            facets={facetGroup[1]}
            onChange={onChange}
            key={facetGroup[0]} />)
    ]
  )
}

FilterSidebar.propTypes = {
  facets: PropTypes.arrayOf(PropTypes.array).isRequired,
  checkboxFacetGroups: PropTypes.arrayOf(PropTypes.string),
  results: PropTypes.arrayOf(ResultPropTypes).isRequired,
  onChange: PropTypes.func.isRequired
}

export default FilterSidebar
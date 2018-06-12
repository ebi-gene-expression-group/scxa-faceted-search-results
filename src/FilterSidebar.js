import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import FacetGroupPropTypes from './facetgroups/FacetGroupPropTypes'
import CheckboxFacetGroup from './facetgroups/CheckboxFacetGroup'
import MultiselectDropdownFacetGroup from './facetgroups/MultiselectDropdownFacetGroup'

const FilterSidebar = ({hideFacetGroupNames, checkboxFacetGroups, facets, onChange}) => {
  const facetGroups =
    _(facets)
      // Alternative (but I think uniqWith reads better): .uniqBy((facet) => facet.group + facet.name)
      .uniqWith((thisFacet, thatFacet) => thisFacet.group === thatFacet.group && thisFacet.value === thatFacet.value)
      .groupBy('group')
      .toPairs()
      .partition((facetGroup) => checkboxFacetGroups.includes(facetGroup[0]))
      .value()

  // Facets as checkboxes go first by design
  return(
    [
      facetGroups[0]
        .map((facetGroup) => <CheckboxFacetGroup facetGroupName={facetGroup[0]}
                                                 facets={facetGroup[1]}
                                                 onChange={onChange}
                                                 key={facetGroup[0]} />),
      facetGroups[1]
        .map((facetGroup) => <MultiselectDropdownFacetGroup facetGroupName={facetGroup[0]}
                                                            facets={facetGroup[1]}
                                                            onChange={onChange}
                                                            key={facetGroup[0]} />)
    ]
  )
}

FilterSidebar.propTypes = {
  results: PropTypes.arrayOf(ResultPropTypes).isRequired,
  checkboxFacetGroups: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired
}

FilterSidebar.defaultProps = {
  checkboxFacetGroups: [],
  hideFacetGroupNames: []
}

export default FilterSidebar

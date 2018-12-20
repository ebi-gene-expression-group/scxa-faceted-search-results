import React from 'react'
import PropTypes from 'prop-types'

import CheckboxFacetGroup from './facetgroups/CheckboxFacetGroup'
import MultiselectDropdownFacetGroup from './facetgroups/MultiselectDropdownFacetGroup'

import {FacetPropTypes} from './ResultPropTypes'

const FilterSidebar = ({facetGroups, onChange}) => {

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
  facets: PropTypes.arrayOf(PropTypes.shape({
    ...FacetPropTypes,
    disabled: PropTypes.bool.isRequired})).isRequired,
  checkboxFacetGroups: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired
}

FilterSidebar.defaultProps = {
  checkboxFacetGroups: []
}

export default FilterSidebar
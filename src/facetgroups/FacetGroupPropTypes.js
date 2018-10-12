import PropTypes from 'prop-types'

import {FacetPropTypes} from '../ResultPropTypes'
//import {FacetTooltipPropTypes} from '../ResultPropTypes'

const FacetGroupPropTypes = {
  facetGroupName: PropTypes.string.isRequired,
  facets: PropTypes.arrayOf(PropTypes.shape({
    ...FacetPropTypes,
    disabled: PropTypes.bool.isRequired})).isRequired,
  //facetGroupNameDescription: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default FacetGroupPropTypes

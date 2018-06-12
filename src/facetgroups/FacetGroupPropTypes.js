import PropTypes from 'prop-types'

import {FacetPropTypes} from '../ResultPropTypes'

const FacetGroupPropTypes = {
  facetGroupName: PropTypes.string.isRequired,
  facets: PropTypes.arrayOf(FacetPropTypes).isRequired,
  onChange: PropTypes.func.isRequired
}

export default FacetGroupPropTypes

import PropTypes from 'prop-types'

const FacetGroupPropTypes = {
  facetGroupName: PropTypes.string.isRequired,
  facets: PropTypes.arrayOf(PropTypes.shape({
    // Passed but not used:
    // group: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired
}

export default FacetGroupPropTypes

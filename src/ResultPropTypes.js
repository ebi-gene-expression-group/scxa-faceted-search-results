import PropTypes from 'prop-types'

const FacetPropTypes = PropTypes.shape({
  group: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
})

const ResultPropTypes = PropTypes.shape({
  element: PropTypes.object.isRequired,
  facets: PropTypes.arrayOf(FacetPropTypes)
})

export {FacetPropTypes, ResultPropTypes}

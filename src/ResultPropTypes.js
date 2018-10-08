import PropTypes from 'prop-types'

const FacetPropTypes = {
  group: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

const FacetTooltipPropTypes = {
	group: PropTypes.string.isRequired,
	description: PropTypes.string
}

const ResultPropTypes = PropTypes.shape({
  element: PropTypes.object.isRequired,
  facets: PropTypes.arrayOf(PropTypes.shape(FacetPropTypes)),
  facetTooltips: PropTypes.arrayOf(PropTypes.shape(FacetTooltipPropTypes))
})

export {FacetPropTypes, ResultPropTypes}

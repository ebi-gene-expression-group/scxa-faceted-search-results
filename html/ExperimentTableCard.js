import React from 'react'
import PropTypes from 'prop-types'
import SpeciesIconCard from './SpeciesIconCard'
import './ExperimentTableCard.css'

class ExperimentTableCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {url, species, experimentDescription, markerGenes, specificExperimentInfo} = this.props

    const markerGeneLinks = markerGenes && markerGenes.map((markerGene) => {
      return <li><a href={markerGene.url}>See cluster {markerGene.clusterIds.sort().join(', ')} for k = {markerGene.k}</a></li>
    })

    return (
      <div>
       <a href={url} id="container">
       
        <span id="icon" className={"label"}>
          <SpeciesIconCard iconSrc={species} description={species}/>
        </span>

        {
          markerGenes ? 
          <div id="marker">
            <ul>
              {markerGeneLinks}
            </ul>
          </div> :
          <div id="marker">
            <span data-tooltip title="No expressed marker genes">&#10006;</span>
          </div>
        }

        <p id="title"> {experimentDescription} </p>

        <ul id="var">
          {specificExperimentInfo[0].experimentalFactors.map(factor => <li> {factor} </li>)}
        </ul>

        <p id="number"> {specificExperimentInfo[0].numberOfAssays} </p>

       </a>
      </div>
    )
  }
}

ExperimentTableCard.propTypes = {
  url: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  experimentDescription: PropTypes.string.isRequired,
  markerGenes: PropTypes.arrayOf(PropTypes.shape({
    k: PropTypes.number.isRequired,
    clusterIds: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired
  })),
  specificExperimentInfo: PropTypes.arrayOf(PropTypes.shape({
    numberOfAssays: PropTypes.number.isRequired,
    experimentalFactors: PropTypes.array.isRequired
  })),
}

export default ExperimentTableCard

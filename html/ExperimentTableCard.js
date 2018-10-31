import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import SpeciesIconCard from './SpeciesIconCard'
import './ExperimentTableCard.css'

class ExperimentTableCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {experimentAccession, url, species, experimentDescription, longDescription, lastUpdated, markerGenes, specificExperimentInfo} = this.props

    const markerGeneLinks = markerGenes && markerGenes.map((markerGene) => {
      return <li><a href={markerGene.url}>See cluster {markerGene.clusterIds.sort().join(', ')} for k = {markerGene.k}</a></li>
    })
    //            <span style={{fontSize: "80px"}} data-tooltip title={`See ${markerGeneLinks}`}>&#10004;</span>

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

        <p id="title">
         {experimentDescription}
        </p>

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
  experimentAccession: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  experimentDescription: PropTypes.string.isRequired,
  longDescription: PropTypes.string,
  type: PropTypes.string.isRequired,
  markerGenes: PropTypes.arrayOf(PropTypes.shape({
    k: PropTypes.number.isRequired,
    clusterIds: PropTypes.array.isRequired,
    url: PropTypes.string.isRequired
  }))
}

export default ExperimentTableCard

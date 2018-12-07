import React from 'react'
import styled from 'styled-components'

const CardContainerDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex !important;
  flex-wrap: nowrap;
  align-items: center;
  padding: 1rem;
  font-weight: bolder;
  font-size: 0.9rem;
`

const IconDiv = styled.div`
  width: 15%;
  text-align: center;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
  :hover {opacity: 1};
`

const MarkerDiv = styled.div`
  width: 15%;
  text-align: center;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
  :hover {opacity: 1};
`

const TitleDiv = styled.div`
  width: 40%;
  text-align: center;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
  :hover {opacity: 1};
`

const VariableDiv = styled.div`
  width: 20%;
  text-align: center;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
  :hover {opacity: 1};
`

const CountDiv = styled.div`
  width: 10%;
  text-align: center;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
  :hover {opacity: 1};
`


const ExperimentTableHeader = () => 
({  
    'container': CardContainerDiv,
    'titles': {
      'Species': IconDiv,
      'Marker genes': MarkerDiv,
      'Title': TitleDiv,
      'Experimental variables': VariableDiv,
      'Number of assays': CountDiv}
})

export default ExperimentTableHeader

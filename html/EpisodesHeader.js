import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const EpisodesHeaderDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex !important;
  flex-wrap: nowrap;
  align-items: center;
  border: #e6e6e6 solid 1px;
  margin-bottom: 0.5rem;
  padding: 1rem;
  &:hover {
    background-color: #eaeaea;
    cursor: pointer;
  }
`

const TitleDiv = styled.div`
  width: 15%;
  text-align: center;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.3s;
  :hover {opacity: 1};
`


const EpisodesHeader = (onClick) =>
  <EpisodesHeaderDiv>
    <TitleDiv onClick={() => onClick(`title`)}>
            Episode Title
    </TitleDiv>
  </EpisodesHeaderDiv>

EpisodesHeader.propTypes = {
  onClick: PropTypes.func
}

export default EpisodesHeader

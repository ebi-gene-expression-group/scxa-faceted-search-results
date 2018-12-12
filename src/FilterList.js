import React from 'react'
import PropTypes from 'prop-types'
import {ResultPropTypes} from './ResultPropTypes'
import _ from 'lodash'

const titleCase = (str) =>  
  str.toLowerCase().split(` `).map((string, index)=>
    index === 0 ?
      string.charAt(0).toLowerCase() + string.substring(1) :
      string.charAt(0).toUpperCase() + string.substring(1)    
  ).join(``)

class FilterList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sortTitle: titleCase(Object.keys(this.props.ResultsHeaderClass().titles)
        .filter(title => Object.keys(this.props.filteredResults[0].element).includes(titleCase(title)))[0]),
      ascending: true
    }
    this.constructTableHeader = this.constructTableHeader.bind(this)
    this.sortTable = this.sortTable.bind(this)
  }
  
  constructTableHeader(ResultsHeaderClass){
    const tableTitles = Object.keys(ResultsHeaderClass().titles)
    const tableTitleDivs = Object.values(ResultsHeaderClass().titles)
    const ContainerDiv = ResultsHeaderClass().container

    const TableHeader = () => 
      <ContainerDiv>
        { 
          tableTitles.map((title, index) => {
            const TitleDiv = tableTitleDivs[index]
            return Object.keys(this.props.filteredResults[0].element).includes(titleCase(title)) ?
              titleCase(title) === this.state.sortTitle ?
                this.state.ascending ?
                  <TitleDiv key={title} style={{opacity: 1}}> <p id={`selected`} onClick={this.sortTable}>{title} ▲</p></TitleDiv> :
                  <TitleDiv key={title} style={{opacity: 1}}> <p id={`selected`} onClick={this.sortTable}>{title} ▼</p></TitleDiv>
                :
                <TitleDiv key={title}> <p id={`title`} onClick={this.sortTable}>{title} ▼</p></TitleDiv>
              :
              <TitleDiv key={title}> <p id={`title`} onClick={this.sortTable}>{title}</p></TitleDiv> 
          }) 
        }
      </ContainerDiv>

    return TableHeader
  }

  sortTable(event) {
    Object.keys(this.props.filteredResults[0].element).includes(titleCase(event.target.innerText).slice(0, -1)) && 
    this.setState({
      sortTitle: titleCase(event.target.innerText).slice(0, -1),
      ascending: event.target.innerText.slice(-1) === `▼`
    })
  }

  render() {
    const {filteredResults, resultsMessage, ResultsHeaderClass, ResultElementClass} = this.props

    const filteredElements = _.sortBy(filteredResults.map((result) => result.element), this.state.sortTitle)
    const sortedElements = this.state.ascending ? filteredElements :  filteredElements.reverse()
    const TableHeader = this.constructTableHeader(ResultsHeaderClass)

    return (
      <div>
        <h4>{resultsMessage}</h4>
        { sortedElements.length && ResultsHeaderClass && <TableHeader /> }
        { sortedElements.map((element, index) => <div key={index}><ResultElementClass {...element}/></div>) }
      </div>
    )
  }
}

FilterList.propTypes = {
  filteredResults: PropTypes.arrayOf(ResultPropTypes).isRequired,
  resultsMessage: PropTypes.string,
  ResultsHeaderClass: PropTypes.func,
  ResultElementClass: PropTypes.func.isRequired
}

FilterList.defaultProps = {
  resultsMessage: ``
}

export default FilterList

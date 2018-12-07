import React from 'react'
import PropTypes from 'prop-types'
import {ResultPropTypes} from './ResultPropTypes'

function dynamicSort(property, sortState) {
    const sortOrder = sortState ?  -1 : 1
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
        return result * sortOrder
    }
}

function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join('').charAt(0).toLowerCase()+splitStr.join('').substring(1); 
}

class FilterList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sortTitle: {name: `species`, sortState: true}
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
        { tableTitles.map((title, index) => {
            const TitleDiv = tableTitleDivs[index]
            return Object.keys(this.props.filteredResults[0].element).includes(titleCase(title)) ?
              this.state.sortTitle.name===titleCase(title) && this.state.sortTitle.sortState ?
                <TitleDiv> <p key={title} id={`title`} onClick={this.sortTable}>{title} &darr;</p></TitleDiv> :
                <TitleDiv> <p key={title} id={`title`} onClick={this.sortTable}>{title} &uarr;</p></TitleDiv> 
              :
              <TitleDiv> <p key={title} id={`title`} onClick={this.sortTable}>{title}</p></TitleDiv> 
          }) 
        }
      </ContainerDiv>

    return TableHeader
  }

  sortTable(event){
    this.setState({
      sortTitle: {name: titleCase(event.target.innerText).slice(0, -1), sortState: !this.state.sortTitle.sortState}
    })
  }

  render() {
    const {filteredResults, resultsMessage, ResultsHeaderClass, ResultElementClass} = this.props

    const filteredElements = filteredResults.map((result) => result.element)
    const TableHeader = this.constructTableHeader(ResultsHeaderClass)

    filteredElements.sort(dynamicSort(this.state.sortTitle.name, this.state.sortTitle.sortState))
    return (
      <div>
        <h4>{resultsMessage}</h4>
        { filteredElements.length && ResultsHeaderClass && <TableHeader /> }
        { filteredElements.map((element, index) => <div key={index}><ResultElementClass {...element}/></div>) }
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

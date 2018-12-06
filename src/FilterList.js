import React from 'react'
import PropTypes from 'prop-types'
import {ResultPropTypes} from './ResultPropTypes'

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
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
      sortTitle: `species`
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
            let TitleDiv = tableTitleDivs[index]
            return <TitleDiv> <p key={title} id={`title`} onClick={this.sortTable}> {title} </p></TitleDiv>
          }) 
        }
      </ContainerDiv>

    return TableHeader
  }

  sortTable(event){
    console.log(titleCase(event.target.innerText))
    this.setState({
      sortTitle: titleCase(event.target.innerText)
    })
  }

  render() {
    const {filteredResults, resultsMessage, ResultsHeaderClass, ResultElementClass} = this.props

    const filteredElements = filteredResults.map((result) => result.element)
    const TableHeader = this.constructTableHeader(ResultsHeaderClass)

    filteredElements.sort(dynamicSort(this.state.sortTitle))
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

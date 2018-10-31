import React from 'react'
import ReactDOM from 'react-dom'

import FetchLoader from '../src/FetchLoader'

import ExperimentTableCard from './ExperimentTableCard'

const render = (options, target) => {
  ReactDOM.render(<FetchLoader {...options}
                               ResultElementClass={ExperimentTableCard}/>, document.getElementById(target))
}

export {render}

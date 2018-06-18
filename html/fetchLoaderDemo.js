import React from 'react'
import ReactDOM from 'react-dom'

import FetchLoader from '../src/FetchLoader'

const render = (options, target) => {
  ReactDOM.render(<FetchLoader {...options} />, document.getElementById(target))
}

export {render}
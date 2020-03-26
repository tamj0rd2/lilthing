import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const reactRoot = document.getElementById('root')
ReactDOM.render(<App />, reactRoot)

if (module.hot) {
  module.hot.accept('./App', () => ReactDOM.render(<App />, reactRoot))
}

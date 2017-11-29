import registerServiceWorker from './registerServiceWorker'
import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './index.css'

render(<App />, document.getElementById('root'))
registerServiceWorker()

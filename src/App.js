import React from 'react'
import Navigation from './components/Navigation'
import Routes from './components/Routes'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Composing Higher-Order Components</h1>
        <Router>
          <div>
            <Navigation />
            <Routes />
          </div>
        </Router>
      </div>
    )
  }
}

export default App;

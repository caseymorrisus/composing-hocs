import React from 'react'
import Test from '../components/Test'
import MockPostsContainer from '../components/posts/MockPostsContainer'
import CustomError from '../components/CustomError'
import Button from '../components/Button'
import Header from '../components/Header'
import hasTimeouts from '../hoc/hasTimeouts'
import hasError from '../hoc/hasError'

const TestWithError = hasError(CustomError)(Test)

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.addError = this.addError.bind(this)
    this.removeError = this.removeError.bind(this)
  }

  state = {
    hasError: true,
    error: {
      title: 'Failed to retrieve Test',
      message: 'Unknown reason, failed to render Test component.'
    }
  }

  componentDidMount() {
    this.props.addTimeout(() => this.setState({hasError: false}), 2000)
  }

  componentWillUnmount() {
    this.props.clearTimeouts()
  }

  addError() {
    this.setState({hasError: true})
  }

  removeError() {
    this.setState({hasError: false})
  }

  render() {
    return (
      <div className="home-page">
        <Header type="home">
          <p>
            This page triggers timeouts to emulate async changes to state. Can click buttons to manually alter component state.
          </p>
        </Header>
        <Button disabled={this.state.hasError} onClick={this.addError}>Add Error</Button>
        <Button disabled={!this.state.hasError} onClick={this.removeError}>Remove Error</Button>
        <TestWithError 
          hasError={this.state.hasError}
          error={this.state.error}
        />
        <hr />
        <MockPostsContainer />
        <hr />
      </div>
    )
  }
}

export default hasTimeouts(Home)
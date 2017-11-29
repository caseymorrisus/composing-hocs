import React from 'react'
import hasTimeouts from './hasTimeouts'

const hasMockData = (mockData, delay) => WrappedComponent => {
  class HasMockData extends React.Component {
    state = {
      data: [],
      useDefault: true
    }

    componentDidMount() {
      this.props.addTimeout(() => this.setState({data: mockData}), delay)
    }

    componentWillUnmount() {
      this.props.clearTimeouts()
    }

    render() {
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }

  return hasTimeouts(HasMockData)
}

export default hasMockData
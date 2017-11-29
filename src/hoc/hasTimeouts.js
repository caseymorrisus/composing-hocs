import React from 'react'

const hasTimeouts = WrappedComponent => {
  class HasTimeouts extends React.Component {
    constructor(props) {
      super(props)
      this.timeouts = []
      this.addTimeout = this.addTimeout.bind(this)
      this.clearTimeouts = this.clearTimeouts.bind(this)
    }

    addTimeout(func, delay) {
      this.timeouts.push(setTimeout(func, delay))
    }

    clearTimeouts() {
      this.timeouts.forEach(clearTimeout)
    }

    render() {
      return (
        <WrappedComponent
          addTimeout={this.addTimeout}
          clearTimeouts={this.clearTimeouts}
          {...this.props} 
        />
      )
    }
  }

  return HasTimeouts
}

export default hasTimeouts
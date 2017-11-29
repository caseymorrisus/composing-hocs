import React from 'react'
import axios from 'axios'

const hasData = ({url, params, loadingMessage}) => WrappedComponent => {
  class HasData extends React.Component {
    state = {
      data: [],
      hasError: false,
      error: {
        title: 'Cannot retrieve Real Posts',
        message: 'Could not retrieve Real Posts from supplied API.'
      },
      useDefault: false,
      loading: false,
      loadingMessage
    }

    componentDidMount() {
      this.setState({loading: true})

      axios.get(url, { params })
        .then(({data}) => {
          this.setState({
            data,
            loading: false,
            hasError: false,
            useDefault: data.length === 0
          })
        })
        .catch(error => {
          console.log(error)
          this.setState({
            hasError: true,
            loading: false
          })
        })
    }

    render() {
      return (
        <WrappedComponent 
          {...this.state}
          {...this.props}
        />
      )
    }
  }

  return HasData
}

export default hasData
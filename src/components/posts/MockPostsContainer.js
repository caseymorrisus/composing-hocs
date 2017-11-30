import React          from 'react'
import Post           from './Post'
import PostDefault    from './PostDefault'
import hasLogger from '../../hoc/hasLogger'
import hasMockData from '../../hoc/hasMockData'
import hasLoader from '../../hoc/hasLoader'
import hasError from '../../hoc/hasError'
import hasDefault from '../../hoc/hasDefault'
import hasTimeouts from '../../hoc/hasTimeouts'
import isList from '../../hoc/isList'
import Button from '../Button'
import { compose } from 'redux'

const mockData = [
  {
    id: 0,
    title: 'Test Post Please Ignore',
    body: 'This is a test post, ignore it.'
  },
  {
    id: 1,
    title: 'Another Post',
    body: 'Awesome, another post!'
  }
]

const EnhancedPosts = compose(
  hasLogger('Posts '),
  hasMockData(mockData, 0),
  hasLoader,
  hasError(),
  hasDefault(PostDefault),
  isList('posts'),
)(Post)

class MockPostsContainer extends React.Component {
  constructor(props) {
    super(props)
    this.updates = [
      {
        hasError: true,
        loading: false
      },
      {
        hasError: false,
        loading: true,
        loadingMessage: 'Has error, fetching again...'
      },
      {
        loading: false, 
        useDefault: true, 
        loadingMessage: 'No posts, fetching again...'      
      },
      {
        loading: true,
        useDefault: false
      },
      {
        loading: false
      }
    ]
    this.enableError = this.enableError.bind(this)
    this.disableError = this.disableError.bind(this)
    this.enableDefault = this.enableDefault.bind(this)
    this.disableDefault = this.disableDefault.bind(this)
    this.enableLoading = this.enableLoading.bind(this)
    this.disableLoading = this.disableLoading.bind(this)
  }

  state = {
    loading: true,
    hasError: false,
    useDefault: false,
    error: {
      title: 'Missing param',
      message: 'Cannot retrieve posts from DB, missing required param'
    },
    loadingMessage: 'Loading Post...'
  }

  addUpdates([update, ...updates]) {
    this.props.addTimeout(() => {
      const callback = updates.length ? this.addUpdates(updates) : null
      this.setState(update, callback)
    }, 1000)
  }

  componentDidMount() {
    this.addUpdates(this.updates, null)
  }

  componentWillUnmount() {
    this.props.clearTimeouts()
  }

  enableError() {
    this.setState({hasError: true})
  }

  disableError() {
    this.setState({hasError: false})
  }

  enableDefault() {
    this.setState({useDefault: true})
  }

  disableDefault() {
    this.setState({useDefault: false})
  }

  enableLoading() {
    this.setState({loading: true})
  }

  disableLoading() {
    this.setState({loading: false})
  }

  render() {
    return (
      <div>
        <Button disabled={this.state.loading} onClick={this.enableLoading}>Enable Loading</Button>
        <Button disabled={!this.state.loading} onClick={this.disableLoading}>Disable Loading</Button>
        <Button disabled={this.state.hasError} onClick={this.enableError}>Enable Error</Button>
        <Button disabled={!this.state.hasError} onClick={this.disableError}>Disable Error</Button>
        <Button disabled={this.state.useDefault} onClick={this.enableDefault}>Enable Default</Button>
        <Button disabled={!this.state.useDefault} onClick={this.disableDefault}>Disable Default</Button>

        <EnhancedPosts
          loading={this.state.loading}
          hasError={this.state.hasError}
          error={this.state.error}
          useDefault={this.state.useDefault}
          loadingMessage={this.state.loadingMessage}
        />
      </div>
    )
  }
}

export default hasTimeouts(MockPostsContainer)
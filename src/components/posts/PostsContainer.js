import Post from './Post'
import PostDefault from './PostDefault'
import isContainer from '../../hoc/isContainer'
import isList from '../../hoc/isList'
import { compose } from 'redux'

export default compose(
  isContainer({
    data: {
      url: 'https://jsonplaceholder.typicode.com/posts', 
      params: {
        page: 1,
        _limit: 10
      },
      loadingMessage: "Loading Real Posts..."
    },
    DefaultComponent: PostDefault
  }),
  isList('posts'),
)(Post)
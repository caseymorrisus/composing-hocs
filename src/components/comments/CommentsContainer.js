import React from 'react'
import Comment from './Comment'
import isList from '../../hoc/isList'
import isContainer from '../../hoc/isContainer'
import { compose } from 'redux'
import './Comments.css'

const CommentDefault = props => <div  className="no-comments">No comments to display.</div>

export default compose(
  isContainer({
    data: {
      url: 'https://jsonplaceholder.typicode.com/comments', 
      params: {
        page: 1,
        _limit: 10
      },
      loadingMessage: "Loading Comments..."
    },
    DefaultComponent: CommentDefault
  }),
  isList('comments'),
)(Comment)
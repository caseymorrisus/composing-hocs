import React from 'react'
import CommentsContainer from '../components/comments/CommentsContainer'
import Header from '../components/Header'

const Comments = props => (
  <div className="comments-page">
    <Header type="comments" url="https://jsonplaceholder.typicode.com/comments" />
    <CommentsContainer />
  </div>
)

export default Comments
import React from 'react'
import PostsContainer from '../components/posts/PostsContainer'
import Header from '../components/Header'

const Posts = props => (
  <div className="posts-page">
    <Header type="posts" url="https://jsonplaceholder.typicode.com/posts" />
    <PostsContainer />
  </div>
)

export default Posts
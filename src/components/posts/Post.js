import React from 'react'

const Post = ({title, body}) => (
  <div className="post">
    <h2>{title}</h2>
    <p>{body}</p>
  </div>
)

export default Post
import React from 'react'

const Comment = ({name, email, body}) => (
  <div className="comment">
    <div>
      <span className="label">Name:</span>
      {name}
    </div>
    <div>
      <span className="label">Email:</span>
      {email}
    </div>
    <div>
      <span className="label">Comment:</span>
      {body}
    </div>
  </div>
)

export default Comment
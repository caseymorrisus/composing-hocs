import React from 'react'

const Error = ({error = {title: 'Unknown', message: 'Unknown'}}) => (
  <div className="error">
    <h2>Error: {error.title}</h2>
    <p>Message: {error.message}</p>
  </div>
)

export default Error
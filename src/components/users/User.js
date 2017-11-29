import React from 'react'

const User = ({username, name, email, phone, website, company}) => (
  <div className="user">
    <div>
      <span className="label">Username:</span>
      {username}
    </div>
    <div>
      <span className="label">Name:</span>
      {name}
    </div>
    <div>
      <span className="label">Email:</span>
      {email}
    </div>
    <div>
      <span className="label">Phone:</span>
      {phone}
    </div>
    <div>
      <span className="label">Website:</span>
      {website}
    </div>
    <div>
      <span className="label">Company:</span>
      {company.name}
    </div>
  </div>
)

export default User
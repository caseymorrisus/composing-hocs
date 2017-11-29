import React from 'react'
import UsersContainer from '../components/users/UsersContainer'
import Header from '../components/Header'

const Users = props => (
  <div className="users-page">
    <Header type="users" url="https://jsonplaceholder.typicode.com/users" />
    <UsersContainer />
  </div>
)

export default Users
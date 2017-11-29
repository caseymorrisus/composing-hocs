import React from 'react'
import User from './User'
import isContainer from '../../hoc/isContainer'
import isList from '../../hoc/isList'
import { compose } from 'redux'
import './Users.css'

const UserDefault = () => <div  className="no-users">No users to display.</div>

export default compose(
  isContainer({
    data: {
      url: 'https://jsonplaceholder.typicode.com/users', 
      params: {
        page: 1,
        _limit: 10
      },
      loadingMessage: "Loading Users..."
    },
    DefaultComponent: UserDefault
  }),
  isList('users')
)(User)
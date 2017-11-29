import React from 'react'
import isContainer from '../../hoc/isContainer'
import isList from '../../hoc/isList'
import { compose } from 'redux'
import './Todos.css'

const Todo = ({title, completed}) => (
  <div className={completed ? 'todo completed' : 'todo'}>{title}</div>
)

const TodoDefault = props => (
  <div className="no-todos">No todos to display.</div>
)

export default compose(
  isContainer({
    data: {
      url: 'https://jsonplaceholder.typicode.com/todos', 
      params: {
        page: 1,
        _limit: 10
      },
      loadingMessage: "Loading Todos..."
    },
    DefaultComponent: TodoDefault
  }),
  isList('todos')
)(Todo)
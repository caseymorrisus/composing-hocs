import React from 'react'
import TodosContainer from '../components/todos/TodosContainer'
import Header from '../components/Header'

const Todos = props => (
  <div className="todos-page">
    <Header type="todos" url="https://jsonplaceholder.typicode.com/todos" />
    <TodosContainer />
  </div>
)

export default Todos
import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../routes'

const styles = {
  marginBottom: '1rem'
}

const Navigation = props => (
  <nav style={styles}>
    {routes.map(({path, name}, i) => (
      <Link to={path} key={i}>{name}</Link>
    ))}
  </nav>
)

export default Navigation
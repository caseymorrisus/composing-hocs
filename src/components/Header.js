import React from 'react'
import './Header.css'

const Header = ({type, url, children}) => {
  const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)
  const defaultContent = <p>This page calls the JSONPlaceholder API at <span className="url">{url}</span> and limits it to 10 {type}.</p>

  return (
    <div className="header">
      <h2>{capitalize(type)}</h2>
      {children
        ? children
        : defaultContent
      }
    </div>
  )
}

export default Header
import React from 'react'
import './Button.css'

const Button = ({onClick, disabled, children}) => (
  <button
    className="button"
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
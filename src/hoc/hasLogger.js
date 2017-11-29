import React from 'react'

const hasLogger = (prefix = '') => WrappedComponent => {
  const HasLogger = props => {
    console.log(`${prefix}[Props]:`, props)
    return <WrappedComponent {...props} />
  }

  return HasLogger
}

export default hasLogger
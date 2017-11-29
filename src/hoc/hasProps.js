import React from 'react'

const hasProps = injectedProps => WrappedComponent => {
  const HasProps = props => <WrappedComponent {...injectedProps} {...props} />

  return HasProps
}

export default hasProps
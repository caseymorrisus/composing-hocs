import React from 'react'
import { compose } from 'redux'
import hasData from './hasData'
import hasError from './hasError'
import hasDefault from './hasDefault'
import hasLoader from './hasLoader'

const isContainer = ({data, Error, DefaultComponent}) => WrappedComponent => {
  const IsContainer = props => <WrappedComponent {...props} />

  return compose(
    hasData(data),
    hasLoader,
    hasError(Error),
    hasDefault(DefaultComponent)
  )(IsContainer)
}

export default isContainer
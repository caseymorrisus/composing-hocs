import branch from './branch'

const hasDefault = Default => WrappedComponent => {
  const HasDefault = props => 
    branch(props.useDefault, Default, WrappedComponent )(props)

  return HasDefault
}

export default hasDefault
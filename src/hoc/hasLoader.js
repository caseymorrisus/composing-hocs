import Loading from '../components/Loading'
import branch from './branch'
import hasProps from './hasProps'

const hasLoader = WrappedComponent => {
  const HasLoader = props => branch(
    props.loading,
    hasProps({message: props.loadingMessage})(Loading),
    WrappedComponent
  )(props)

  return HasLoader
}

export default hasLoader
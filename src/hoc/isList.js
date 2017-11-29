import React from 'react'

const isList = type => WrappedComponent => {
  const IsList = props => (
    <div className={type}>
      {props.data.map(item => (
        <WrappedComponent {...item} key={item.id} />
      ))}
    </div>
  )

  return IsList
}

export default isList
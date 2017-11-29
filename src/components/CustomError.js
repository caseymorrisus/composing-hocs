import React from 'react'

const CustomError = ({error}) => <h2>{error.title}: {error.message}</h2>

export default CustomError
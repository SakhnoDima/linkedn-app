import React from 'react'

const Button = ({ type, children, style }) => {
  return (
    <button className={`btn ${style}`}
    type={type}>{children}</button>
  )
}

export default Button
import React from 'react'
import { Navigate } from 'react-router-dom'

const isTokenExpired = () => {
  const expiryTime = localStorage.getItem('expiryTime')
  if (!expiryTime) return true
  return new Date() > new Date(expiryTime)
}

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token')
  return token && !isTokenExpired() ? <Component {...rest} /> : <Navigate to="/login" />
}

export default PrivateRoute

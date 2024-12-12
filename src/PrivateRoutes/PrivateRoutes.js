import React, { useContext } from 'react'
import { Usercontext } from '../App'
import { Navigate } from 'react-router'

const PrivateRoutes = ({children}) => {
    const user=useContext(Usercontext)
  return user?<>{children}</>:<Navigate to="/signUp" replace/>
  
}

export default PrivateRoutes
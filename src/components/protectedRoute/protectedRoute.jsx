import React, { } from 'react'
import Style from "./protectedRoute.module.css"
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children  }) {

  if (localStorage.getItem("Token")) {
    return children  
  } else {
    return <Navigate to={"/Login"} />
  }
}

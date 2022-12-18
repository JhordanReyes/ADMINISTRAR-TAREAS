import React from 'react'
import UserProvider from './context/UserProvider'
import Register from './vistas/register/Register'

const AdministrarTareas = () => {

  return (
    <UserProvider>
      <Register />
    </UserProvider>
  )
}

export default AdministrarTareas
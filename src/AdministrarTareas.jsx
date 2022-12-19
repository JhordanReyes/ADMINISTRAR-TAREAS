import React from 'react'
import UserProvider from './context/UserProvider'
import App from './vistas/app/App'
import Register from './vistas/register/Register'

const AdministrarTareas = () => {

  return (
    <UserProvider>
      <Register />
      <App />
    </UserProvider>
  )
}

export default AdministrarTareas
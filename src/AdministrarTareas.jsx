import React, { useState } from 'react'
import UserProvider from './context/UserProvider'
import App from './vistas/app/App'
import Register from './vistas/register/Register'

const AdministrarTareas = () => {

  const [ registerIsComplete, setRegisterIsComplete] = useState(false);

  return (
    <UserProvider>
      {
        !registerIsComplete
          ? <Register
              setRegisterIsComplete={setRegisterIsComplete}
            />
          : <App />
      }
    </UserProvider>
  )
}

export default AdministrarTareas
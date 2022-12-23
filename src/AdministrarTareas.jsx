import React, { useState } from 'react'
import UserProvider from './context/UserProvider'
import App from './vistas/app/App'
import Register from './vistas/register/Register'

const AdministrarTareas = () => {

  if(!localStorage.getItem("registerIsComplete")){
    localStorage.setItem( "registerIsComplete", false );
  }
  

  const [ registerIsComplete, setRegisterIsComplete] = useState(JSON.parse(localStorage.getItem("registerIsComplete")));
  return (
    <UserProvider>
      {
        !registerIsComplete
          ? <Register
              setRegisterIsComplete={setRegisterIsComplete}
            />
          : <App setRegisterIsComplete={setRegisterIsComplete}/>
      }
    </UserProvider>
  )
}

export default AdministrarTareas
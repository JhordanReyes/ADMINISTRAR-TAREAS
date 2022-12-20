import { createContext, useState } from "react";

export const userContext = createContext();

const INITIAL_STATE = {
  name: "",
  gender: "",
}

const UserProvider = ({children}) => {

  if( !JSON.parse( localStorage.getItem("user") ) ){
    localStorage.setItem("user", JSON.stringify(INITIAL_STATE));  }

  const [user, setUser] = useState( JSON.parse(localStorage.getItem("user")) );

  return (
    <userContext.Provider value={ {
      user,
      setUser,
    } }>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider;
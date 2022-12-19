import { createContext, useState } from "react";

export const userContext = createContext();

const INITIAL_STATE = {
  name: "",
  gender: "",
}

const UserProvider = ({children}) => {

  if( !JSON.parse( localStorage.getItem("userLS") ) ){
    localStorage.setItem("userLS", JSON.stringify(INITIAL_STATE));
  }

  const [user, setUser] = useState( JSON.parse(localStorage.getItem("userLS")) );

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
import { createContext, useState } from "react";

export const userContext = createContext();

const INITIAL_STATE = {
  name: "",
  geder: "",
}

const UserProvider = ({children}) => {
  localStorage.setItem("userLS", JSON.stringify(INITIAL_STATE))
  const [user, setUser] = useState(localStorage.getItem("userLS"))
  console.log(localStorage.getItem("userLS"));

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
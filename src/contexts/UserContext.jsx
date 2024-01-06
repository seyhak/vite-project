import { createContext, useState } from "react"
import PropTypes from "prop-types"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const loginUser = (userData) => {
    setUser(userData)
  }

  const logoutUser = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node,
}
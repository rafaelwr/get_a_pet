import { createContext } from "react"
import useAuth from "../hooks/useAuth"

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const { authenticated, register, logout, login } = useAuth()

    return (
        <UserContext.Provider value={{ authenticated, register, logout, login }}>{children}</UserContext.Provider>
    )
}

export { UserContext, UserProvider }
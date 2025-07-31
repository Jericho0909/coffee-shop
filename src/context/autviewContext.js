import { createContext } from "react";
import useAutview from "../hooks/useAutView";

const AuthviewContext = createContext()

export const AuthviewProvider = ({children}) => {
    const { authView, setAuthView } = useAutview()

    return (
        <AuthviewContext.Provider
            value={{
                authView,
                setAuthView
            }}
        >
            {children}
        </AuthviewContext.Provider>
    )
}

export default AuthviewContext
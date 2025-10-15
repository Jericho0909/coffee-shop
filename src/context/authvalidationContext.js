import { createContext, useState } from "react";

const AuthValidationContext = createContext()

export const AuthValidationProvider = ({children}) => {
    const [ showPasswordValidationError, setShowPasswordValidationError ] =
        useState(false)
    const [ isUsernameAvailable, setIsUsernameAvailable ] = useState(true)
    const [ endsWithAdmin, setEndsWithAdmin ] = useState(true)

    const clearValidationErrors = () => {
        setShowPasswordValidationError(false)
        setIsUsernameAvailable(true)
        setEndsWithAdmin(true)
    }

    return(
        <AuthValidationContext.Provider
            value={{
                showPasswordValidationError,
                setShowPasswordValidationError,
                isUsernameAvailable,
                setIsUsernameAvailable,
                endsWithAdmin,
                setEndsWithAdmin,
                clearValidationErrors
            }}
        >
            {children}
        </AuthValidationContext.Provider>
    )
}

export default AuthValidationContext
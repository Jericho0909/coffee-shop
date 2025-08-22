import { createContext, useState } from "react";
import useAuthValidation from "../hooks/useAuthValidation";

const AuthValidationContext = createContext()

export const AuthValidationProvider = ({children}) => {
    const { isUsernameExists, isPasswordValid } = useAuthValidation()
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
                isUsernameExists,
                isPasswordValid,
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
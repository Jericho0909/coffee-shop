import { createContext, useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
const AuthValidationContext = createContext()

export const AuthValidationProvider = ({children}) => {
    const { checkUsernameAvailability,
        validatePassword,
        checkEmailAvailability,
        showPasswordValidationError,
        setShowPasswordValidationError,
        isUsernameAvailable,
        setIsUsernameAvailable,
        isEmailAvailable,
        setIsEmailAvailable 
    } = useAuthentication()
    const [ endsWithAdmin, setEndsWithAdmin ] = useState(true)

    const clearValidationErrors = () => {
        setShowPasswordValidationError(false)
        setIsUsernameAvailable(true)
        setEndsWithAdmin(true)
        setIsEmailAvailable(true)
    }

    return(
        <AuthValidationContext.Provider
            value={{
                checkUsernameAvailability,
                validatePassword,
                checkEmailAvailability,
                showPasswordValidationError,
                setShowPasswordValidationError,
                isUsernameAvailable,
                setIsUsernameAvailable,
                endsWithAdmin,
                setEndsWithAdmin,
                isEmailAvailable,
                setIsEmailAvailable,
                clearValidationErrors
            }}
        >
            {children}
        </AuthValidationContext.Provider>
    )
}

export default AuthValidationContext
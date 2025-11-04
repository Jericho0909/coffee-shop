import { useState, useCallback, useContext } from "react"
import FirebaseFetchDataContext from "../context/firebasefetchdataContext"
import authValidation from "../utils/authValidation"
const useAuthentication = () => {
    const { adminList, customerList } = useContext(FirebaseFetchDataContext)
    const { isUsernameExists, 
        isPasswordValid, 
        isEmailExits 
    } = authValidation()
    const [ showPasswordValidationError, setShowPasswordValidationError ] =
    useState(false)
    const [ isUsernameAvailable, setIsUsernameAvailable ] = useState(true)
    const [ isEmailAvailable, setIsEmailAvailable ] = useState(true)

    const checkUsernameAvailability = useCallback((username, data) => {
        const usernameExists = isUsernameExists(username, data)
        if (usernameExists) {
            setIsUsernameAvailable(false)
            return false
        }
        setIsUsernameAvailable(true)
        return true
    }, [isUsernameExists, setIsUsernameAvailable])



    const validatePassword = useCallback((password) => {
        const valid = isPasswordValid(password)
            if (!valid) {
                setShowPasswordValidationError(true)
                return false;
            }
            else{
                setShowPasswordValidationError(false)
            }

            return true;
    },[ isPasswordValid, setShowPasswordValidationError])

    const checkEmailAvailability = useCallback((email) => {
        const adminEmailExists = isEmailExits(email, adminList)
        const customerEmailExists = isEmailExits(email, customerList)
        if(adminEmailExists || customerEmailExists){
            setIsEmailAvailable(false)
            return false
        }
        setIsEmailAvailable(true)
        return true
    }, [isEmailExits, setIsEmailAvailable, adminList, customerList])

    return{
        checkUsernameAvailability,
        validatePassword,
        checkEmailAvailability,
        showPasswordValidationError,
        setShowPasswordValidationError,
        isUsernameAvailable,
        setIsUsernameAvailable,
        isEmailAvailable,
        setIsEmailAvailable
    }
}

export default useAuthentication
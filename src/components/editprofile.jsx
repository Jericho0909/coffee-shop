import { useContext, useState, useCallback, useEffect } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    updatePassword,
    deleteUser } from "firebase/auth";
import FirebaseFetchDataContext from "../context/firebasefetchdataContext";
import { useDebounce } from "@uidotdev/usehooks";
import FirebaseActionContext from "../context/firebaseactionContext";
import AuthValidationContext from "../context/authvalidationContext"
import ModalContext from "../context/modalContext";
import authValidation from "../utils/authValidation"
import removeFireBaseKey from "../utils/removeFirebaseKey";
import showToast from "../utils/showToast";
import toTitleCase from "../utils/toTitleCase";
const EditProfile = ({profile, list, setter}) => {
    const { employerList } = useContext(FirebaseFetchDataContext)
    const { 
        isUsernameAvailable,
        setIsUsernameAvailable,
        showPasswordValidationError, 
        setShowPasswordValidationError
    } = useContext(AuthValidationContext)
    const { toggleModal } = useContext(ModalContext)
    const { updateAction } = useContext(FirebaseActionContext)
    const [ editProfile, setEditProfile ] = useState(profile)
    const [ type, setType ] = useState("")
    const { isUsernameExists, isPasswordValid, isEmailExits } = authValidation()
    const { Toast } = showToast()
    const debouncedType = useDebounce(type, 300)

    const checkUsernameAvailability = useCallback((username) => {
        const usernameExists =  isUsernameExists(username, list)
        if(usernameExists && editProfile.username !== profile.username){
            setIsUsernameAvailable(true)
            return false
        }
        setIsUsernameAvailable(false)
        return true
    }, [isUsernameExists, list, setIsUsernameAvailable, editProfile, profile])

    const validatePassword = useCallback((password) => {
        const isValid = isPasswordValid(password);
        if(!isValid){
            setShowPasswordValidationError(true);
            return false
        }

        setShowPasswordValidationError(false)
        return true

    }, [isPasswordValid, setShowPasswordValidationError])


    const emailConformation = async(email, password) => {
        const emailExists = isEmailExits(email, list)
        if(emailExists && editProfile.email !== profile.email) return false
        if(email !== profile.email){
            try {
                const newUserCredential = await createUserWithEmailAndPassword(auth, email, password)
                const newUser = newUserCredential.user
                await sendEmailVerification(newUser)
                await updateProfile(newUser, { displayName: profile.name })

                const oldUerCredential = await signInWithEmailAndPassword(auth, profile.email, profile.password)
                const user = oldUerCredential.user
                await deleteUser(user);

            } catch (error) {
                console.log(error)
            }
        }

        if(password !== profile.password){
            try {
                const userCredential = await signInWithEmailAndPassword(auth, profile.email, profile.password)
                const user = userCredential.user
                await updatePassword(user, password);
            } catch (error) {
                console.log(error)
            }
        }

        return true
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const isUsernameOk = checkUsernameAvailability(editProfile.username)
        const isPasswordOk = validatePassword(editProfile.password)
        const isEmailOk = await emailConformation(editProfile.email, editProfile.password)
        if(!isUsernameOk || !isPasswordOk || !isEmailOk){
            return
        }
        const safeData = removeFireBaseKey(editProfile)
        const editedProfile = {
            ...safeData
        }

        if(setter === "admins"){
            const employer = employerList.find(key => key.name === profile.name)
            const { username, password, ...data } = safeData
            const editEmployerProfile = {
                ...data,
                id: employer.id,
                gender: employer.gender,
                status: employer.status
            }
            await updateAction(setter, profile.firebaseKey, editedProfile)
            await updateAction("employers", employer.firebaseKey, editEmployerProfile)
        }
        else{
            await updateAction(setter, profile.firebaseKey, editedProfile)
        }
        
        toggleModal()
        Toast("success", "Profile updated successfully.", 2000)

    }

    const cancelEdit = () => {
        setEditProfile({...profile})
        setIsUsernameAvailable(true)
        setShowPasswordValidationError(false)
    }

    useEffect(() => {
        if(editProfile.username !== profile.username){
            checkUsernameAvailability(debouncedType)
        }

        if(editProfile.password !== profile.password){
            validatePassword(debouncedType)
        }

    }, [debouncedType, checkUsernameAvailability, editProfile, validatePassword, profile])

    const inputRow = (title, type, name, value ) => {
        return(
            <div className="container-flex w-full h-auto p-1 gap-1 mb-0">
                <label htmlFor={`edit-${title}`} className="w-[44%]">
                    {title}
                </label>
                <input
                    id={`edit-${title}`}
                    type={type}
                    name={name}
                    required
                    value={value}
                    onChange={(e) => {
                        const titleCase = toTitleCase(e.target.value)
                        setEditProfile({
                        ...editProfile, [e.target.name]: 
                            name === "location" ? titleCase : e.target.value
                        })
                        setType(e.target.value)
                    }}
                    
                    
                    spellCheck="false"
                />
            </div>
        )
    }
    return(
        <form 
            className="container-flex justify-start flex-col w-full h-auto py-[2rem] px-1 overflow-y-auto scrollbar-hide"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h1 
                className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem] xl:mb-[0.50rem]"
            >
                edit profile
            </h1>
            {inputRow("Username:", "text", "username", editProfile.username || "")}
            {(isUsernameAvailable && editProfile.username !== profile.username)  && (
                <p className="text-center text-red-600 text-[0.75rem] w-full">
                    Username already exists.
                </p>
            )}
            {inputRow("Password:", "password", "password", editProfile.password || "")}
            {(showPasswordValidationError) && (
                <p className="text-center text-red-600 text-[0.75rem] w-full">
                    Password must be at least 8 characters and include an uppercase
                    letter, a number, and a special character.
                </p>
            )}
            {inputRow("Email:", "email", "email", editProfile.email || "")}
            <div className="container-flex w-full h-auto p-1 gap-1 mb-0">
                <label htmlFor="edit-phone" className="w-[44%] whitespace-nowrap">
                    Phone Number:
                </label>
                <input
                    id="edit-phone"
                    type="tel"
                    name="phone"
                    required
                    maxLength={11}
                    pattern="[0-9]{11}"
                    placeholder="e.g. 09123456789"
                    value={editProfile.phone}
                    onChange={(e) => setEditProfile({
                        ...editProfile, [e.target.name]: e.target.value
                    })}
                />
            </div>
            {inputRow("Location:", "text", "location", editProfile.location || "")}
            <div className="container-flex justify-around w-full h-auto p-1 mb-0 mt-[1rem]">
                <button
                    className="bg-[#88A550] text-white px-4 py-2 rounded shadow-md w-[35%]  h-auto
                    transition-transform duration-300 ease-in-out
                    hoverable:hover:bg-[#7a9549] hoverable:hover:scale-105 hoverable:hover:shadow-[0_4px_12px_rgba(136,165,80,0.4)]
                    active:translate-y-1 active:shadow-none"
                    style={{ fontVariant: "small-caps" }}
                    type="button"
                    onClick={() => cancelEdit()}
                >
                    cancel
                </button>
                <button
                type="submit"
                className="bg-[#8B3A2B] text-white px-4 py-2 rounded shadow-md w-[35%] h-auto
                hoverable:hover:bg-[#732f23] hoverable:hover:scale-105
                active:scale-95 active:shadow-none
                transition-all duration-300 ease-in-out"
                style={{ fontVariant: "small-caps" }}
            >
                Confrim
            </button>
            </div>
        </form>
    )
}

export default EditProfile
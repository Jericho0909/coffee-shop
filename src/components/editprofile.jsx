import { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    deleteUser,
    updatePassword,
} from "firebase/auth";
import FirebaseFetchDataContext from "../context/firebasefetchdataContext";
import { useDebounce } from "@uidotdev/usehooks";
import FirebaseActionContext from "../context/firebaseactionContext";
import AuthValidationContext from "../context/authvalidationContext"
import ModalContext from "../context/modalContext";
import removeFireBaseKey from "../utils/removeFirebaseKey";
import showToast from "../utils/showToast";
import toTitleCase from "../utils/toTitleCase";
import { EyeClosed } from 'lucide-react';
import { Eye } from 'lucide-react';
const EditProfile = ({profile, list, setter}) => {
    const { employerList } = useContext(FirebaseFetchDataContext)
    const { 
        checkUsernameAvailability,
        validatePassword,
        checkEmailAvailability,
        showPasswordValidationError,
        isUsernameAvailable,
        isEmailAvailable,
        setIsUsernameAvailable,
        setShowPasswordValidationError
    } = useContext(AuthValidationContext)
    const { toggleModal } = useContext(ModalContext)
    const { updateAction } = useContext(FirebaseActionContext)
    const [ editProfile, setEditProfile ] = useState(profile)
    const [ type, setType ] = useState("")
    const [ isLoading, setIsloading ] = useState(false)
    const [ showPass, setShowPass ] = useState(false)
    const { Toast } = showToast()
    const debouncedType = useDebounce(type, 300)

    const changeEmail = async (email, password) => {
        try {
            setIsloading(true)

            if (editProfile.email !== profile.email){
                const isEmailAvailable = checkEmailAvailability(email)
                if (!isEmailAvailable) return
                const newUserCredential = await createUserWithEmailAndPassword(auth, email, password)
                const newUser = newUserCredential.user
                await sendEmailVerification(newUser)
                await updateProfile(newUser, { displayName: profile.name })

                const oldUerCredential = await signInWithEmailAndPassword(auth, profile.email, profile.password)
                const user = oldUerCredential.user
                await deleteUser(user)
            }

            return true
        } catch (error) {
            console.error(error)
            return false
        } finally {
            setIsloading(false)
        }
    }

    const changePass = async(email, password) => {
        const firebaseUserPass = editProfile.email !== profile.email ? editProfile.password : profile.password
        if(password !== profile.password){
            const userCredential = await signInWithEmailAndPassword(auth, editProfile.email, firebaseUserPass)
            const user = userCredential.user
            await updatePassword(user, password)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(editProfile.email !== profile.email){
            const isEmailOk = await changeEmail(editProfile.email, editProfile.password)
            if(!isEmailOk) return
        }

        if(editProfile.username !== profile.username){
            const isUsernameOk = checkUsernameAvailability(editProfile.username, list)
            if(!isUsernameOk) return
        }

        if(editProfile.password !== profile.password){
            await changePass(editProfile.email, editProfile.password)
            const isPasswordOk = validatePassword(editProfile.password)
            if(!isPasswordOk ) return
        }
        
        const safeData = removeFireBaseKey(editProfile)
        const editedProfile = {
            ...safeData
        }

        if(setter === "admins"){
            if(!editProfile.username.endsWith(".admin")){
                return
            }
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
            checkUsernameAvailability(editProfile.username, list)
        }

        if(editProfile.password !== profile.password){
            validatePassword(editProfile.password)
        }

        if(editProfile.email !== profile.email){
            checkEmailAvailability(editProfile.email)
        }

    }, [debouncedType, checkUsernameAvailability, validatePassword, profile, checkEmailAvailability, editProfile, list])

    const inputRow = (title, type, name, value, placeholder ) => {
        return(
            <div className="container-flex w-full h-auto p-1 gap-1 mb-0">
                <label htmlFor={`edit-${title}`} className="w-[44%]">
                    {title}
                </label>
                <div className="relative w-full">
                    <input
                        id={`edit-${title}`}
                        type={type}
                        name={name}
                        required
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            const titleCase = toTitleCase(e.target.value)
                            setEditProfile({
                            ...editProfile, [e.target.name]: 
                                name === "location" || name === "name" ? titleCase : e.target.value
                            })
                            setType(e.target.value)
                        }}
                        spellCheck="false"
                    />
                    {name === "password" && (
                        <button 
                            className="absolute top-1/2 right-2 -translate-y-1/2 p-1 bg-transparent border-none cursor-pointer"
                            type="button"
                            onClick={() => setShowPass((prev) => !prev)}
                        >
                            {showPass ? <Eye size={18} /> : <EyeClosed size={18}/>}
                        </button>
                    )}
                </div>
            </div>
        )
    }
    return(
        <>
            <form 
                className="container-flex justify-start flex-col w-full h-auto py-[2rem] px-1 overflow-y-auto scrollbar-hide relative"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 
                    className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem] xl:mb-[0.50rem]"
                >
                    edit profile
                </h1>
                {inputRow("Name:", "text", "name", editProfile.name || "", "Juan Magtibay")}
                {inputRow("Username:", "text", "username", editProfile.username || "", "ex: user")}
                {editProfile.username !== profile.username && (
                    <p
                        className={`text-center text-[0.75rem] w-full ${
                        !isUsernameAvailable ? "text-red-600" : "italic text-[#8c6244]"
                        }`}
                    >
                        {!isUsernameAvailable && (setter === "admins" || setter === "customers")
                        ? "Username already exists."
                        : setter === "admins"
                        ? "Reminder: Username must end with .admin!"
                        : null}
                    </p>
                )}
                {inputRow("Password:", showPass ? "text" : "password", "password", editProfile.password || "", "!User123")}
                {(showPasswordValidationError) && (
                    <p className="text-center text-red-600 text-[0.75rem] w-full">
                        Password must be at least 8 characters and include an uppercase
                        letter, a number, and a special character.
                    </p>
                )}
                {inputRow("Email:", "email", "email", editProfile.email || "", "usernamegmail.com")}
                {!isEmailAvailable && (
                    <p className="text-center text-red-600 text-[0.75rem] w-full">
                        Email already exists.
                    </p>
                )}
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
                {inputRow("Location:", "text", "location", editProfile.location || "", "Bagong Pook Rosario Batangas")}
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
            {isLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto">
                    <div className="loader-three">
                        
                    </div>
                </div>
            )}
        </>
    )
}

export default EditProfile
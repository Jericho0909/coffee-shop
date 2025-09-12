import { useState, useContext } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ActionContext from "../../../../../context/actionContext"
import AuthValidationContext from "../../../../../context/authvalidationContext"
import ShowToastContext from "../../../../../context/showtoastContext"
import ModalContext from "../../../../../context/modalContext"
const EditProfile = ({customer}) => {
    const { customerList, setCustomerList } = useContext(FetchDataContext)
    const { patchAction } = useContext(ActionContext)
    const { 
        isUsernameExists, 
        isPasswordValid,
        isUsernameAvailable,
        setIsUsernameAvailable,
        showPasswordValidationError, 
        setShowPasswordValidationError
    } = useContext(AuthValidationContext)
    const { showToast } = useContext(ShowToastContext)
    const { toggleModal } = useContext(ModalContext)
    const [ editProfile, setEditProfile ] = useState(customer)
    const [ retypePass, setRetypePass ] = useState("")
    const [ isPasswordMismatch, setIsPasswordMismatch ] = useState(false)

    const isUsernameTaken = async(username) => {
        const istaken = await isUsernameExists(username, customerList)
        if(istaken){
            setIsUsernameAvailable(false)
            return false
        }

        setIsUsernameAvailable(true)
        return true
    }

    const validPassword = (password) => {
        const isvalid = isPasswordValid(password)
        if(!isvalid){
            setShowPasswordValidationError(true);
            return false
        }
        else{
            setShowPasswordValidationError(false)
        }

        if(editProfile.password !== retypePass && retypePass.length !== 0){
            setIsPasswordMismatch(true)
            return false
        }
        else{
            setIsPasswordMismatch(false)
        }
        return true
    }

    const cancelEdit = () => {
        setEditProfile({
            ...customer
        })
        setRetypePass()
        setIsUsernameAvailable(true)
        setShowPasswordValidationError(false)
        setIsPasswordMismatch(false)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const isUsernameOk = await isUsernameTaken(editProfile.username)
        const isPasswordOk = validPassword(editProfile.password)

        if(!isUsernameOk || !isPasswordOk){
            return
        }

        const editedProfile = {
            ...editProfile
        }

        const response = await patchAction("customers", customer.id, editedProfile)

        setCustomerList(prev => (
            prev.map(c => c.id === customer.id ? response : c)
        ))
        
        toggleModal()
        showToast("success", "Profile updated successfully.", 2000)

    }

    const Layout = (title, type, name, value ) => {
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
                    onChange={(e) => setEditProfile({
                        ...editProfile, [e.target.name]: e.target.value
                    })}
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
            {Layout("Username:", "text", "username", editProfile.username || "")}
            {!isUsernameAvailable && (
                <p className="text-center text-red-600 text-[0.75rem] w-full">
                    Username already exists.
                </p>
            )}
            {Layout("Password:", "password", "password", editProfile.password || "")}
            {showPasswordValidationError && (
                <p className="text-center text-red-600 text-[0.75rem] w-full">
                    Password must be at least 8 characters and include an uppercase
                    letter, a number, and a special character.
                </p>
            )}
            {editProfile.password !== customer.password && (
                <>
                    <div className="container-flex w-full h-auto p-1 gap-1 mb-0">
                        <label htmlFor="RetypePass" className="w-[44%]">
                            Retype Password
                        </label>
                        <input
                            id="RetypePass"
                            type="password"
                            value={retypePass}
                            required
                            onChange={(e) => setRetypePass(e.target.value)}
                            className={`${isPasswordMismatch && "border border-red-500"}`}
                        />
                    </div>
                    {isPasswordMismatch && (
                        <p className="text-center text-red-600 text-[0.75rem] w-full">
                            Passwords do not match.
                        </p>
                    )}
                </>
            )}
            {Layout("Email:", "email", "email", editProfile.email || "")}
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
            {Layout("Location:", "text", "location", editProfile.location || "")}
            <div className="container-flex justify-around w-full h-auto p-1 mb-0 mt-[1rem]">
                <button
                    className="bg-[#88A550] text-white px-4 py-2 rounded shadow-md w-[35%]  h-auto
                    transition-transform duration-300 ease-in-out
                    hover:bg-[#7a9549] hover:scale-105 hover:shadow-[0_4px_12px_rgba(136,165,80,0.4)]
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
                hover:bg-[#732f23] hover:scale-105
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
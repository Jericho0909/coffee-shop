import { useContext, useState, useEffect, useCallback } from "react";
import { auth } from "../../../firebase.js";
import { createUserWithEmailAndPassword, sendEmailVerification,
updateProfile } from "firebase/auth";
import AuthviewContext from "../../../context/autviewContext";
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext";
import FirebaseActionContext from "../../../context/firebaseactionContext";
import AuthValidationContext from "../../../context/authvalidationContext";
import showToast from "../../../utils/showToast";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useDebounce } from "@uidotdev/usehooks";
import { EyeClosed } from 'lucide-react';
import { Eye } from 'lucide-react';

const Signup = () => {
    const { setAuthView } = useContext(AuthviewContext);
    const { customerList,  } = useContext(FirebaseFetchDataContext)
    const { pushAction } = useContext(FirebaseActionContext)
    const { checkUsernameAvailability,
        validatePassword,
        checkEmailAvailability,
        showPasswordValidationError,
        isUsernameAvailable,
        isEmailAvailable,
        setIsUsernameAvailable,
        setShowPasswordValidationError,
        setIsEmailAvailable 
    } = useContext(AuthValidationContext)
    const { Toast } = showToast()
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ isPasswordMismatch, setIsPasswordMismatch ] = useState(false)
    const [ type, setType ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPass, setShowPass ] = useState(false)
    const [ showRetypePass, setShowRetypePass ] = useState(false)
    const [ date,  ] = useState(new Date())
    const debouncedType = useDebounce(type, 300)

    const shortCustomerId = "C-" + uuidv4().slice(0, 5)
    const initialFormData = {
        id: shortCustomerId,
        name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        location: "",
        dateJoined: format(date, "MM/dd/yy"),
        totalOrders: 0,
        totalSpent: 0,
        lastOrderDate: "",
        orders: [],
        accountStatus: "Active"
    }

    const [ formData, setFormData ] = useState(initialFormData)

    const isMismatch = useCallback((retypePass) => {
        if(formData.password !== retypePass){
            setIsPasswordMismatch(true)
            return false
        }
        setIsPasswordMismatch(false)
        return true
    },[formData])

    const emailConformation = async(email, password) => {
        const isEmailAvailable = checkEmailAvailability(email, customerList)
        if(!isEmailAvailable) return false

        try{
            setIsLoading(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            await updateProfile(user, { displayName: formData.username })
            await sendEmailVerification(user)
            return true

        } catch(error){
            if (error.code === "auth/email-already-in-use") {
                return false
            }
            console.error(error);
        } finally{
            setIsLoading(false)
        }
    }

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        const isUsernameOk =  checkUsernameAvailability(formData.username, customerList)
        const isPasswordOk = validatePassword(formData.password)
        const isRetypePassOk = isMismatch(confirmPassword)

        if (!isUsernameOk || !isPasswordOk || !isRetypePassOk) return

        try{
            const safeData = {
                ...formData,
                orders: formData.orders.length > 0 ? formData.orders : ["__empty__"]
            }

            const isEmailAvailable =  await emailConformation(formData.email, formData.password)

            if(!isEmailAvailable){
                Toast("error", "This email is already registered.", 3000)
                return
            }
            await pushAction("customers", safeData)
            setFormData(initialFormData)
            setConfirmPassword("")
            Toast("success", "Successfully signed up", 2000)
            setAuthView("login")

        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(formData.username !== ""){
            checkUsernameAvailability(formData.username, customerList)
        }
        else{
            setIsUsernameAvailable(true)
        }

        if(formData.password !== ""){
            validatePassword(formData.password)
        }
        else{
            setShowPasswordValidationError(false)
        }

        if(formData.email !== ""){
            checkEmailAvailability(formData.email)
        }
        else{
            setIsEmailAvailable(true)
        }

        if(confirmPassword !== ""){
            isMismatch(confirmPassword)
        }
    }, [debouncedType, formData, checkUsernameAvailability,  validatePassword, checkEmailAvailability, customerList, confirmPassword, isMismatch, setShowPasswordValidationError, setIsUsernameAvailable, setIsEmailAvailable ])

    const inputRow = (labelTitle, type, value, key, placeholder) => {
        return(
            <div className="w-full mb-1">
                <label htmlFor={key}>
                    {labelTitle}
                </label>
                <div className="relative w-full">
                    <input
                    id={key}
                    type={type}
                    name={key}
                    required
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => {
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                        setType(e.target.value)
                    }}
                    />
                    {key === "password" && (
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

  return (
    <>
        <form
            className="flex justify-start items-center flex-col w-[90%] mb-4 relative"
            onSubmit={handleSubmitSignup}
        >
            <h1 className="text-[clamp(2rem,2vw,2.50rem)] font-nunito tracking-wide font-black text-center">
                sign up
            </h1>
            {inputRow("Enter your Username", "type", formData.username, "username", "ex: username")}
            {!isUsernameAvailable && (
                <p className="text-red-600 text-[0.75rem] w-full mt-1">
                    Username already exists.
                </p>
            )}
            {inputRow("Enter your Email", "email", formData.email, "email", "example@gmail.com")}
            {!isEmailAvailable && (
                <p className="text-red-600 text-[0.75rem] w-full mt-1">
                    Email already exists.
                </p>
            )}
            {inputRow("Enter your Password", showPass ? "text" : "password", formData.password, "password", "!Example123")}

            {showPasswordValidationError && (
                <p className="text-red-600 text-[0.75rem] w-full mt-1">
                    Password must be at least 8 characters and include an uppercase
                    letter, a number, and a special character.
                </p>
            )}
            <div className="w-full mb-1">
                <label htmlFor="confrim-Password">
                    Re-Type your Password
                </label>
                <div className="relative w-full">
                    <input
                        id="confrim-Password"
                        type={showRetypePass ? "text" : "password"}
                        required
                        value={confirmPassword}
                        placeholder="!Example123"
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                        className="w-full"
                    />
                    <button 
                        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 bg-transparent border-none cursor-pointer"
                        type="button"
                        onClick={() => setShowRetypePass((prev) => !prev)}
                    >
                        {showRetypePass ? <Eye size={18} /> : <EyeClosed size={18}/>}
                    </button>
                </div>
            </div>
            {isPasswordMismatch && (
                <p className="text-red-600 text-[0.75rem] w-full mt-1">
                    Passwords do not match.
                </p>
            )}
            <button
                type="submit"
                className="bg-[#8c6244] text-white px-6 py-2 rounded-md mt-3 hover:bg-[#734d35] transition-all duration-300"
            >
                Sign Up
            </button>
        </form>
        <button
            onClick={() => setAuthView("login")}
            className="text-[clamp(0.78rem,2vw,1rem)] font-nunito tracking-wide text-blue-500 font-semibold underline text-sm mt-2"
        >
            Back to Login
        </button>
        {isLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto">
                <div className="loader-three">
                    
                </div>
            </div>
        )}
    </>
  )
}

export default Signup;

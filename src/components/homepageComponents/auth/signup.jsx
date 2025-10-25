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
import authValidation from "../../../utils/authValidation";

const Signup = () => {
    const { setAuthView } = useContext(AuthviewContext);
    const { customerList,  } = useContext(FirebaseFetchDataContext)
    const { pushAction } = useContext(FirebaseActionContext)
    const { showPasswordValidationError,
            setShowPasswordValidationError,
            isUsernameAvailable,
            setIsUsernameAvailable
    } = useContext(AuthValidationContext)
    const { Toast } = showToast()
    const { isUsernameExists, isPasswordValid } = authValidation()
    const [ confirmPassword, setConfirmPassword ] = useState("")
    const [ isPasswordMismatch, setIsPasswordMismatch ] = useState(false)
    const [ type, setType ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const [ date,  ] = useState(new Date())
    const debouncedType = useDebounce(type, 300)

    const shortCustomerId = "C-" + uuidv4().slice(0, 5)

    const initialFormData = {
        id: shortCustomerId,
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

    const [ formData, setFormData ] = useState(initialFormData);

    const checkUsernameAvailability = useCallback((username) => {
        const runCheck = () => {
            const usernameExists =  isUsernameExists(username, customerList)
            if (usernameExists) {
                setIsUsernameAvailable(false);
                return false
            }
            setIsUsernameAvailable(true)
            return true
        }

        return runCheck()
    }, [customerList, isUsernameExists, setIsUsernameAvailable])

    const validatePassword = useCallback((password) => {
        const runCheck = () =>{
            const valid = isPasswordValid(password);

            if (!valid) {
                setShowPasswordValidationError(true);
                return false;
            }
            else{
                setShowPasswordValidationError(false)
            }

            if (password !== confirmPassword && confirmPassword !== "") {
                setIsPasswordMismatch(true);
                return false;
            }
            else{
                setIsPasswordMismatch(false)
            }
            return true;
        }
        return runCheck()
    },[confirmPassword, isPasswordValid, setShowPasswordValidationError])

    const emailConformation = async() => {
        const isEmailExists = customerList.some(key => key.email === formData.email)
        if(isEmailExists) return false

        try{
            setIsLoading(true)
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
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
        const isUsernameOk =  checkUsernameAvailability(formData.username)
        const isPasswordOk = validatePassword(formData.password)

        if (!isUsernameOk || !isPasswordOk) return

        try{
            const safeData = {
                ...formData,
                orders: formData.orders.length > 0 ? formData.orders : ["__empty__"]
            }

            const isEmailAvailable =  await emailConformation();

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
            checkUsernameAvailability(debouncedType)
        }
        else{
            setIsUsernameAvailable(true)

        }

        if(formData.password !== ""){
            validatePassword(debouncedType)
        }
        else{
            setShowPasswordValidationError(false)
        }
    }, [debouncedType, checkUsernameAvailability, formData, setIsUsernameAvailable, showPasswordValidationError, validatePassword, setShowPasswordValidationError])

    const inputRow = (labelTitle, type, value, key, placeholder) => {
        return(
            <div className="w-full mb-1">
                <label htmlFor={key}>
                    {labelTitle}
                </label>
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
                    className="w-full"
                />
            </div>
        )
    }

  return (
    <>
        <h1 className="text-[clamp(2rem,2vw,2.50rem)] font-nunito tracking-wide font-black text-center">
            sign up
        </h1>
        <form
            className="flex justify-start items-center flex-col w-[90%] mb-4 relative"
            onSubmit={handleSubmitSignup}
        >
            {inputRow("Enter your Username", "type", formData.username, "username", "ex: user")}
            {!isUsernameAvailable && (
                <p className="text-red-600 text-[0.75rem] w-full mt-1">
                    Username already exists.
                </p>
            )}
            {inputRow("Enter your Email", "email", formData.email, "email", "example@gmail.com")}
            {inputRow("Enter your Password", "password", formData.password, "password", "!Example123")}
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
                <input
                    id="confrim-Password"
                    type="password"
                    required
                    value={confirmPassword}
                    placeholder="!Example123"
                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                    className="w-full"
                />
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
  );
};

export default Signup;

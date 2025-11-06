import {  useContext, useState, useEffect } from "react"
import { auth } from "../../../firebase";
import { updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import AuthviewContext from "../../../context/autviewContext"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext";
import FirebaseActionContext from "../../../context/firebaseactionContext";
import AuthValidationContext from "../../../context/authvalidationContext";
import { generateVerificationCode } from "../../../utils/generateVerificationCode";
import { sendVerificationCode } from "../../../utils/sendVerificationCode";
import showToast from "../../../utils/showToast";
import removeFireBaseKey from "../../../utils/removeFirebaseKey";
import { useDebounce } from "@uidotdev/usehooks";
import { EyeClosed } from 'lucide-react';
import { Eye } from 'lucide-react';
const Forgot = () =>{
    const { setAuthView } = useContext(AuthviewContext)
    const { adminList, customerList } = useContext(FirebaseFetchDataContext)
    const { updateAction } = useContext(FirebaseActionContext)
    const { validatePassword, 
        showPasswordValidationError,
        setShowPasswordValidationError
    } = useContext(AuthValidationContext)
    const { Toast } = showToast()
    const [ email, setEmail ] = useState(sessionStorage.getItem("email") || "")
    const [ generateCode, setGenerateCode ] = useState(sessionStorage.getItem("code") || "")
    const [ newPassword, setNewPassword] = useState("")
    const [ code, setCode ] = useState("")
    const [ minutes, setMinutes ] =  useState(Number(sessionStorage.getItem("minutes")) || 3)
    const [ seconds, setSeconds ] = useState(Number(sessionStorage.getItem("seconds")) || 0)
    const [ start, setStart ] = useState(sessionStorage.getItem("start") === "true" ? true : false)
    const [ isCodeMismatch, setIsCodeMismatch] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ showPass, setShowPass ] = useState(false)
    const debouncedType = useDebounce(newPassword, 300)

    useEffect(() => {
        if(start){
            const timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer)
                    setGenerateCode("")
                    setStart(false)
                    setMinutes(3)
                    setSeconds(0)
                    sessionStorage.removeItem("start")
                    sessionStorage.removeItem("minutes");
                    sessionStorage.removeItem("seconds");
                    sessionStorage.removeItem("code")
                } 
                else{
                    sessionStorage.setItem("email", email)
                    sessionStorage.setItem("start", true)
                    setMinutes((prev) => prev - 1)
                    setSeconds(59)
                }
            } else {
                setSeconds((prev) => prev - 1);
                sessionStorage.setItem("minutes", minutes)
                sessionStorage.setItem("seconds", seconds)
            }
        }, 1000)

    return () => clearInterval(timer);
        }
    }, [start, email, minutes, seconds])

    useEffect(() => {
        if(debouncedType !== ""){
            validatePassword(debouncedType)
        }
        else{
            setShowPasswordValidationError(false)
        }
    }, [debouncedType, validatePassword, setShowPasswordValidationError])

    const findUser = (list) => {
        return list.find(key => key.email === email)
    }

    const checkTheCode = (code) => {
        if(code !== generateCode){
            setIsCodeMismatch(true)
            return false
        }
        setIsCodeMismatch(false)
        return true
    }

    const getTheGenerateCode = async () => {
        const admin = findUser(adminList)
        const customer = findUser(customerList)
        console.log(admin)
        console.log(customer)
        if(!admin && !customer) return
        const user = admin || customer
        const code = generateVerificationCode()
        const isSuccessful = await sendVerificationCode(user.email, user.username, code)
        if(isSuccessful){
            Toast("success", "Check your email to get the Code", 4000)
            setGenerateCode(code)
            setStart(true)
        }
        sessionStorage.setItem("code", code)
    }


    const handleForgotPass = async (e) => {
        e.preventDefault()
        const isValid = validatePassword(debouncedType)
        const isCodeOk = checkTheCode(code)

        if(!isValid || !isCodeOk) return
        const admin = findUser(adminList)
        const customer = findUser(customerList)
        const user = admin || customer
        try {
            setIsLoading(true)
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            const firebaseUser  = userCredential.user;
            const safeUserData = removeFireBaseKey(user)
            const updatedPass = {...safeUserData, password: newPassword}
            if(admin){
                await updatePassword(firebaseUser, newPassword)
                await updateAction("admins", user.firebaseKey, updatedPass)
            }
            if(customer){
                await updatePassword(firebaseUser, newPassword)
                await updateAction("customers", user.firebaseKey, updatedPass)
            }
        } catch(error) {
            console.log(error)
        } finally{
            setIsLoading(false)
        }
        Toast("success", "Password updated successfully!", 2000)
        setStart(false)
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("start")
        sessionStorage.removeItem("minutes");
        sessionStorage.removeItem("seconds");
        sessionStorage.removeItem("code")
        setAuthView("login")

    }

    return(
        <>
            <h1 className="text-[clamp(1.50rem,2vw,2rem)] font-nunito tracking-wide font-black text-center">
                forgot password
            </h1>
            <form
                className="flex justify-start items-center flex-col w-[90%] mb-4 relative"
                onSubmit={handleForgotPass}
            >
                <label htmlFor="email">
                    Enter your email:
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="container-flex w-full h-auto mt-2 mb-0 gap-1">
                    <div className="container-flex w-full h-auto mb-0">
                        <label htmlFor="input-code" 
                        className="whitespace-nowrap w-auto">
                            Enter the Code:
                        </label>
                        <input
                            id="input-code"
                            type="number"
                            value={code}
                            onChange={(e) => {
                                const value = e.target.value.slice(0, 6);
                                setCode(value);
                            }}
                            onFocus={() => setIsCodeMismatch(false)}
                            placeholder="Enter 6-digit code"
                            required
                            className={`w-auto px-1 ${isCodeMismatch ?"border border-red-500" : ""}`}
                        />
                    </div>
                    <button
                        type="button"
                        className={`bg-[#88A550] text-white px-4 py-2 rounded shadow-md w-[28%] sm:w-[45%] h-auto transition-transform duration-300 ease-in-out text-[0.80rem] whitespace-nowrap
                        hoverable:hover:bg-[#7a9549] hoverable:hover:scale-105 hoverable:hover:shadow-[0_4px_12px_rgba(136,165,80,0.4)] active:translate-y-1 active:shadow-none
                            ${start ? "cursor-not-allowed" : "cursor-pointer"}
                        `}
                        onClick={() => getTheGenerateCode()}
                        disabled={start}
                    >
                        Send Code
                    </button>
                </div>
                <div className="container-flex justify-between w-full h-auto p-1 mb-0">
                    {isCodeMismatch && (
                        <p className="text-red-600 text-[0.75rem] w-full">
                            Incorrect code. Check your email and try again.
                        </p>
                    )}
                    {start && (
                        <p className="text-blue-600 text-[0.75rem] w-full text-right">
                            Resend in: {minutes}:{seconds.toString().padStart(2, "0")}
                        </p>
                    )}
                </div>
                <label htmlFor="new-password">
                    Enter your new password:
                </label>
                <div className="relative w-full">
                    <input
                    id="new-password"
                    type={showPass ? "text" : "password"}
                    placeholder="********"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button 
                        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 bg-transparent border-none cursor-pointer"
                        type="button"
                        onClick={() => setShowPass((prev) => !prev)}
                    >
                        {showPass ? <Eye size={18} /> : <EyeClosed size={18}/>}
                    </button>
                </div>
                {showPasswordValidationError && (
                    <p className="text-red-600 text-[0.75rem] w-full mt-1">
                        "Password must be at least 8 characters and include an uppercase letter, a number, and a special character."
                    </p>
                )}
                <button
                    type="submit"
                    className="bg-[#8c6244] text-white px-6 py-2 rounded-md mt-3 hover:bg-[#734d35] transition-all duration-300"
                >
                    Confrim
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

export default Forgot
import { useState, useEffect, useContext } from "react"
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext";
import AuthviewContext from "../../../context/autviewContext"
import ModalContext from "../../../context/modalContext";
import showToast from "../../../utils/showToast";
import { EyeClosed } from 'lucide-react';
import { Eye } from 'lucide-react';
const Login = () => {
    const { setAuthView } = useContext(AuthviewContext)
    const { 
        adminList, 
        customerList,
    } = useContext(FirebaseFetchDataContext)
    const { toggleModal } = useContext(ModalContext)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loginError, setLoginError ] = useState(false)
    const [ showPass, setShowPass ] = useState(false)
    const { Toast } = showToast()
    const navigate = useNavigate()

    useEffect(() => {
        setAuthView("login")
    },[setAuthView])

    const checkEmailVefication = async(email, password) => {
        try {
            setIsLoading(true)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            await userCredential.user.reload()
            return userCredential.user
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogin = async(e) => {
        e.preventDefault()
        const admin = adminList.find(key => key.username === username && key.password === password)
        const customer = customerList.find(key => key.username === username && key.password === password)
        if(admin){
            if(username === "jericho.admin"){
                toggleModal(false)
                navigate(`/Adminpage/${admin.id}/${admin.username}`)
            }
            else{
                const user = await checkEmailVefication(admin.email, admin.password)
                if(user?.emailVerified) {
                    toggleModal(false)
                    navigate(`/Adminpage/${admin.id}/${admin.username}`)
                }
                else {
                    Toast("error", "Please verify your email first before continuing. Check your email spam.", 5000)
                    setLoginError(false)
                    return 
                }
            }
        }
        else if(customer){
            if(customer.accountStatus === "Block"){
                Toast("error", "Your account is currently restricted because it did not follow our guidelines.", 5000)
                return
            }
            const user = await checkEmailVefication(customer.email, customer.password)
            if(user?.emailVerified){
                toggleModal(false)
                navigate(`/Customerpage/${customer.id}/${customer.username}`)
            }
            else {
                Toast("error", "Please verify your email first before continuing. Check your email spam.", 5000)
                return
            }
            
        }
        else{
            setLoginError(true)
        }
        
    }

    return(
       <>
            <h1 
                className="text-[clamp(2rem,2vw,2.50rem)] font-nunito tracking-wide font-black text-center"
            >
                login
            </h1>
            <form 
                className="flex justify-center items-center flex-col w-[90%] mb-4 relative"
                onSubmit={handleLogin}
            >
                <label htmlFor="username">
                    Username:
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="ex: user"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">
                    Password:
                </label>
                <div className="relative w-full">
                    <input
                        id="password"
                        type={showPass ? "text" : "password"}
                        placeholder="********"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        className="absolute top-1/2 right-2 -translate-y-1/2 p-1 bg-transparent border-none cursor-pointer"
                        type="button"
                        onClick={() => setShowPass((prev) => !prev)}
                    >
                        {showPass ? <Eye size={18} /> : <EyeClosed size={18}/>}
                    </button>
                </div>
                {loginError && (
                    <p className="text-red-600 text-[0.75rem] w-full mt-1">
                        "Invalid username or password. Please try again."
                    </p>
                )}
                <button
                    type="submit"
                    className="bg-[#8c6244] text-white px-6 py-2 rounded-md mt-3 hover:bg-[#734d35] transition-all duration-300"
                >
                    Login
                </button>
            </form>
            <button 
                onClick={() => setAuthView("signup")}
                className="text-[clamp(0.78rem,2vw,1rem)] font-nunito tracking-wide text-blue-500 font-semibold underline text-sm mt-2"
            >
                Don't have an account? Sign up
            </button>
            <button 
                onClick={() => setAuthView("forgot")}
                className="text-[clamp(0.78rem,2vw,1rem)] font-nunito tracking-wide text-blue-500 font-semibold underline text-sm mt-2"
            >
                Forgot password?
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

export default Login
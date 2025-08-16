import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import AuthviewContext from "../../../context/autviewContext"
import FetchDataContext from "../../../context/fetchdataContext"
import ModalContext from "../../../context/modalContext";
const Login = () =>{
    const { setAuthView } = useContext(AuthviewContext)
    const { adminList, setAdminsIsLoading } = useContext(FetchDataContext)
    const { toggleModal } = useContext(ModalContext)
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ loginError, setLoginError ] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setAuthView("login")
    },[setAuthView])

    const handleLogin = (e) => {
        e.preventDefault()
        const user = adminList.find(key => key.username === username && key.password === password)

        if(user){
            setAdminsIsLoading(true)
            toggleModal(false)
            navigate(`/Adminpage/${user.id}/${user.username}`);
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
                className="flex justify-center items-center flex-col w-[90%] mb-4"
                onSubmit={handleLogin}
            >
                <label htmlFor="username">
                    Enter your username:
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div>

                </div>
                <label htmlFor="password">
                    Enter your password:
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
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
        </>
    )
}

export default Login
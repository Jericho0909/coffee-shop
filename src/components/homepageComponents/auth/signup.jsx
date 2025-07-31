import { useContext, useState } from "react"
import AuthviewContext from "../../../context/autviewContext"
import ActionContext from "../../../context/actionContext";
import FetchDataContext from "../../../context/fetchdataContext";
import { toast } from "react-hot-toast";
const Signup = () =>{
    const { setAuthView } = useContext(AuthviewContext)
    const { adminList, setAdminList } = useContext(FetchDataContext)
    const { addAction } = useContext(ActionContext)
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ retypePassword, setReTypePassword ] = useState("")
    const [ userFound, setUserFound ] = useState(true)
    const [ mismatch, setMismatch ] = useState(false)
    const [ showPasswordError, setShowPasswordError ] = useState(false);

    const accountType = async (username) => {
        const user = adminList.find(key => key.username === username)
        if (user){
            console.log(user)
            setUserFound(false)
            return false
        } 

        if(username.endsWith(".admin")) {
            const id = adminList.length > 0 ? (+adminList[adminList.length - 1].id + 1).toString() : "1";
      
            const newAdmin = {
                id: id,
                username: username,
                password: password
            }

            const response = await addAction("admins", newAdmin)
            setAdminList(prev => [...prev, response])
        }
        else{
            console.log("ito ay customer")
        }
        setUserFound(true)

    }

    const isPasswordValid = (password) => {
        const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
        if(password !== retypePassword){
            setMismatch(true)
            return false
        }

        if(pattern.test(password)){
            setShowPasswordError(false)
            setMismatch(false)
            return true
        }
        else{
            setShowPasswordError(true)
            return false
        }

    }

    const handleSignup = async (e) => {
        e.preventDefault()

        const isAccountValid = await accountType(username);
        const isPassValid = isPasswordValid(password);

        if (!isAccountValid || !isPassValid) {
            return;
        }

        toast.success(
            <div className="Notification">
                Successfully signed up!
            </div>,
            {
                style: {
                    width: '100%',
                    backgroundColor: 'white',
                    color: '#8c6244',
                    padding: '12px 16px',
                    borderRadius: '8px',
                },
                duration: 2000,
            }
        );
        
    }

    return(
        <>
            <h1 className="text-[clamp(2rem,2vw,2.50rem)] font-nunito tracking-wide font-black text-center">
                signup
            </h1>
            <form 
                className="flex justify-start items-center flex-col w-[90%] mb-4"
                onSubmit={handleSignup}
            >
                <label htmlFor="username">
                    Enter your Username:
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {!userFound && (
                    <p className="text-red-600 text-[0.75rem] w-full mt-1">
                        "Username already exists."
                    </p>
                )}
                <label htmlFor="password">
                    Enter your Password:
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {showPasswordError && (
                    <p className="text-red-600 text-[0.75rem] w-full mt-1">
                        "Password must be at least 8 characters and include an uppercase letter, a number, and a special character."
                    </p>
                )}
                <label htmlFor="retype-password">
                    Retype your Password:   
                </label>
                <input
                    id="retype-password"
                    type="password"
                    placeholder="Enter your Password"
                    required
                    value={retypePassword}
                    onChange={(e) => setReTypePassword(e.target.value)}
                    style={mismatch ? { borderColor: "red" } : {}}
                />
                {mismatch && (
                    <p className="text-red-600 text-[0.75rem] w-full mt-1">
                        Passwords do not match.
                    </p>
                )}
                <button
                    type="submit"
                    className="bg-[#8c6244] text-white px-6 py-2 rounded-md mt-3 hover:bg-[#734d35] transition-all duration-300"
                >
                    SignUp
                </button>
            </form>
            <button 
                    onClick={() => setAuthView("login")}
                    className="text-[clamp(0.78rem,2vw,1rem)] font-nunito tracking-wide text-blue-500 font-semibold underline text-sm mt-2"
            >
                Back to Login
            </button>
        </>
    )
}

export default Signup
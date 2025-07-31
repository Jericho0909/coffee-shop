import {  useContext, useState } from "react"
import AuthviewContext from "../../../context/autviewContext"
import FetchDataContext from "../../../context/fetchdataContext";
import ActionContext from "../../../context/actionContext";
import { toast } from "react-hot-toast";
const Forgot = () =>{
    const { setAuthView } = useContext(AuthviewContext)
    const { patchAction } = useContext(ActionContext)
    const { adminList, setAdminList } = useContext(FetchDataContext)
    const [ username, setUsername ] = useState("")
    const [ newPassword, setNewPassword] = useState("")
    const [ userFound, setUserFound ] = useState(true)
    const [ showPasswordError, setShowPasswordError ] = useState(false);

    const Notify = () =>{
        toast.success(
            <div className="Notification">
                Password updated successfully!
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
    
    const checkUsernameExists = (user) => {
        if(user){
            setUserFound(true)
            return true

        }
        else{
            setUserFound(false)
            return false
        }
    }

    const isPasswordValid = (newPassword) => {
        const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
        if(pattern.test(newPassword)){
            setShowPasswordError(false)
            return true
        }
        setShowPasswordError(true)
        return false

    }

    const handleForgotPass = async (e) => {
        e.preventDefault()
        const user = adminList.find(key => key.username === username)

        if(!checkUsernameExists(user) || !isPasswordValid(newPassword)) return

        Notify()
        const updatedPass = {...user, password: newPassword}
        const response = await patchAction("admins", user.id, updatedPass)
        setAdminList(prev => [...prev, response])

    }

    return(
        <>
            <h1 className="text-[clamp(1.50rem,2vw,2rem)] font-nunito tracking-wide font-black text-center">
                forgot password
            </h1>
            <form
                className="flex justify-start items-center flex-col w-[90%] mb-4"
                onSubmit={handleForgotPass}
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
                    style={!userFound ? {borderColor: "red"} : {}}
                />
                {!userFound && (
                    <p className="text-red-600 text-[0.75rem] w-full mt-1">
                        Username not found!
                    </p>
                )}
                <label htmlFor="new-password">
                    Enter your new password:
                </label>
                <input
                    id="new-password"
                    type="password"
                    placeholder="Enter your username"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                {showPasswordError && (
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
        </>
    )
}

export default Forgot
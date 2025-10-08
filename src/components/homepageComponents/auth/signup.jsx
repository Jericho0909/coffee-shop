import { useContext, useState } from "react";
import AuthviewContext from "../../../context/autviewContext";
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext";
import FirebaseActionContext from "../../../context/firebaseactionContext";
import AuthValidationContext from "../../../context/authvalidationContext";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

const Signup = () => {
    const { setAuthView } = useContext(AuthviewContext);
    const { customerList,  } = useContext(FirebaseFetchDataContext)
    const { pushAction } = useContext(FirebaseActionContext)
    const { isUsernameExists,
            isPasswordValid,
            showPasswordValidationError,
            setShowPasswordValidationError,
            isUsernameAvailable,
            setIsUsernameAvailable
    } = useContext(AuthValidationContext)

    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ isPasswordMismatch, setIsPasswordMismatch ] = useState(false)
    const [ date,  ] = useState(new Date())

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
    };

    const [formData, setFormData] = useState(initialFormData);

    const checkUsernameAvailability = async (username) => {
        const usernameExists = await isUsernameExists(username, customerList);
        if (usernameExists) {
            setIsUsernameAvailable(false);
            return false;
        }
        setIsUsernameAvailable(true);
        return true;
    };

    const validatePassword = (password) => {
        const valid = isPasswordValid(password);

        if (!valid) {
            setShowPasswordValidationError(true);
            return false;
        }
        else{
            setShowPasswordValidationError(false)
        }

        if (password !== confirmPassword) {
            setIsPasswordMismatch(true);
            return false;
        }
        else{
            setIsPasswordMismatch(false)
        }


        return true;
    };

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        const isUsernameOk = await checkUsernameAvailability(formData.username);
        const isPasswordOk = validatePassword(formData.password);

        if (!isUsernameOk || !isPasswordOk) return

        const safeData = {
            ...formData,
            orders: formData.orders.length > 0 ? formData.orders : ["__empty__"]
        }

        await pushAction("customers", safeData)

        toast.success(
        <div className="Notification">Successfully signed up!</div>,
        {
            style: {
            width: "100%",
            backgroundColor: "white",
            color: "#8c6244",
            padding: "12px 16px",
            borderRadius: "8px",
            },
            duration: 2000,
        }
        );
    };

  return (
    <>
        <h1 className="text-[clamp(2rem,2vw,2.50rem)] font-nunito tracking-wide font-black text-center">
            sign up
        </h1>
        <form
            className="flex justify-start items-center flex-col w-[90%] mb-4"
            onSubmit={handleSubmitSignup}
        >
            <label htmlFor="username">Enter your Username:</label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                value={formData.username}
                onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                }
            />
            {!isUsernameAvailable && (
                <p className="text-red-600 text-[0.75rem] w-full mt-1">
                    Username already exists.
                </p>
            )}

            <label htmlFor="password">Enter your Password:</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your Password"
                required
                value={formData.password}
                onChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                }
            />
            {showPasswordValidationError && (
                <p className="text-red-600 text-[0.75rem] w-full mt-1">
                    Password must be at least 8 characters and include an uppercase
                    letter, a number, and a special character.
                </p>
            )}

            <label htmlFor="confirmPassword">Retype your Password:</label>
            <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={isPasswordMismatch ? { borderColor: "red" } : {}}
                />
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
    </>
  );
};

export default Signup;

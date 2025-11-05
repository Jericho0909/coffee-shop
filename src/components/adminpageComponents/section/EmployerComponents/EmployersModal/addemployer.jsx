import { useState, useContext,  useEffect } from "react";
import { auth } from "../../../../../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification,
updateProfile } from "firebase/auth";
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext";
import FirebaseActionContext from "../../../../../context/firebaseactionContext";
import ModalContext from "../../../../../context/modalContext";
import AuthValidationContext from "../../../../../context/authvalidationContext";
import EmployerForm from "../Employer/employerformjsx";
import { v4 as uuidv4 } from "uuid";
import showToast from "../../../../../utils/showToast";
import { useDebounce } from "@uidotdev/usehooks";

const AddEmployer = () => {
    const { adminList } = useContext(FirebaseFetchDataContext)
    const { pushAction } = useContext(FirebaseActionContext)
    const { toggleModal } = useContext(ModalContext)
    const { checkUsernameAvailability,
        validatePassword,
        checkEmailAvailability,
        setIsUsernameAvailable,
        setIsEmailAvailable,
        setShowPasswordValidationError
    } = useContext(AuthValidationContext)
    const [ type, setType ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const { Toast } = showToast()
    const debouncedType = useDebounce(type, 300)

    const shortAdminId = "A-" + uuidv4().slice(0, 5)
    const shortEmployerId = "E-" + uuidv4().slice(0, 5)

    const initialEmployerData = {
        id: shortEmployerId,
        name: "",
        email: "",
        gender: "",
        phone: "",
        location: "",
        role: "",
        status: "Active"
    };

    const [ employerData, setEmployerData ] = useState(initialEmployerData);

    const initialAdminData = {
        id: shortAdminId,
        name: "",
        username: "",
        password: "",
        role: "Admin",
        email: "",
        phone: "",
        location: ""

    };

    const [ adminData, setAdminData ] = useState(initialAdminData)


    const emailConformation = async(email, password) => {
        const EmailExists = checkEmailAvailability(employerData.email)
        if(!EmailExists) return false
        try {
            setIsLoading(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            await updateProfile(user, { displayName: adminData.name })
            await sendEmailVerification(user)
            return true

        } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                return false
            }
            console.error(error)
            return false
        } finally {

            setIsLoading(false)
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (adminData.username !== ""){
            if(!adminData.username.endsWith(".admin")) return
            const isEmailAvailable = await emailConformation(employerData.email, adminData.password)
            const isAdminUsernameOk = checkUsernameAvailability(adminData.username, adminList)
            const isPasswordOk = validatePassword(adminData.password)
            if (!isEmailAvailable || !isAdminUsernameOk || !isPasswordOk) return

            await pushAction("admins", adminData);
        }

        await pushAction("employers", employerData)

        setEmployerData(initialEmployerData);
        setAdminData(initialAdminData)
        toggleModal();

        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            })
        }, 0)

        Toast("success", "New employer has been successfully added!", 2000)
    }

    useEffect(() => {
        if(adminData.username !== ""){
            checkUsernameAvailability(adminData.username, adminList)
        }
        else{
            setIsUsernameAvailable(true)
        }

        if(adminData.password !== ""){
            validatePassword(adminData.password)
        }
        else{
            setShowPasswordValidationError(false)
        }

        if(employerData.email !== "" && employerData.role === "Admin"){
            checkEmailAvailability(employerData.email)
        }
        else{
            setIsEmailAvailable(true)
        }

    }, [debouncedType, adminData, adminList, employerData, checkEmailAvailability, checkUsernameAvailability, validatePassword, setIsEmailAvailable, setIsUsernameAvailable, setShowPasswordValidationError])



    return (
        <>
            <form
            className="flex justify-center items-center flex-col w-full h-auto relative"
            onSubmit={handleSubmit}
            >
                <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
                    Add Employer
                </h1>
                <EmployerForm
                    employerData = {employerData}
                    setEmployerData = {setEmployerData}
                    adminData = {adminData}
                    setAdminData = {setAdminData}
                    setType = {setType}

                />

                <div className="flex justify-center items-center w-full h-auto">
                    <button
                        type="submit"
                        className="press  hoverable:hover:bg-[#8b5e3c] 
                        hoverable:hover:scale-105 
                        hoverable:hover:shadow-[0_4px_12px_rgba(111,78,55,0.4)] w-[40%]"
                        style={{ fontVariant: "small-caps" }}
                        >
                        Confirm
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
};

export default AddEmployer;

import { useState, useContext, useCallback, useEffect } from "react";
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext";
import FirebaseActionContext from "../../../../../context/firebaseactionContext";
import ModalContext from "../../../../../context/modalContext";
import ContainerContext from "../../../../../context/containerContext";
import AuthValidationContext from "../../../../../context/authvalidationContext";
import EmployerForm from "../Employer/employerformjsx";
import { v4 as uuidv4 } from "uuid";
import showToast from "../../../../../utils/showToast";
import authValidation from "../../../../../utils/authValidation";
import { useDebounce } from "@uidotdev/usehooks";

const AddEmployer = () => {
    const { adminList} = useContext(FirebaseFetchDataContext)
    const { pushAction } = useContext(FirebaseActionContext)
    const { toggleModal } = useContext(ModalContext)
    const {setShowPasswordValidationError,
            setIsUsernameAvailable,
            setEndsWithAdmin
    } = useContext(AuthValidationContext)
    const { container } = useContext(ContainerContext)
    const [ type, setType ] = useState("")
    const { Toast } = showToast()
    const { isUsernameExists, isPasswordValid } = authValidation()
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
    };

    const [ adminData, setAdminData ] = useState(initialAdminData)


    const validateAdminData = useCallback((username, password) => {
        const runCheck = () => {
            const isValidPassword = isPasswordValid(password);
            const usernameExists = isUsernameExists(username, adminList)

            if (usernameExists && adminData.username !== "") {
                setIsUsernameAvailable(false)
                return false;
            }
            else{
                setIsUsernameAvailable(true);
            }

            if (!isValidPassword && adminData.password !== "") {
                setShowPasswordValidationError(true)
                return false;
            }
            else{
                setShowPasswordValidationError(false)
            }

            if(!username.endsWith(".admin")){
                setEndsWithAdmin(false)
                return false
            }
            else{
                setEndsWithAdmin(true)
            }
            return true;
        }
        return runCheck()
    }, [adminList, isPasswordValid, isUsernameExists, setEndsWithAdmin, setIsUsernameAvailable, setShowPasswordValidationError, adminData])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (adminData.username !== "") {
            const isAdminValid = validateAdminData(adminData.username, adminData.password)
            if (!isAdminValid) return

            await pushAction("admins", adminData);
        }

        await pushAction("employers", employerData);


        setEmployerData(initialEmployerData);
        setAdminData(initialAdminData)
        toggleModal();

        setTimeout(() => {
            const employersContainer = container.current;
            if (employersContainer) {
                employersContainer.scrollTop = employersContainer.scrollHeight;
            }
        },0)

        Toast("success", "New employer has been successfully added!", 2000)
    }

    useEffect(() => {
        validateAdminData(adminData.username, adminData.password)
    }, [debouncedType, adminData, validateAdminData])



    return (
        <form
        className="flex justify-center items-center flex-col w-full h-auto"
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
                    className="press w-[40%]"
                    style={{ fontVariant: "small-caps" }}
                    >
                    Confirm
                </button>
            </div>
        </form>
    )
};

export default AddEmployer;

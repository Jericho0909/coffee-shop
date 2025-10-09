import { useState, useContext } from "react";
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext";
import FirebaseActionContext from "../../../../../context/firebaseactionContext";
import ModalContext from "../../../../../context/modalContext";
import ContainerContext from "../../../../../context/containerContext";
import AuthValidationContext from "../../../../../context/authvalidationContext";
import EmployerForm from "../Employer/employerformjsx";
import { v4 as uuidv4 } from "uuid";
import showToast from "../../../../../utils/showToast";

const AddEmployer = () => {
    const { adminList} = useContext(FirebaseFetchDataContext)
    const { pushAction } = useContext(FirebaseActionContext)
    const { toggleModal } = useContext(ModalContext)
    const {isUsernameExists,
            isPasswordValid,
            setShowPasswordValidationError,
            setIsUsernameAvailable,
            setEndsWithAdmin
    } = useContext(AuthValidationContext)
    const { container } = useContext(ContainerContext)
    const { Toast } = showToast()

    const shortAdminId = "A-" + uuidv4().slice(0, 5)
    const shortEmployerId = "E-" + uuidv4().slice(0, 5)

    const initialEmployerData = {
        id: shortEmployerId,
        name: "",
        email: "",
        gender: "",
        phone: "",
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


    const validateAdminData = async (username) => {
        
        const isValidPassword = isPasswordValid(adminData.password);
        const usernameExists = await isUsernameExists(adminData.username, adminList)
        if(!username.endsWith(".admin")){
            setEndsWithAdmin(false)
            return false
        }
        else{
            setEndsWithAdmin(true)
        }

        if (usernameExists) {
            setIsUsernameAvailable(false);
            return false;
        }
        else{
            setIsUsernameAvailable(true);
        }

        if (!isValidPassword) {
            setShowPasswordValidationError(true)
            return false;
        }
        else{
            setShowPasswordValidationError(false)
        }


        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (adminData.username !== "") {
            const isAdminValid = await validateAdminData(adminData.username);
            if (!isAdminValid) return;

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
    };

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
  );
};

export default AddEmployer;

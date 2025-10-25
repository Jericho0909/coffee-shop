import { useContext, useState, useCallback, useEffect } from "react"
import { auth } from "../../../../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, deleteUser,
updateProfile } from "firebase/auth";
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext"
import FirebaseActionContext from "../../../../../context/firebaseactionContext"
import ModalContext from "../../../../../context/modalContext"
import AddHighlightContext from "../../../../../context/addhighlightContext"
import AuthValidationContext from "../../../../../context/authvalidationContext"
import EmployerForm from "../Employer/employerformjsx"
import showToast from "../../../../../utils/showToast"
import removeFireBaseKey from "../../../../../utils/removeFirebaseKey"
import authValidation from "../../../../../utils/authValidation"
import { useDebounce } from "@uidotdev/usehooks";
const ManageEmployer = () => {
    const { 
        adminList,
        employerList, 
    } = useContext(FirebaseFetchDataContext)
    const { 
        pushAction, 
        updateAction, 
        removeAction 
    } = useContext(FirebaseActionContext)
    const {setShowPasswordValidationError,
            setIsUsernameAvailable,
            setEndsWithAdmin
    } = useContext(AuthValidationContext)
    const { toggleModal } = useContext(ModalContext)
    const { highlightUpdated } = useContext(AddHighlightContext)
    const { isUsernameExists, isPasswordValid } = authValidation()
    const { Toast } = showToast()
    const [ type, setType ] = useState("")
    const [ employerID, ] = useState(sessionStorage.getItem("employerID"))
    const [ employerName, ] = useState(sessionStorage.getItem("employerName"))
    const debouncedType = useDebounce(type, 300)

    const selectedAdmin = adminList.find(key => key.name === employerName && key.role === "Admin")
    const selectedEmployer = employerList.find(key => key.id === employerID)

    const [ editableAdminData, setEditableAdminData ] = useState(selectedAdmin)
    const [ editableEmployerData, setEditableEmployerData ] = useState(selectedEmployer)

    const isUsernameChanged = selectedAdmin?.username !== editableAdminData?.username

    const validateAdminUsername = useCallback((username) => {
        const runCheck = () => {
            const usernameExists = isUsernameExists(username, adminList)
            if(usernameExists){
                setIsUsernameAvailable(false)
                return false;
            }
            else{
                setIsUsernameAvailable(true);
            }

            if((!username.endsWith(".admin") && isUsernameChanged)){
                setEndsWithAdmin(false)
                return false
            }
            else{
                setEndsWithAdmin(true)
            }
            return true;
        }
        return runCheck()
    }, [adminList, isUsernameExists, setEndsWithAdmin, setIsUsernameAvailable, isUsernameChanged])

    const emailConformation = async(email, password) => {
            const isEmailExists = adminList.some(key => key.email === email)
            if(isEmailExists) return false
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user
                await updateProfile(user, { displayName: editableAdminData.username })
                await sendEmailVerification(user)
                return true
    
            } catch (error) {
                    if (error.code === "auth/email-already-in-use") {
                    return false
                }
                console.error(error);
                return false
            }
        }

    const validateAdminPassword = useCallback((password) => {
        const runCheck = () => {

            const isValidPassword = isPasswordValid(password)
            if (!isValidPassword){
                setShowPasswordValidationError(true)
                return false;
            }
            else{
                setShowPasswordValidationError(false)
            }
            return true
        }
        return runCheck()
    }, [isPasswordValid, setShowPasswordValidationError])

    const removeAdminFromList = async(email, password, deleteOnList) => {
        const updatedAdminList = adminList.filter(key => key.id !== selectedAdmin.id)
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            await deleteUser(user)
            if(deleteOnList){
                await removeAction("admins", selectedAdmin.firebaseKey
                , updatedAdminList)
            }
        }catch(error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(selectedAdmin && editableEmployerData.role !== "Admin"){
            removeAdminFromList(selectedAdmin.email, selectedAdmin.password, true)
        }
        else{
            if(isUsernameChanged){
                const isValid = validateAdminUsername(editableAdminData.username)
                if(!isValid){
                    return
                }
            }
            const checkAdminExist = adminList.find(key => key.id === employerID || key.name === employerName)
            if(editableEmployerData.role === "Admin" && !checkAdminExist){
                const isEmailAvailable = emailConformation(editableAdminData.email, editableAdminData.password)
                if(!isEmailAvailable) return
                const { gender, status,  ...data} = editableEmployerData
                const promotetoAdmin = {
                    ...data
                }

                await pushAction("admins", promotetoAdmin)
            }
            else{
                if(selectedAdmin){
                    if(selectedAdmin.email !== editableEmployerData.email){
                        emailConformation(editableEmployerData.email, editableAdminData.password)
                        removeAdminFromList(selectedAdmin.email, selectedAdmin.password, false)
                        
                    }
                    const safeEmployerData = removeFireBaseKey(editableEmployerData)
                    const { gender, status,  ...data} = safeEmployerData
                    const updatedAdminData = {
                        ...data
                    }
                    await updateAction("admins", selectedAdmin.firebaseKey, updatedAdminData)
                }
            }

        }

        const safeEmployerData = removeFireBaseKey(editableEmployerData)

        await updateAction("employers", selectedEmployer.firebaseKey
        , safeEmployerData)
        toggleModal()
        Toast("success", "Employer updated successfully!", 2000)
        highlightUpdated(selectedEmployer.id)
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if(selectedAdmin){
            removeAdminFromList(selectedAdmin.email, selectedAdmin.password, true)
        }

        const updatedEmployerList = employerList.filter(key => key.id !== selectedEmployer.id)
        await removeAction("employers", selectedEmployer.firebaseKey
        , updatedEmployerList)
        toggleModal()
        Toast("success", "Employer deleted successfully!", 2000)
    }

    useEffect(() => {
        if(selectedAdmin){
            if(isUsernameChanged){
                validateAdminUsername(editableAdminData.username)
            }
            validateAdminPassword(editableAdminData.password)
        }
    }, [debouncedType, validateAdminUsername, validateAdminPassword, editableAdminData, selectedAdmin, isUsernameChanged])

    return (
        <form
            className="flex justify-center items-center flex-col w-full h-auto"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
            Manage Employer
            </h1>
            <EmployerForm
                employerData = {editableEmployerData}
                setEmployerData = {setEditableEmployerData}
                adminData = {editableAdminData}
                setAdminData = {setEditableAdminData}
                setType = {setType}

            />
            <div className="flex justify-around items-center w-full h-auto ">
                <button
                    type="button"
                    className="bg-[#8B3A2B] text-white px-4 py-2 rounded shadow-md w-[40%] h-auto
                    hoverable:hover:bg-[#732f23] 
                    hoverable:hover:scale-105
                    active:scale-95 active:shadow-none
                    transition-all duration-300 ease-in-out"
                    style={{ fontVariant: "small-caps" }}
                    onClick={(e) => handleDelete(e)}
                    >
                    Delete
                </button>
                <button
                    type="submit"
                    className="bg-[#6F4E37] text-white px-4 py-2 rounded shadow-md w-[40%] h-auto
                    hoverable:hover:bg-[#5a3f2c] 
                    hoverable:hover:scale-105
                    active:scale-95 active:shadow-none
                    transition-all duration-300 ease-in-out"
                >
                    Update
                </button>
            </div>
        </form>
    )
}

export default ManageEmployer
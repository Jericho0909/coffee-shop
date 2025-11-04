import { useContext, useState, useEffect } from "react"
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
import { useDebounce } from "@uidotdev/usehooks";
import { v4 as uuidv4 } from "uuid";
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
    const { checkUsernameAvailability,
        validatePassword,
        checkEmailAvailability,
        setIsUsernameAvailable,
        setIsEmailAvailable,
        setShowPasswordValidationError
    } = useContext(AuthValidationContext)
    const { toggleModal } = useContext(ModalContext)
    const { highlightUpdated } = useContext(AddHighlightContext)
    const { Toast } = showToast()
    const [ type, setType ] = useState("")
    const [ employerID, ] = useState(sessionStorage.getItem("employerID"))
    const [ employerName, ] = useState(sessionStorage.getItem("employerName"))
    const [ isLoading, setIsLoading ] = useState(false)
    const debouncedType = useDebounce(type, 300)

    const selectedAdmin = adminList.find(key => key.name === employerName && key.role === "Admin")
    const selectedEmployer = employerList.find(key => key.id === employerID)
    const [ editableEmployerData, setEditableEmployerData ] = useState(selectedEmployer)
    const formatAdminData = {
        id: "A-" + uuidv4().slice(0, 5),
        name: editableEmployerData.name,
        username: "",
        password: "",
        role: "Admin",
        email: editableEmployerData.email,
        phone: editableEmployerData.phone,
        location: editableEmployerData.location
    }
    const [ toAdmin, setToAdmin ] = useState(formatAdminData)

    const emailConformation = async(email, password) => {
            const isEmailAvailable = await checkEmailAvailability(email)
            if(!isEmailAvailable) return false

            try {
                setIsLoading(true)
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user
                await updateProfile(user, { displayName: toAdmin.username })
                await sendEmailVerification(user)
                return true
    
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    return false
                }
                console.error(error);
                return false
            } finally {
                setIsLoading(false)
            }
    }


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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(selectedAdmin && editableEmployerData.role !== "Admin"){
            removeAdminFromList(selectedAdmin.email, selectedAdmin.password, true)
        }
        else{
            const checkAdminExist = adminList.find(key => key.id === employerID || key.name === employerName)
            if(editableEmployerData.role === "Admin" && !checkAdminExist){
                if(!toAdmin.username.endsWith(".admin")) return
                const isAdminUsernameOk = checkUsernameAvailability(toAdmin.username, adminList)
                const isPasswordOk = validatePassword(toAdmin.password)
                const isEmailAvailable = await emailConformation(toAdmin.email, toAdmin.password)
                if(!isEmailAvailable || !isAdminUsernameOk || !isPasswordOk) return
                const promoteToAdmin ={
                    ...toAdmin
                }
                await pushAction("admins", promoteToAdmin)
            }
            else{
                if(selectedAdmin){
                    if(selectedAdmin.email !== editableEmployerData.email){
                        emailConformation(editableEmployerData.email, selectedAdmin.password)
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

    useEffect(() => {
        if(selectedEmployer?.role === "Admin"){
            setToAdmin(selectedAdmin)
        }
    }, [selectedAdmin, selectedEmployer])

    useEffect(() => {
        if(editableEmployerData.role === "Admin"){
            if(toAdmin.username !== "" && !selectedAdmin){
                checkUsernameAvailability(toAdmin.username, adminList)
            }
            else{
                setIsUsernameAvailable(true)
            }
            
            if(toAdmin.password !== ""){
                validatePassword(toAdmin.password)
            }
            else{
                setShowPasswordValidationError(false)
            }

            if(toAdmin.email !== selectedAdmin?.email){
                checkEmailAvailability(toAdmin.email)
            }
            else{
                setIsEmailAvailable(true)
            }
        }
    }, [debouncedType, adminList, checkEmailAvailability, checkUsernameAvailability, editableEmployerData, validatePassword, setIsEmailAvailable, setIsUsernameAvailable, setShowPasswordValidationError, toAdmin, selectedAdmin])

    return (
        <>
            <form
                className="flex justify-center items-center flex-col w-full h-auto relative"
                onSubmit={(e) => handleSubmit(e)}
            >
                <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
                Manage Employer
                </h1>
                <EmployerForm
                    employerData = {editableEmployerData}
                    setEmployerData = {setEditableEmployerData}
                    adminData = {toAdmin}
                    setAdminData = {setToAdmin}
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
            {isLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto">
                    <div className="loader-three">
                        
                    </div>
                </div>
            )}
        </>
    )
}

export default ManageEmployer
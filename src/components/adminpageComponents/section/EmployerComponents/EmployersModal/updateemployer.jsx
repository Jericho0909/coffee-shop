import { useContext, useState } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ActionContext from "../../../../../context/actionContext"
import ModalContext from "../../../../../context/modalContext"
import AddHighlightContext from "../../../../../context/addhighlightContext"
import EmployerForm from "../Employer/employerformjsx"
import toast from "react-hot-toast"
const ManageEmployer = () => {
    const { 
        adminList,
        setAdminList,
        employerList, 
        setEmployerList
    } = useContext(FetchDataContext)
    const { 
        addAction, 
        patchAction, 
        deleteAction 
    } = useContext(ActionContext)
    const { toggleModal } = useContext(ModalContext)
    const { highlightUpdated } = useContext(AddHighlightContext)
    const [ employerID, ] = useState(sessionStorage.getItem("employerID"))
    const [ employerName, ] = useState(sessionStorage.getItem("employerName"))

    const selectedAdmin = adminList.find(key => 
        (key.name === employerName && key.role === "Admin")
    )

    const selectedEmployer = employerList.find(key => key.id === employerID)



    const [ editableAdminData, setEditableAdminData ] = useState(selectedAdmin)
    const [ editableEmployerData, setEditableEmployerData ] = useState(selectedEmployer)

    const removeAdminFromList = async() => {
        const updatedAdminList = adminList.filter(key => key.id !== selectedAdmin.id)
        await deleteAction("admins", selectedAdmin.id, updatedAdminList)
        setAdminList(updatedAdminList)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(selectedAdmin && editableEmployerData.role !== "Admin"){
            removeAdminFromList()
        }
        else{
             const checkAdminExist = adminList.find(key => key.id === employerID || key.name === employerName)
            if(editableEmployerData.role === "Admin" && !checkAdminExist){
                const promotetoAdmin = {
                    id: editableEmployerData.id,
                    name: editableEmployerData.name,
                    username: editableAdminData.username,
                    password: editableAdminData.password,
                    role: "Admin",
                }

                const response = await addAction("admins", promotetoAdmin)
                setAdminList(prev => (
                    [...prev, response]
                ))
            }
            else{
                if(selectedAdmin){
                    const response = await patchAction("admins", selectedAdmin.id, editableAdminData)
                    setAdminList(prev => (
                    prev.map(item => item.id === selectedAdmin.id ? response : item)))
                }
            }

        }

        const response = await patchAction("employers", selectedEmployer.id, editableEmployerData)
        setEmployerList(prev =>
            prev.map(item =>
                item.id === selectedEmployer.id ? response : item
            )
        )
        toggleModal()
        toast.success(
            <div className="Notification">
                Employer updated successfully!
            </div>,
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
        )
        highlightUpdated(selectedEmployer.id)
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if(selectedAdmin){
            removeAdminFromList()
        }

        const updatedEmployerList = employerList.filter(key => key.id !== selectedEmployer.id)
        await deleteAction("employers", selectedEmployer.id, updatedEmployerList)
        setEmployerList(updatedEmployerList)
        toggleModal()
        toast.success(
            <div className="Notification">
                Employer deleted successfully!
            </div>,
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
    }

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

            />
            <div className="flex justify-around items-center w-full h-auto ">
                <button
                    type="submit"
                    className="bg-[#6F4E37] text-white px-4 py-2 rounded shadow-md w-[40%] h-auto
                    hover:bg-[#5a3f2c] hover:scale-105
                    active:scale-95 active:shadow-none
                    transition-all duration-300 ease-in-out"
                >
                    Update
                </button>
                <button
                    type="button"
                    className="bg-[#8B3A2B] text-white px-4 py-2 rounded shadow-md w-[40%] h-auto
                    hover:bg-[#732f23] hover:scale-105
                    active:scale-95 active:shadow-none
                    transition-all duration-300 ease-in-out"
                    style={{ fontVariant: "small-caps" }}
                    onClick={(e) => handleDelete(e)}
                    >
                    Delete
                </button>
            </div>
        </form>
    )
}

export default ManageEmployer
import { useContext } from "react"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext";
import ModalContext from "../../../../../context/modalContext"
import showToast from "../../../../../utils/showToast";
import UserSettings from "../../../../usersetting";
const CustomerSettings = ({user}) => {
    const { orderList } = useContext(FirebaseFetchDataContext)
    const { setIsOpen, setModalName } = useContext(ModalContext)
    const { Toast } = showToast()

    const editProfile = () => {
       const hasActiveOrder = orderList
        .filter(order => order.customerName === user.username)
        .some(o => o.status === "Pending" || o.status === "Processing")

        if(hasActiveOrder){
            Toast("error", "You cannot edit your profile while you have a pending order in progress.", 4000)
            return
        }
        setModalName("editProfile")
        setIsOpen(true)
    }



    return(
        <UserSettings
            user={user}
            editProfile={editProfile}
        />
    )
}

export default CustomerSettings
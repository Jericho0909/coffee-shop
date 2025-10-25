import { useContext } from "react"
import UserSettings from "../../../../usersetting"
import ModalContext from "../../../../../context/modalContext"
const Settings = ({admin}) => {
    const { setIsOpen, setModalName } = useContext(ModalContext)
    const editProfile = () => {
        setModalName("adminEditProfile")
        setIsOpen(true)
    }
    return(
        <UserSettings
            user={admin}
            editProfile={editProfile}
        />
    )
}

export default Settings
import { useContext } from "react"
import { useParams } from "react-router-dom"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext"
import EditProfile from "../../../../editprofile"
const AdminEditProfile = () => {
    const { id } = useParams()
    const { adminList } = useContext(FirebaseFetchDataContext)
    const admin = adminList.find(key => key.id === id)

    if(!admin) return
    return(
        <EditProfile
            profile={admin}
            list={adminList}
            setter={"admins"}
        />
    )
}

export default AdminEditProfile
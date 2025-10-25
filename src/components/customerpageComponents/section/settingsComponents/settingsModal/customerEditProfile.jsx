import { useContext } from "react"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext"
import EditProfile from "../../../../editprofile"
const CustomerEditProfile = ({customer}) => {
    const { customerList } = useContext(FirebaseFetchDataContext)
    
    return(
        <EditProfile
            profile={customer}
            list={customerList}
            setter={"customers"}
        />
    )
}

export default CustomerEditProfile
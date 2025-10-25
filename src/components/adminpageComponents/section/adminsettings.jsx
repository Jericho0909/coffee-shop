import { useContext } from "react"
import { useParams } from "react-router-dom"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import Settings from "./AdminSettingsCompoments/settings/settings"
const AdminSettings = () => {
    const { id } = useParams()
    const { adminList } = useContext(FirebaseFetchDataContext)
    const admin = adminList.find(key => key.id === id)

    if(!admin) return
    return(
         <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-screen">
            <div className="w-full h-auto p-1 text-start">
                <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black p-1">
                    settings
                </h1>
            </div>
            <div className="w-full flex-1">
                <Settings
                    admin={admin}
                />
            </div>
         </section>
    )
}

export default AdminSettings

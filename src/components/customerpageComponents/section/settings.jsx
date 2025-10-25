import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import CustomerSettings from "./settingsComponents/settings/customersettings"
import Loading from "../../loading"
const Settings = () => {
    const { id } = useParams()
    const { customerList } = useContext(FirebaseFetchDataContext)
    const [ loading, setLoading ] = useState(true)

    const user = customerList.find(key => key.id === id)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    if(loading){
        return(
            <Loading/>
        )
    }

    if(!user) return

    return(
        <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-screen">
            <div className="w-full h-auto p-2">
                <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start p-1">
                    settings
                </h1>
            </div>
            <div className="container-flex justify-center w-full flex-1 border border-[#8c6244] rounded-md">
                <CustomerSettings
                    user={user}
                />
            </div>
        </section>
    )
}

export default Settings
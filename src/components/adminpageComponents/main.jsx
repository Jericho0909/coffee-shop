import { useContext } from "react"
import { Outlet } from "react-router-dom"
import MediaQueryContext from "../../context/mediaqueryContext"
const Main = () => {
    const { isMediumPhone } = useContext(MediaQueryContext)
    return(
        <main 
            className={`flex justify-center w-full h-[calc(100dvh-14dvh)] sm:h-[88dvh] lg:h-[87dvh] mt-[0.50rem] p-2
                ${isMediumPhone && "h-[calc(100dvh-12dvh)]"}
            `}
        >
            <Outlet/>
        </main>
    )
}

export default Main
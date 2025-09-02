import { useState, useEffect, useContext } from "react"
import ContainerContext from "../../../context/containerContext"
import Loading from "../../loading"
import CustomerTable from "./CustomerCompoments/customer/customertable"
const Customers = () => {
    const { container } = useContext(ContainerContext)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    })

    if(loading){
        return(
            <Loading/>
        )
    }
    
    return(
        <section className="flex justify-center">
            <div className="container w-full">
                <div className="flex justify-start w-auto h-auto my-1 p-1">
                    <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                        customer
                    </h1>
                </div>
                <div 
                    ref={container}
                    className="w-full flex-1 overflow-y-auto scrollbar-hide"
                >
                    <CustomerTable/>
                </div>
            </div>
        </section>
    )
}

export default Customers
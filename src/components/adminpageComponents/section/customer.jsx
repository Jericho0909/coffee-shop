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
        <section>
            <div className="bg-[#f9f5f1] border border-[#8c6244] rounded-xl shadow-md sm:p-[0.90rem] md:p-[1.10rem] lg:p-[1.30rem] xl:p-[1.50rem] w-full">
                <div className="flex justify-start w-auto h-auto my-1 p-1">
                    <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                        customer
                    </h1>
                </div>
                <div 
                    ref={container}
                    className="w-full max-h-[82vh] xl:max-h-[72vh] overflow-y-auto scrollbar-hide"
                >
                    <CustomerTable/>
                </div>
            </div>
        </section>
    )
}

export default Customers
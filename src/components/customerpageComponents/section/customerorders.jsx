import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import MediaQueryContext from "../../../context/mediaqueryContext"
import Loading from "../../loading"
import CustomerOrderTable from "./customerordersComponents/customerorder/customerordertable"
import CustomerOrderCards from "./customerordersComponents/customerorder/customerordercards"
const CustomerOrders = () => {
    const { id } = useParams()
    const { customerList } = useContext(FirebaseFetchDataContext)
    const { isMobile } = useContext(MediaQueryContext)
    const [ loading, setLoading ] = useState(true)

    const customerData = customerList.find(key => key.id === id)

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

    if(!customerData) return
    
    return(
        <>
            <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-screen">
                <div className="w-full h-auto p-2 mb-[1rem]">
                    <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start p-1">
                        orders
                    </h1>
                </div>
                <div 
                    className="w-full flex-1"
                >
                    {customerData.orders.length === 0 
                        ? (
                            <div className="container-flex justify-center w-full h-[90%]">
                                <p>
                                    Looks like you haven’t placed any orders yet.
                                </p>
                            </div>    
                        )
                        : (
                            isMobile 
                            ? (
                                <CustomerOrderCards
                                    customerOrders = {customerData.orders}
                                />
                            )
                            : (
                                <CustomerOrderTable
                                    customerOrders = {customerData.orders}
                                />
                            )
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default CustomerOrders
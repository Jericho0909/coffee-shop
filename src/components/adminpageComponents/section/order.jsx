import { useContext, useState, useEffect, useCallback } from "react"
import FetchDataContext from "../../../context/fetchdataContext"
import ContainerContext from "../../../context/containerContext"
import Loading from "../../loading"
import OrderTable from "./OrderComponents/order/ordertable"
const Orders = () => {
    const { orderList } = useContext(FetchDataContext)
    const { container } = useContext(ContainerContext)
    const [ loading, setLoading ] = useState(true)
    const [ orders, setOrders ] = useState([])
    const [ table, setTable ] = useState("currentOrders")

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    },[])

    const checkOrders = useCallback((table) => {
        const completedOrders = orderList.filter(order => order.status.includes("Completed") || order.status.includes("Cancelled"))

        if (table === "ordersHistory") {
            return completedOrders
        }

        const currentOrders = orderList.filter(order => !order.status.includes("Completed") && !order.status.includes("Cancelled"))

        return currentOrders;
    }, [orderList])

    useEffect(() => {
        const initalOrders = checkOrders()
        setOrders(initalOrders)
    },[checkOrders])

    const swichTable = (table) => {
        setTable(table)
        const ordersData = checkOrders(table)
        setOrders(ordersData)
    }

    if(loading){
        return(
            <Loading/>
        )
    }

    return(
        <section>
            <div className="bg-[#f9f5f1] border border-[#8c6244] rounded-xl shadow-md sm:p-[0.90rem] md:p-[1.10rem] lg:p-[1.30rem] xl:p-[1.50rem] w-full">
                <div className="flex justify-between w-auto h-auto my-1 p-1 mb-[0.50rem]">
                    <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                        orders
                    </h1>
                    {table === "currentOrders" 
                        ?   (
                                <button
                                    className="press w-auto"
                                    onClick={() => {swichTable("ordersHistory")}}
                                >
                                    order history
                                </button>
                                )
                        :   (
                                 <button
                                    className="press w-auto"
                                    onClick={() => {swichTable("currentOrders")}}
                                >
                                    current orders
                                </button>
                        )}
                </div>
                <div 
                    ref={container}
                    className="w-full max-h-[82vh] xl:max-h-[72vh] overflow-y-auto scrollbar-hide"
                >
                    <OrderTable 
                        orders = {orders}
                    />
                </div>
            </div>
        </section>
    )
}

export default Orders
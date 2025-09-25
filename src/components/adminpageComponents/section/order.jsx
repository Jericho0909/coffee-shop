import { useContext, useState, useEffect, useCallback } from "react"
import FetchDataContext from "../../../context/fetchdataContext"
import ContainerContext from "../../../context/containerContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import SectionHeder from "../../sectionheader"
import Loading from "../../loading"
import OrderTable from "./OrderComponents/order/ordertable"

const Orders = () => {
    const { orderList } = useContext(FetchDataContext)
    const { container } = useContext(ContainerContext)
    const { setKey, setUrl } = useContext(SearchContext)
    const { setKeyList } = useContext(SuggestionContext)
    const [ loading, setLoading ] = useState(true)
    const [ orders, setOrders ] = useState([])
    const [ table, setTable ] = useState("currentOrders")

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    },[])

    useEffect(() => {
        setKey("orderList")
        setUrl("http://localhost:3500/orders")
        setKeyList("orderlist")
    }, [setKey, setUrl, setKeyList])


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


    const switchTableBTn = (table) => {
        setTable(table)
        const ordersData = checkOrders(table)
        setOrders(ordersData)
    }


    const SwitchTableBtn = () => {
        return(
            <div className="w-auto">
                {table === "currentOrders" 
                    ?   (
                            <button
                                className="press w-auto"
                                onClick={() => {switchTableBTn("ordersHistory")}}
                            >
                                order history
                            </button>
                            )
                    :   (
                            <button
                                className="press w-auto"
                                onClick={() => {switchTableBTn("currentOrders")}}
                            >
                                current orders
                            </button>
                    )
                }
            </div>
        )
    }

    if(loading){
        return(
            <Loading/>
        )
    }

    return(
        <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-screen">
            <SectionHeder 
                title="products" 
                haveExtraBtn={true}
                btnContent={<SwitchTableBtn/>}
            />
            {orders.length !== 0 
                ? (
                    <div 
                        ref={container}
                        className="w-full flex-1"
                    >
                        <OrderTable 
                            orders={[...orders].reverse()}
                        />
                    </div>
                )
                : (
                    <div className="container-flex justify-center w-full h-[90%] p-1 mb-0">
                        No Orders
                    </div>
                )
            }
        </section>
    )
}

export default Orders
import { useContext, useState, useEffect } from "react"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import ContainerContext from "../../../context/containerContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import SectionHeder from "../../sectionheader"
import Loading from "../../loading"
import OrderTable from "./OrderComponents/order/ordertable"

const Orders = () => {
    const { orderList } = useContext(FirebaseFetchDataContext)
    const { container } = useContext(ContainerContext)
    const { setKey,
        setSetter,
        setValue,
        itemList,
        setItemList,
        hasResult
    } = useContext(SearchContext)
    const { setKeyList } = useContext(SuggestionContext)
    const [ loading, setLoading ] = useState(true)
    const [ table, setTable ] = useState("currentOrders")

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    },[])

    useEffect(() => {
        setItemList([])
        setKey("orderList")
        setSetter("orders")
        setValue("customerName")
        setKeyList("orderlist")
    }, [setKey, setSetter, setValue, setKeyList, setItemList])


    const switchTableBTn = (table) => {
        setTable(table)
    }

    const SwitchTableBtn = () => {
        return(
            <div className="w-auto">
                {table === "currentOrders" 
                    ?   (
                            <button
                                className="press  hoverable:hover:bg-[#8b5e3c] 
                                hoverable:hover:scale-105 
                                hoverable:hover:shadow-[0_4px_12px_rgba(111,78,55,0.4)] w-auto"
                                onClick={() => {switchTableBTn("ordersHistory")}}
                            >
                                order history
                            </button>
                            )
                    :   (
                            <button
                                className="press  hoverable:hover:bg-[#8b5e3c] 
                                hoverable:hover:scale-105 
                                hoverable:hover:shadow-[0_4px_12px_rgba(111,78,55,0.4)] w-auto"
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
                title="orders" 
                haveExtraBtn={true}
                btnContent={<SwitchTableBtn/>}
            />
            {(hasResult && orderList.length !== 0) 
                ? (
                    <div 
                        ref={container}
                        className="w-full flex-1"
                    >
                        <OrderTable 
                            table={table}
                            orderList={orderList} 
                            itemList={itemList}
                            
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
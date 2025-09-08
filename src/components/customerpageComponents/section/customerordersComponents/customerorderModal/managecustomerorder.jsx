import { useState, useContext } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ActionContext from "../../../../../context/actionContext"
import Cart from "../../../../cart"
import ModalContext from "../../../../../context/modalContext"
import PaymentMethod from "../../../../paymentmethod"
import ShowToastContext from "../../../../../context/showtoastContext"
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
const ManageCustomerOrder = ({customer}) => {
    const { orderList, setCustomerList } = useContext(FetchDataContext)
    const { patchAction } = useContext(ActionContext)
    const { toggleModal } = useContext(ModalContext)
    const { showToast } = useContext(ShowToastContext)

    const [ customerOrder, ] = useState( JSON.parse(sessionStorage.getItem("customerOrder")))
    const [ method, setMethod ] = useState("")
    const [ isPaymentSelected, setIsPaymentSelected ] = useState(true)
    const [ isReOrder, setIsOrder ] = useState(false)
    const orderID = "ORD-" + uuidv4().slice(0, 5)

    const cancelOrder = async(id) => {
        const order = orderList.find(key => key.id === id)
        const updatedOrder = {
            ...order,
            status: "Cancelled"
        }

        await patchAction("orders", id, updatedOrder)

        const customerOrderList = customer.orders.filter(key => key.orderId !== id)
        
        const updatedCustomerOrderList = {
            ...customer,
            totalOrders: customer.totalOrders - 1,
            totalSpent: customerOrderList.reduce((sum, o) => sum + o.total, 0),
            orders: customerOrderList
        }

        const response = await patchAction("customers", customer.id, updatedCustomerOrderList)
        setCustomerList(prev => (
            prev.map(item => item.id === customer.id ? response : item)
        ))

        showToast("success", "Your order has been successfully cancelled.", 2000)
        toggleModal()
    }

    const reOrder = {
        orderId: orderID,
        orderDate: format(new Date(), "MM/dd/yy"),
        status: "Pending",
        paymentMethod: method,
        items: [...customerOrder.items],
        total: customerOrder.total
     }

    const orderAgain = () => {
        setIsOrder(true)
    }

    const checkOut = async() => {
        if(method === ""){
            showToast("error", "Please select payment method.", 2000)
            setIsPaymentSelected(false)
            return
        }
        
        const newOrder = {
            ...customer,
            orders: [...customer.orders, reOrder]
        }

        const response = await patchAction("customers", customer.id, newOrder)

        setCustomerList(prev => (
            prev.map(item => item.id === customer.id ? response : item)
        ))

        showToast("success", "Order placed successfully", 2000)
    }

    return(
        <div 
            className="container-flex justify-center sm:justify-start flex-col w-full h-full py-[1rem] px-1 overflow-y-auto scrollbar-hide"
        >
            <Cart
                arr={customerOrder.items}
                customHeight={{ height: "15rem"}}
                isRemovable = {false}
            />
            {isReOrder && (
                <PaymentMethod
                setMethod={setMethod}
                isPaymentSelected={isPaymentSelected}
                setIsPaymentSelected={setIsPaymentSelected}
            />
            )}
            <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
                order progress
            </h1>
            <div 
                className="bg-[#fffdf9] border border-[#d3b89f] w-full rounded-xl shadow-lg p-1 py-[1rem] mb-[1rem]"
            >   
                <span className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)">
                    {customerOrder.status}
                </span>
                <div className="w-full h-2 overflow-hidden bg-[#e5e5e5] rounded-[8px]">
                    <div className={`${customerOrder.status} h-full transition-all duration-500 ease-in-out`}>

                    </div>
                </div>
            </div>
            <div className="container-flex justify-center w-full h-auto p-1 mt-[1rem]">
                {customerOrder.status === "Pending" || customerOrder.status === "Processing"
                    ? (
                        <button
                            className={`bg-red-500 text-white px-4 py-2 rounded shadow-md w-[35%] sm:w-[45%] h-auto
                            transition-transform duration-300 ease-in-out
                            hover:bg-red-600 hover:scale-105 hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)]
                            active:translate-y-1 active:shadow-none
                                ${customerOrder.status === "Processing" ? "cursor-not-allowed" : ""}
                            `}
                            style={{ fontVariant: "small-caps" }}
                            onClick={() => cancelOrder(customerOrder.orderId)}
                            disabled={customerOrder.status === "Processing" && true }
                        >
                            cancel order
                        </button>
                    ) : (
                        <>
                            {!isReOrder
                                ? (
                                    <button 
                                        className="press w-[35%] sm:w-[45%]"
                                        style={{ fontVariant: "small-caps" }}
                                        onClick={() => orderAgain()}
                                    >
                                        reorder
                                    </button>
                                )
                                :  (
                                    <button 
                                        className="press w-[35%] sm:w-[45%]"
                                        style={{ fontVariant: "small-caps" }}
                                        disabled={customerOrder.status === "Processing" && true }
                                        onClick={() => checkOut()}
                                    >
                                        Check Out
                                    </button>
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ManageCustomerOrder
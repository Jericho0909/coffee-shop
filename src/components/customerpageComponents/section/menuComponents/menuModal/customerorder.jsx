import { useContext, useState } from "react"
import FirebaseActionContext from "../../../../../context/firebaseactionContext";
import CustomerorderContext from "../../../../../context/customerorderContext"
import ModalContext from "../../../../../context/modalContext";
import Cart from "../../../../cart";
import PaymentMethod from "../../../../paymentmethod";
import { PhilippinePeso } from 'lucide-react';
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import showToast from "../../../../../utils/showToast";
import removeFireBaseKey from "../../../../../utils/removeFirebaseKey";
const CustomerOrders = ({customer}) => {
    const { pushAction, updateAction } = useContext(FirebaseActionContext)
    const { toggleModal } = useContext(ModalContext)
    const { customerOrders, 
        setCustomerOrders 
    } = useContext(CustomerorderContext)
    const { Toast } = showToast()
    const [ method, setMethod ] = useState("")
    const [ isPaymentSelected, setIsPaymentSelected ] = useState(true)
    const total = customerOrders.reduce((sum, order) => sum + order.subtotal, 0)
    const orderID = "ORD-" + uuidv4().slice(0, 5)

    const removeOrder = (id) => {
        const updatedOrder = customerOrders.filter(key => key.productId !== id)
        setCustomerOrders(updatedOrder)
    }

    const checkOut = async() => {
        if(method === ""){
            showToast("error", "Please select payment method.", 2000)
            setIsPaymentSelected(false)
            return
        }

        const customerNewOrder = {
            orderId: orderID,
            orderDate: format(new Date(), "MM/dd/yy"),
            status: "Pending",
            paymentMethod: method,
            items: customerOrders,
            total: total
        }

        const newOrder = {
            id: orderID,
            customerName: customer.username,
            customerContact: customer.phone,
            customerLocation: customer.location,
            customerEmail: customer.email,
            items: customerOrders,
            orderDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
            status: "Pending",
            paymentMethod: method,
            total: total

        }

        if (customer.orders[0] === "__empty__"){
            const removeEmpty = customer.orders.filter((_, index) => index !== 0)
            customer.orders = removeEmpty
        }

        const safeCustomerData = removeFireBaseKey(customer)

        const updatedOrders = [...safeCustomerData.orders, customerNewOrder]

        const updatedCustomerData = {
            ...safeCustomerData,
            orders: updatedOrders
        }

        await updateAction("customers", customer.firebaseKey, updatedCustomerData)
        
        await pushAction("orders", newOrder)

        setCustomerOrders([])
        sessionStorage.removeItem("customerOrders");
        toggleModal()
        Toast("success", "Order placed successfully, check your order in ORDERSECTION", 6000)
    }
    
    return(
        <div 
            className="container-flex justify-center sm:justify-start flex-col w-full h-full py-[1rem] px-1 overflow-y-auto scrollbar-hide"
        >
            <Cart 
                arr={customerOrders}
                remove={removeOrder}
                customHeight={{ height: "100%"}}
                isRemovable={true}
            />
            <PaymentMethod
                setMethod={setMethod}
                isPaymentSelected={isPaymentSelected}
                setIsPaymentSelected={setIsPaymentSelected}
            />
            <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
                check out
            </h1>
            <div className="bg-[#fffdf9] border border-[#d3b89f] w-full max-h-[11rem] rounded-xl shadow-lg p-1 py-[1rem] mb-1">
                <div className="container-flex justify-center w-full h-auto gap-1 p-1 mb-0 ">
                    <p className="container-flex gap-1 mb-0 font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]">
                        <span>
                            Total
                        </span>
                        <span className="container-flex mb-0 gap-1">
                            <PhilippinePeso 
                                size={15} color="black"
                            />
                            :
                        </span>
                        <span>
                            {total}
                        </span>
                    </p>
                </div>
                <div className="container-flex justify-center p-1 mb-0">
                    <button 
                        className={`press w-[40%] ${customerOrders.length === 0 ? "cursor-not-allowed" : ""}`}
                        onClick={() => checkOut()}
                        disabled={customerOrders.length === 0}
                    >
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomerOrders
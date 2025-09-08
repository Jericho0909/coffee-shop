import { useState, useContext } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ActionContext from "../../../../../context/actionContext"
import ModalContext from "../../../../../context/modalContext"
import ContainerContext from "../../../../../context/containerContext"
import AddHighlightContext from "../../../../../context/addhighlightContext"
import toast from "react-hot-toast"
const ManageOrder = () => {
    const { orderList, 
        setOrderList, 
        customerList, 
        setCustomerList 
    } = useContext(FetchDataContext)
    const { patchAction } = useContext(ActionContext)
    const { toggleModal } = useContext(ModalContext)
    const { container } = useContext(ContainerContext)
    const { highlightUpdated } = useContext(AddHighlightContext)
    const [ orderId, ] = useState(sessionStorage.getItem("orderID"))
    const [ openItemId, setOpenItemId ] = useState(null)

    const selectedOrder = orderList.find(key => key.id === orderId)
    const currentCustomer = customerList.find(key => key.username === selectedOrder.customerName)

    const [ currentOrderData, setCurrentOrderData ] = useState(selectedOrder)

    const toggleDetails = (id) => {
        if (openItemId === id) {
            setOpenItemId(null)
        } 
        else {
            setOpenItemId(id)
        }
    };

    const handleUpdateStatus = async(newStatus) => {
        const response = await patchAction("orders", selectedOrder.id, {...currentOrderData, status: newStatus})
        setOrderList(prev => (
            prev.map(order => order.id === selectedOrder.id ? response : order)
        ))
        
        const customerOrderResponse = await patchAction("customers", currentCustomer.id, {
            ...currentCustomer,
            orders: currentCustomer.orders.map(item => item.orderId === currentOrderData.id ? {...item, status:newStatus} : item)
        })
        setCustomerList(prev => (
            prev.map(customer => customer.id === currentCustomer.id ? customerOrderResponse : customer)
        ))

        toggleModal()
        setTimeout(() => {
            const ordersContainer = container.current;
            if (ordersContainer) {
                ordersContainer.scrollTop = ordersContainer.scrollHeight;
            }
        },0)

        toast.success(
            <div className="Notification">
                Order status updated successfully!
            </div>,
            {
                style: {
                width: "100%",
                backgroundColor: "white",
                color: "#8c6244",
                padding: "12px 16px",
                borderRadius: "8px",
                },
                duration: 2000,
            }
        )

        highlightUpdated(selectedOrder.id)
    }

    return (
        <div 
            className="w-full h-full overflow-y-scroll scrollbar-hide"
        >
             <div className="w-full text-center my-[2rem]">
                <h1 className="w-full text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]"
                >
                    Order Status
                </h1>
                {selectedOrder.status === "Completed" || selectedOrder.status === "Cancelled"
                    ? (
                        <div className="container-flex justify-center px-[2rem] mb-[0.50rem]">
                            <p
                                className="flex gap-1 font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]"
                            >
                                <span 
                                    className="text-[#D4A373] font-semibold"
                                >
                                    Status: 
                                </span>
                                <span>
                                    {currentOrderData.status}
                                </span>
                            </p>
                        </div>
                    )
                    : (
                        <select
                            name="status"
                            value={currentOrderData.status}
                            onChange={(e) => {
                                const newStatus = e.target.value
                                setCurrentOrderData({...currentOrderData, [e.target.name]: e.target.value});
                                handleUpdateStatus(newStatus)
                            }}
                            className="category w-auto h-auto p-1 font-opensans"
                            style={{ fontVariant: "normal" }}
                        >
                            <option 
                                className="category font-opensans"
                                style={{ fontVariant: "normal" }}
                            >
                                Pending
                            </option>
                            <option 
                                className="category font-opensans"
                                style={{ fontVariant: "normal" }}
                            >
                                Processing
                            </option>
                            <option 
                                className="category font-opensans"
                                style={{ fontVariant: "normal" }}
                            >
                                Completed
                            </option>
                            <option 
                                className="category font-opensans"
                                style={{ fontVariant: "normal" }}
                            >
                                Cancelled
                            </option>
                        </select>
                    )
                }
            </div>
            <div className="flex justify-start items-start flex-col w-full h-auto mb-[1rem] p-2">
                <h1 className="w-full text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]"
                >
                    Order Details
                </h1>
                <div className="container-flex justify-center px-[2rem] mb-[0.50rem]">
                    <p
                        className="flex gap-1 font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]"
                    >
                        <span 
                            className="text-[#D4A373] font-semibold"
                        >
                            OrderId: 
                        </span>
                        <span>
                            {currentOrderData.id}
                        </span>
                    </p>
                </div>
                <div className="container-flex justify-center px-[2rem] mb-[0.50rem]">
                    <p
                        className="flex gap-1 font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]"
                    >
                        <span 
                            className="text-[#D4A373] font-semibold"
                        >
                            Customer Name: 
                        </span>
                        <span>
                            {currentOrderData.customerName}
                        </span>
                    </p>
                </div>
                <div className="container-flex justify-center px-[2rem] mb-[0.50rem]">
                    <p
                        className="flex gap-1 font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]"
                    >
                        <span 
                            className="text-[#D4A373] font-semibold"
                        >
                            Customer Number: 
                        </span>
                        <span>
                            {currentOrderData.customerContact}
                        </span>
                    </p>
                </div>
                <div className="container-flex justify-center px-[2rem] mb-[0.50rem]">
                    <p
                        className="flex gap-1 font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]"
                    >
                        <span 
                            className="text-[#D4A373] font-semibold"
                        >
                            OrderDate: 
                        </span>
                        <span>
                            {currentOrderData.orderDate}
                        </span>
                    </p>
                </div>
                <div className="container-flex justify-center px-[2rem]  mb-[0.50rem]">
                    <p
                       className="flex gap-1font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]"
                    >
                        <span 
                            className="text-[#D4A373] font-semibold"
                        >
                            Payment Method: 
                        </span>
                        <span>
                            {currentOrderData.paymentMethod}
                        </span>
                    </p>
                </div>
                <div className="container-flex justify-center px-[2rem] mb-[0.50rem]">
                    <p
                        className="flex gap-1 font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]"
                    >
                        <span 
                            className="text-[#D4A373] font-semibold"
                        >
                            Total: 
                        </span>
                        <span>
                            {currentOrderData.total}
                        </span>
                    </p>
                </div>
            </div>
            <div className="flex justify-start items-start flex-col w-full min-h-[10rem] max-h-auto mb-[1rem] p-2">
                <h1 className="w-full text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]"
                >
                    Items Ordered
                </h1>
                <div className="w-full h-auto mb-[2rem]">
                    {currentOrderData.items.map(item => (
                        <div 
                            key={item.productId}
                            className="container-flex justify-between flex-col w-full cursor-pointer gap-1 mb-0 px-[2rem] select-none"
                            onClick={() => toggleDetails(item.productId)}
                        >
                            <>
                            <div className="container-flex justify-between w-full mb-[0rem]">
                                <p className="flex gap-2 font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]">
                                <span>{item.name}</span>
                                <span>{item.quantity}</span>
                                </p>
                                <p className="flex gap-2 font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]">
                                <span>{item.subtotal}</span>
                                </p>
                            </div>
                            <div 
                                className={`w-full text-center overflow-hidden transition-all duration-500 ease-out 
                                ${openItemId === item.productId 
                                    ? "opacity-100 translate-y-0 mb-[0.50rem]" 
                                    : "max-h-0 opacity-0 -translate-y-2 mb-[0rem]"
                                }`}
                            >
                                <div className="container-flex w-full gap-1 mb-0">
                                    
                                    <p className="flex gap-1 font-opensans italic tracking-wide text-[clamp(0.70rem,2vw,0.90rem)]">
                                        <span className="text-[#D4A373] font-semibold">Size:</span>
                                        <span>{item.size}</span>
                                    </p>
                                    </div>
                                    <div className="container-flex w-full gap-1 mb-0">
                                    <p className="flex gap-1 font-opensans italic tracking-wide text-[clamp(0.70rem,2vw,0.90rem)]">
                                        <span className="text-[#D4A373] font-semibold">Price:</span>
                                        <span>{item.price}</span>
                                    </p>
                                </div>
                            </div>
                            </>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default ManageOrder
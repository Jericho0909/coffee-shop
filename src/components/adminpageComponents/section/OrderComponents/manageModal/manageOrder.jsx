import { useState, useContext } from "react"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext"
import FirebaseActionContext from "../../../../../context/firebaseactionContext"
import ModalContext from "../../../../../context/modalContext"
import ContainerContext from "../../../../../context/containerContext"
import AddHighlightContext from "../../../../../context/addhighlightContext"
import CoffeeTooltip from "../../../../tooltip"
import { format } from "date-fns";
import showToast from "../../../../../utils/showToast"
import removeFireBaseKey from "../../../../../utils/removeFirebaseKey"
const ManageOrder = () => {
    const { orderList, 
        customerList, 
        productList 
    } = useContext(FirebaseFetchDataContext)
    const { updateAction } = useContext(FirebaseActionContext)
    const { toggleModal } = useContext(ModalContext)
    const { container } = useContext(ContainerContext)
    const { highlightUpdated } = useContext(AddHighlightContext)
    const [ orderId, ] = useState(sessionStorage.getItem("orderID"))
    const [ openItemId, setOpenItemId ] = useState(null)
    const { Toast } = showToast()

    const selectedOrder = orderList.find(key => key.id === orderId)

    const currentCustomer = customerList.find(key => key.username === selectedOrder.customerName)

    const customerTotalSpent = currentCustomer.orders.reduce((sum, order) => sum + order.total, 0)

    const selectedOrderItemIds = selectedOrder.items.map(key => key.productId)
    const selectedOrderItemQuantity = selectedOrder.items.map(key => key.quantity)

    const [ currentOrderData, setCurrentOrderData ] = useState(selectedOrder)

    const toggleDetails = (id) => {
        if (openItemId === id) {
            setOpenItemId(null)
        } 
        else {
            setOpenItemId(id)
        }
    }

    const OrderStatusOption = (status) => {
        return(
            <div className="container-flex justify-center mb-0 p-1">
                <input
                    id={status.toLowerCase()}
                    type="radio"
                    value={status}
                    checked={selectedOrder.status === status ? status : ""}
                    onChange={(e) => {
                        const newStatus = e.target.value
                        setCurrentOrderData({...currentOrderData, [e.target.name]: e.target.value});
                        handleUpdateStatus(newStatus)
                    }}
                    className="w-auto"
                />
                <label htmlFor={status.toLowerCase()} className="w-auto">
                    {status}
                </label>
            </div>
        )
    }


    const handleOrderCount = async () => {
        try {
        const updatePromises = selectedOrderItemIds.map((id, i) => {
            const product = productList.find(key => key.id === id);

            if (product) {
            const safeProductData = removeFireBaseKey(product)

                return updateAction("products", product.firebaseKey, {
                    ...safeProductData,
                    orderCount: product.orderCount + selectedOrderItemQuantity[i]
                })
            }

            return null
        }).filter(Boolean)
        await Promise.all(updatePromises)

        } catch (error) {
        console.error("Error updating products:", error)
        }

    }

    const handleUpdateStatus = async(newStatus) => {
        if(newStatus === "Completed"){
            await handleOrderCount()
        }

        const safeCurrentOrderData = removeFireBaseKey(currentOrderData)
        const safeCurrentCustomerData = removeFireBaseKey(currentCustomer)

        await updateAction("orders", selectedOrder.firebaseKey, {...safeCurrentOrderData, status: newStatus})
        await updateAction("customers", currentCustomer.firebaseKey, {
            ...safeCurrentCustomerData,
            totalOrders: newStatus === "Completed"
                ? currentCustomer.totalOrders + 1
                : currentCustomer.totalOrders,
            totalSpent: newStatus === "Completed"
                ? customerTotalSpent
                : currentCustomer.totalSpent,
            lastOrderDate: newStatus === "Completed"
                ? format(new Date(), "MM/dd/yy")
                : currentCustomer.lastOrderDate,
            orders: currentCustomer.orders.map(item =>
                item.orderId === currentOrderData.id
                ? { ...item, status: newStatus }
                : item
            )
        })

        toggleModal()
        setTimeout(() => {
            const ordersContainer = container.current;
            if (ordersContainer) {
                ordersContainer.scrollTop = ordersContainer.scrollHeight;
            }
        },0)

        Toast("success", "Order status updated successfully!", 2000)

        highlightUpdated(selectedOrder.id)
    }

    const InfoRow = (title, value) => {
        return(
            <div className="container-flex justify-center px-[2rem] mb-[0.50rem]">
                <p
                    className="flex gap-1 font-opensans tracking-wide text-[clamp(0.85rem,2vw,1.05rem)]"
                >
                    <span 
                        className="text-[#D4A373] font-semibold"
                    >
                        {title}
                    </span>
                    <span>
                        {value}
                    </span>
                </p>
            </div>
        )
    }

    const orderDetailsRow = (title, value) => {
        return(
            <div className="container-flex w-full gap-1 mb-0">
                <p className="flex gap-1 font-opensans italic tracking-wide text-[clamp(0.70rem,2vw,0.90rem)]">
                    <span className="text-[#D4A373] font-semibold"
                    >
                        {title}
                    </span>
                    <span>
                        {value}
                    </span>
                </p>
            </div>
        )
    }

    return (
        <div 
            className="w-full h-full overflow-y-scroll scrollbar-hide"
        >
            <div className="w-full text-center my-[2rem] mb-[1rem] p-2">
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
                        <div className="container-flex justify-between w-auto h-auto mb-[1rem] p-2 gap-1 flex-wrap">
                                {OrderStatusOption("Pending")}
                                {OrderStatusOption("Processing")}
                                {OrderStatusOption("Completed")}
                                {OrderStatusOption("Cancelled")}
                            </div>
                    )
                }
                <div className="w-full h-2 overflow-hidden bg-[#e5e5e5] rounded-[8px]">
                    <div className={`${selectedOrder.status} h-full transition-all duration-500 ease-in-out`}>

                    </div>
                </div>
            </div>
            <div className="container-flex justify-start items-start flex-col w-full h-auto mb-[1rem] p-2">
                <h1 className="w-full text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem] "
                >
                    Order Details
                </h1>
                {InfoRow("OrderId:", currentOrderData.id)}
                {InfoRow("Customer Name:", currentOrderData.customerName)}
                {InfoRow("Customer Email:", currentOrderData.customerEmail)}
                {InfoRow("Customer Number:", currentOrderData.customerContact)}
                {InfoRow("Customer Location:", currentOrderData.customerLocation)}
                {InfoRow("OrderDate:", currentOrderData.orderDate)}
                {InfoRow("Payment Method:", currentOrderData.paymentMethod)}
                {InfoRow("Total:", currentOrderData.total)}
            </div>
            <div className="flex justify-start items-start flex-col w-full min-h-[10rem] max-h-auto mb-[1rem] p-2">
                <h1 className="w-full text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]"
                >
                    Items Ordered
                </h1>
                <div className="w-full h-auto mb-[2rem]">
                    {currentOrderData.items.map(item => (
                        <CoffeeTooltip
                            key={item.productId} 
                            text="click me" 
                            side="top" 
                            align="start"
                        >
                            <div 
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
                                        {orderDetailsRow("Size:", item.size)}
                                        {orderDetailsRow("Price:", item.price)}
                                        {orderDetailsRow("Type:", item.type)}
                                    </div>
                                </>
                            </div>
                        </CoffeeTooltip>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default ManageOrder
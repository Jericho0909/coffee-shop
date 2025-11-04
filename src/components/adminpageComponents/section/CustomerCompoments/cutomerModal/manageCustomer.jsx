import { useState, useContext, useRef } from "react"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext"
import FirebaseActionContext from "../../../../../context/firebaseactionContext"
import ModalContext from "../../../../../context/modalContext"
import ContainerContext from "../../../../../context/containerContext"
import AddHighlightContext from "../../../../../context/addhighlightContext"
import CoffeeTooltip from "../../../../tooltip"
import { motion, AnimatePresence } from "framer-motion"
import showToast from "../../../../../utils/showToast"
import removeFireBaseKey from "../../../../../utils/removeFirebaseKey"
const ManageCustomer = () => {
    const { customerList,  } = useContext(FirebaseFetchDataContext)
    const { updateAction } = useContext(FirebaseActionContext)
    const { container } = useContext(ContainerContext)
    const { toggleModal } = useContext(ModalContext)
    const { highlightUpdated } = useContext(AddHighlightContext)
    const [ customerId, ] = useState(sessionStorage.getItem("customerID"))
    const [ showFullDetail, setShowFullDetails ] = useState(false)
    const [ orderID, setOrderId ] = useState("")
    const containerRef = useRef(null)
    const ref = useRef(null)
    const { Toast } = showToast()

    const selectedCustomer = customerList.find(key => key.id === customerId)

    const [ status, setStatus ] = useState(selectedCustomer.accountStatus)

    const handleScrollToTop = () => {
        if (containerRef.current) {

            const timer = setTimeout(() => {
                containerRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            })
            },100)
            return () => clearTimeout(timer)
        }
    }

    const orderDetails = (id) => {
        const selectedProduct = selectedCustomer.orders.find(key => key.orderId === id)
        return(
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute top-0 right-0 w-[70%] h-[18.50rem] 
                bg-[#fffdf9] border border-[#d3b89f] rounded-xl 
                shadow-lg p-1 pb-[1rem] overflow-hidden"
            >
                <div className="w-full h-[15rem] overflow-y-auto scrollbar-coffee my-1">
                    {selectedProduct.items.map((item, index) => (
                        <div 
                            key={index}
                            className="flex justify-start items-center px-2 py-1 border-b border-[#e5d1b8] last:border-0"
                        >
                            <p className="flex gap-1 font-opensans tracking-wide text-[#3e2723]">
                            <span className="text-[clamp(0.85rem,2vw,1.05rem)] font-semibold">
                                {item.name}
                            </span>
                            <span className="italic text-[clamp(0.70rem,2vw,0.90rem)] text-gray-600">
                                ({item.size})
                            </span>
                            <span className="text-gray-700">
                                x{item.quantity}
                            </span>
                            <span className="ml-auto font-medium text-[#8c6244]">
                                ₱{item.subtotal}
                            </span>
                            </p>
                        </div>
                    ))}
                </div>
                <div className="container-flex justify-center w-full ">
                        <button 
                            className=" px-3 py-1 bg-[#8c6244] text-white rounded-md hover:bg-[#6d4c33] transition-colors"
                            onClick={() => setShowFullDetails(false)}
                        >
                            Close
                        </button>
                </div>
            </motion.div>
        )
    }

    const updateCustomerStatus = async() => {
        const safeCustomerData = removeFireBaseKey(selectedCustomer)

        const updatedStatus = {
            ...safeCustomerData, 
            accountStatus: ref.current.innerText
        }

        await updateAction("customers", selectedCustomer.firebaseKey, updatedStatus)

        setStatus()
        toggleModal()
        setTimeout(() => {
            const customersContainer = container.current;
            if (customersContainer) {
                customersContainer.scrollTop = customersContainer.scrollHeight;
            }
        },0)

        Toast("success", "Successfully updated the Status!", 2000)

        highlightUpdated(selectedCustomer.id)
    }

    const infoRow = (title, value) => {
        return(
            <div className="container-flex justify-start px-[2rem] mb-[0.50rem]">
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

    return(
        <div 
            ref={containerRef}
            className="w-full h-full overflow-y-scroll scrollbar-hide relative"
        >
            <div className="w-full text-center my-[2rem]">
                <h1 className="w-full text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]"
                >
                    Customer Details
                </h1>
                {infoRow("Name:", selectedCustomer.name)}
                {infoRow("Username:", selectedCustomer.username)}
                {infoRow("Contact:", selectedCustomer.phone)}
                {infoRow("Email:", selectedCustomer.email)}
                {infoRow("Location:", selectedCustomer.location)}
                {infoRow("Date Joined", selectedCustomer.dateJoined)}
                {infoRow("Total Orders:", selectedCustomer.totalOrders)}
                {infoRow("Total Spent:", selectedCustomer.totalSpent)}
                {infoRow("Last Order Date:", selectedCustomer.lastOrderDate)}
            </div>
            <div className="w-full text-center my-[2rem]">
                <h1 className="w-full text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]"
                >
                    Orders Record
                </h1>
                {selectedCustomer.orders[0] === "__empty__" 
                    ? (
                        <p>
                            No orders yet.
                        </p>
                    )
                    : (
                        <div className="overflow-x-auto w-[98%]">
                    <table className="table-auto border-collapse w-full min-w-[600px]">
                        <thead className="bg-gray-100">
                            <tr>
                                <th
                                    className="text-center"
                                >
                                    OrderId
                                </th>
                                <th
                                    className="text-center"
                                >
                                    Date
                                </th>
                                <th
                                    className="text-center"
                                >
                                    Status
                                </th>
                                <th
                                    className="text-center"
                                >
                                    Payment
                                </th>
                                <th
                                    className="text-center"
                                >
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCustomer.orders.map((item, index) => (
                                <CoffeeTooltip
                                    key={index}
                                    text="click me" 
                                    side="top" 
                                    align="start" 
                                >
                                    <tr 
                                        className="cursor-pointer border border-red-500"
                                        onClick={() => {
                                            setOrderId(item.orderId);
                                            setShowFullDetails(true);
                                            handleScrollToTop()
                                        }}
                                    >
                                        <td>
                                            {item.orderId}
                                        </td>
                                        <td>
                                            {item.orderDate}
                                        </td>
                                        <td>
                                            {item.status}
                                        </td>
                                        <td>
                                            {item.paymentMethod}
                                        </td>
                                        <td>
                                            {item.total}
                                        </td>
                                    </tr>
                                </CoffeeTooltip>
                            ))}
                        </tbody>
                    </table>
                </div>
                    )
                }
            </div>
            <AnimatePresence>
                {showFullDetail && (
                orderDetails(orderID)
            )}
            </AnimatePresence>
            <div className="w-full text-center my-[2rem]">
                <h1 className="w-full text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]"
                >
                    Customer Status
                </h1>
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
                            {selectedCustomer.accountStatus}
                        </span>
                    </p>
                </div>
                <div className="container-flex justify-center px-[2rem] mb-[0.50rem]">
                    <button
                        ref={ref}
                        className={`px-4 py-2 rounded-md font-semibold transition-all duration-200 
                        ${status === "Active" 
                            ? "bg-red-600 text-white shadow-inner"
                            : "bg-green-200 text-green-700 shadow-md hover:bg-green-300"} 
                        `}
                        onClick={() => updateCustomerStatus()}
                    >
                        {status === "Active"
                            ? "Block"
                            : "Active"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ManageCustomer


import { useContext } from 'react';
import ModalContext from '../context/modalContext';
import { PhilippinePeso } from 'lucide-react';
const OrderCard = ({orderCard, orderlength}) => {
    const { toggleModal, setModalName } = useContext(ModalContext)
    const statusColors = {
        Pending: "bg-[#3b82f6]",
        Processing: "bg-[#f59e0b]",
        Completed: "bg-[#10b981]",
    }
    
    const openModal = (order) => {
        sessionStorage.setItem("customerOrder", JSON.stringify(order))
        setModalName("manageCustomerOrder")
        toggleModal()
    }

    return(
        <div 
            key={orderCard.orderId}
            className={`container-flex justify-center flex-col border border-[#8c6244] rounded-md cursor-pointerw-full p-2 mb-0 relative
                ${orderlength === 1 ? "h-[21.50rem] sm:h-[24.50rem]" : "h-full"}    
            `}
            onClick={() => openModal(orderCard)}
        >
            <div className="container-flex justify-center flex-col w-full font-opensans tracking-wide mb-[1rem]">
                <span className="font-bold text-[clamp(1.10rem,2vw,1.25rem)] mb-1">
                    {orderCard.orderId}
                </span>
                <span className="container-flex mb-0 text-[clamp(1rem,2vw,1.05rem)] gap-1">
                    <span> 
                        Date: 
                    </span>
                    <span className="text-[#D4A373] italic">
                        {orderCard.orderDate}
                    </span>
                </span>
            </div>
            <div className="container-flex justify-center flex-col w-full font-opensans tracking-wide gap-1">
                <span className="container-flex mb-0 text-[clamp(1rem,2vw,1.05rem)] gap-1">
                    <span>
                        Item: 
                    </span>
                    <span className="text-[#D4A373] italic">
                        {orderCard.items.length}
                    </span>
                </span>
                <span className="container-flex mb-0 text-[clamp(1rem,2vw,1.05rem)] gap-1">
                    <span>
                        Status: 
                    </span>
                    <span className="text-[#D4A373] italic">
                        {orderCard.status}
                    </span>
                </span>
            </div>
            <div className="container-flex justify-around w-full font-opensans tracking-wide">
                <span className="text-[clamp(1rem,2vw,1.05rem)]">
                    {orderCard.paymentMethod} 
                </span>
                <span className="container-flex mb-0 text-[#D4A373] italic text-[clamp(1rem,2vw,1.05rem)] gap-1">
                    <span>
                        <PhilippinePeso 
                            size={15} color="black"
                        />
                    </span>
                    <span>
                        {orderCard.total}
                    </span>
                </span>
            </div>
            <div className="absolute top-2 right-3 w-[2.50rem] h-[2.50rem] rounded-[50%] border border-black overflow-hidden">
                <div className={`${statusColors[orderCard.status]} w-full h-full`}>
                </div>
            </div>
        </div>
    )
}

export default OrderCard
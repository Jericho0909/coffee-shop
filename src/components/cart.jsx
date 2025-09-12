import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const Cart = ({arr, remove, customHeight, isRemovable}) => {
    return(
        <>
            <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
                your cart
            </h1>
            <div 
                className="bg-[#fffdf9] border border-[#d3b89f] w-full overflow-y-auto scrollbar-hide rounded-xl shadow-lg p-1 py-[1rem] mb-[1rem]"
                style={customHeight}
            >
                {(arr.length === 0)
                    ? (
                        <p className="container-flex justify-center mb-0 font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]">
                            Your cart is empty
                        </p>
                    )
                    : (arr.map((order, index) => (
                            <div
                                key={index}
                                className="container-flex justify-between w-full h-auto gap-1 p-1 mb-0 relative cursor-default"
                            >   
                                <div className="container-flex gap-1 w-auto p-1 mb-[0.20rem]">
                                    <span className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]">
                                        {order.name}
                                        <span className="text-[#D4A373] text-[clamp(0.65rem,2vw,0.80rem)]">
                                        ({order.size})
                                        </span>
                                    </span>
                                    <span className="text-[clamp(0.78rem,2vw,1rem)]">
                                        x{order.quantity}
                                    </span>
                                </div>
                                <div 
                                    className="flex-1 mx-2 border-dashed" 
                                    style={{ borderBottom: "1px dashed gray" }}>
                                </div>
                                <div className="container-flex w-auto p-1 mb-0">
                                    <span className="font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)]">
                                        {order.subtotal}
                                    </span>
                                </div>
                                {isRemovable && (
                                    <div 
                                        className="absolute -top-3 right-1 cursor-pointer"
                                        onClick={() => remove(order.productId)}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faXmark}
                                            className="w-4 h-3 text-red-500"
                                        />
                                    </div>   
                                )}
                            </div>
                        ))
                    )
                }
            </div>
        </>
    )
}

export default Cart
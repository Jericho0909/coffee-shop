import { useState, useContext, useEffect } from "react"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext";
import CustomerorderContext from "../../../../../context/customerorderContext";
import ModalContext from "../../../../../context/modalContext";
import { PhilippinePeso } from 'lucide-react';
import showToast from "../../../../../utils/showToast";
const PlaceOrder = ({customer}) => {
    const { productList } = useContext(FirebaseFetchDataContext)
    const { customerOrders, setCustomerOrders } = useContext(CustomerorderContext)
    const { setIsOpen, setModalName } = useContext(ModalContext)
    const [ productId ] = useState(sessionStorage.getItem("productId"))
    const { Toast } = showToast()
    const [ count, setCount ] = useState(1)

    const item = productList.find(key => key.id === productId)

    const orderFormat = {
        productId: item.id,
        name: item.name,
        size: "",
        quantity: count,
        flavor: "",
        addOns: [],
        price: 0,
        subtotal: 0,
        type: item.type
        
    }

    const [ order, setOrder ] = useState(orderFormat)
    const [ subtotal, setSubTotal] = useState(order.subtotal)

    useEffect(() => {
        order.quantity = count
        const addOnsPrice = order.addOns.length * 5;
        const total = (order.price + addOnsPrice) * count
        setSubTotal(total)
        order.subtotal = total
    }, [order, count])

    const addOns = (value) => {
        if(order.addOns.includes(value)){
            setOrder(prev => ({
                ...prev,
                addOns: prev.addOns.filter(key => key !== value)
            }))
        }
        else{
            setOrder(prev => ({
                ...prev,
                addOns: [...prev.addOns, value]
            }))
        }
    }

    const placeOrder = (e) => {
        e.preventDefault();
        const isMissingContact = !customer.name || !customer.phone || !customer.location
        if(isMissingContact){
            setModalName("completeinfo")
            setIsOpen(true)
            Toast("error", "We need your full information before we can process your order.",3000)
            return
        }
        showToast("success", "Your order has been placed successfully.",2000)
        setCustomerOrders(item => ([...item, order]))
        const orders = [...customerOrders, order]
        sessionStorage.setItem("customerOrders", JSON.stringify(orders))
        setTimeout(() => {
            setIsOpen(false)
        }, 200)
    }

    return(
        <form 
            className="container-flex justify-start flex-col w-full py-[2rem] px-1 overflow-y-auto scrollbar-hide"
            onSubmit={(e) => placeOrder(e)}
        >
            <div className="w-full p-2">
                <div className="float-left mr-4 mb-[1rem]">
                    <img
                    src={item.image}
                    alt={item.name}
                    className="w-[8rem] h-[8rem] border border-black"
                    loading="lazy"
                    />
                </div>
                <div className="w-full h-auto p-1">
                    <p className="font-nunito tracking-wide text-[clamp(0.85rem,2vw,1.05rem)] font-semibold"
                    >
                        {item.name}</p>
                </div>
                <div className="w-full h-auto p-1">
                    <p className="container-flex justify-start mb-0 font-nunito tracking-wide text-[clamp(0.85rem,2vw,1.05rem)] font-semibold gap-1"
                    >
                        <span className="container-flex mb-0 gap-1">
                            <PhilippinePeso 
                                size={15} color="black"
                            />
                            :
                        </span>
                        <span>
                            {item.price}
                        </span>
                    </p>
                </div>
                <div className="w-full h-auto p-1 mb-[1rem]">
                    <p className="font-nunito tracking-wide text-[clamp(0.85rem,2vw,1.05rem)] font-semibold"
                    >
                        {item.description}
                    </p>
                </div>
                <div className="w-full h-auto p-1 mb-[1rem]">
                    <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[0.50rem]">
                        size
                    </h1>
                    <div className="container-flex justify-between w-full h-auto p-1 gap-2 mb-[0.50rem]">
                        {item.sizeOptions.map((key, index) => (
                            <div 
                                key={index}
                                className="container-flex justify-center w-auto h-full mb-0"
                            >
                                <input
                                    id={`${key.size}-size`}
                                    type="radio"
                                    name="price"
                                    required
                                    value={key.price}
                                    onChange={(e) => {
                                        setOrder({
                                            ...order,
                                            size: key.size,
                                            [e.target.name]: Number(e.target.value),
                                        })
                                    }}
                                    className="w-auto"
                                />
                                <label 
                                    htmlFor={`${key.size}-size`}
                                    className="container-flex justify-center w-full h-full gap-1 mb-0"
                                >
                                    <span>
                                        {key.size}
                                    </span>
                                    
                                    <span className="container-flex mb-0">
                                        <PhilippinePeso 
                                            size={15} color="black"
                                        />
                                        <span>
                                            {key.price}
                                        </span>
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full h-auto p-1 mb-[1rem]">
                    <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[0.50rem]">
                        flavors
                    </h1>
                    <div className="container-flex justify-around w-full h-auto p-1 gap-2 mb-[0.50rem]">
                        {item.flavors[0] === "__empty__"
                            ? (
                                <p className="font-nunito tracking-wide text-[clamp(0.85rem,2vw,1.05rem)] font-semibold">
                                    none
                                </p>
                            ) 
                            : (
                            item.flavors.map((flavor, index) => (
                            <div 
                                key={index}
                                className="container-flex justify-center w-auto h-full"
                            >
                                <input
                                    id={`${flavor}`}
                                    type="radio"
                                    name="flavor"
                                    required
                                    value={flavor}
                                    onChange={(e) => {
                                        setOrder({...order, [e.target.name]: e.target.value})
                                    }}
                                    className="w-auto"
                                />
                                <label 
                                    htmlFor={`${flavor}`}
                                    className="container-flex justify-center w-full h-full gap-1 mb-0"
                                    >
                                    <span>{flavor}</span>
                                </label>
                            </div>
                            )))
                        }
                    </div>
                </div>
                <div className="w-full h-auto p-1 mb-[1rem]">
                    <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[0.50rem]">
                        addons
                    </h1>
                    <div className="container-flex justify-around w-full h-auto p-1 gap-2 mb-[0.50rem]">
                        {item.addOns[0] === "__empty__" 
                            ? (
                                <p className="font-nunito tracking-wide text-[clamp(0.85rem,2vw,1.05rem)] font-semibold">none</p>
                            ) 
                            : (
                            item.addOns.map((addons, index) => (
                            <div 
                                key={index}
                                className="container-flex justify-center w-auto h-full"
                            >
                                <input
                                    id={`${addons}`}
                                    type="checkbox"
                                    name="addOns"
                                    value={addons}
                                    onChange={(e) => addOns(e.target.value)}
                                    className="w-auto"
                                />
                                <label 
                                    htmlFor={`${addons}`}
                                    className="container-flex justify-center w-full h-full gap-1 mb-0"
                                    >
                                    <span>{addons}</span>
                                </label>
                            </div>
                            )))
                        }
                    </div>
                </div>
                {item.type.includes("/") && (
                    <div className="w-full h-auto p-1 mb-[1rem]">
                        <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[0.50rem]">
                            type
                        </h1>
                        <div className="container-flex justify-around w-full h-auto p-1 gap-2 mb-[0.50rem]">
                            <>
                                <div className="container-flex w-auto h-auto p-1 gap-2 mb-[0.50rem]">
                                    <input
                                        id="Hot"
                                        type="radio"
                                        name="type"
                                        required
                                        value="Hot"
                                        onChange={(e) => {
                                            setOrder({...order, [e.target.name]: e.target.value})
                                        }}
                                        className="w-auto"
                                    />
                                    <label 
                                        htmlFor="Hot"
                                        className="container-flex justify-center w-auto h-full gap-1 mb-0"
                                        >
                                        <span>Hot</span>
                                    </label>
                                </div>
                                <div className="container-flex w-auto h-auto p-1 gap-2 mb-[0.50rem]">
                                    <input
                                        id="Cold"
                                        type="radio"
                                        name="type"
                                        required
                                        value="Cold"
                                        onChange={(e) => {
                                            setOrder({...order, [e.target.name]: e.target.value})
                                        }}
                                        className="w-auto"
                                    />
                                    <label 
                                        htmlFor="Cold"
                                        className="container-flex justify-center w-full h-full gap-1 mb-0"
                                        >
                                        <span>Cold</span>
                                    </label>
                                </div>
                            </>
                        </div>
                    </div>
                )}
                <div className="container-flex justify-center flex-col  w-full h-auto p-1">
                    <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[0.50rem]">
                        how many order  
                    </h1>
                    <div className="container-flex justify-center w-[40%] sm:w-[30%] h-[3rem] mb-0">
                        <div className="container-flex mb-0 w-[3rem] h-full">
                            <button
                                type="button"
                                className="bg-[#8c6244] w-full h-full text-white font-black shadow-md rounded-[15px] active:translate-y-[2px] active:shadow-inner 
                                transition-all duration-150"
                                onClick={() => setCount(prev => (prev > 1 ? prev - 1 : 1))}
                            >
                                -
                            </button>
                        </div>
                        <div className="container-flex justify-center mb-0 flex-1 h-full">
                            <span>
                                {count}
                            </span>
                        </div>
                        <div className="container-flex mb-0 w-[3rem] h-full">
                            <button
                                type="button"
                                className="bg-[#8c6244] w-full h-full text-white font-black shadow-md rounded-[15px] active:translate-y-[2px] active:shadow-inner 
                                transition-all duration-150"
                                onClick={() => setCount(count + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container-flex justify-center w-full h-auto p-1">
                    <button 
                        className="press bg-[#6b4226] 
                        hoverable:hover:bg-[#5a3620] 
                        hoverable:hover:scale-105 
                        w-[50%]"
                        type="submit"
                    >
                        add to order ({subtotal})
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
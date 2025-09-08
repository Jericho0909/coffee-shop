import { useState, useContext, useEffect } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import CustomerorderContext from "../../../../../context/customerorderContext";
import ModalContext from "../../../../../context/modalContext";
import { PhilippinePeso } from 'lucide-react';
import { toast } from "react-hot-toast";

const PlaceOrder = ({customer}) => {
    const { productList } = useContext(FetchDataContext)
    const { customerOrders, setCustomerOrders } = useContext(CustomerorderContext)
    const { setIsOpen, setModalName } = useContext(ModalContext)
    const [ productId ] = useState(sessionStorage.getItem("productId"))
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
        subtotal: 0
        
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
        const isMissingContact = !customer.email || !customer.phone || !customer.location;
        if(isMissingContact){
            setModalName("contactform")
            setIsOpen(true)

            toast.success(
                <div className="Notification">
                    We need your contact details before we can process your order.
                </div>,
                {
                    style: {
                    width: "100%",
                    backgroundColor: "white",
                    color: "#8c6244",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    },
                    duration: 4000,
                }
            );
            return
        }
        toast.success(
            <div className="Notification">
                Your order has been placed successfully.
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
        );
        setCustomerOrders(item => ([...item, order]))
        const orders = [...customerOrders, order]
        sessionStorage.setItem("customerOrders", JSON.stringify(orders))
        setTimeout(() => {
            setIsOpen(false)
        }, 200)
    }

    return(
        <form 
            className="container-flex justify-center sm:justify-start flex-col w-full py-[2rem] px-1 overflow-y-auto scrollbar-hide"
            onSubmit={(e) => placeOrder(e)}
        >
            <div className="w-full p-2">
                <div className="float-left mr-4 mb-[1rem]">
                    <img
                    src={item.image}
                    alt={item.name}
                    className="w-[8rem] h-[8rem] border border-black"
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
                        {item.flavors.length === 0 
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
                        {item.addOns.length === 0 
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
                            <p>
                                {count}
                            </p>
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
                        className="press bg-[#6b4226] hover:bg-[#5a3620] w-[50%]"
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
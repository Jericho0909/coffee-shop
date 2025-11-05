import { useState, useContext, useEffect } from "react"
import FirebaseActionContext from "../../../../../context/firebaseactionContext";
import ModalContext from "../../../../../context/modalContext";
import showToast from "../../../../../utils/showToast";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
const AddStock = () => {
    const { pushAction } = useContext(FirebaseActionContext)
    const { toggleModal } = useContext(ModalContext)
    const [ quantity, setQuantity ] = useState(1)
    const { Toast } = showToast()
    const shortStockId = "S-" + uuidv4().slice(0, 5)

    const stockFormat = {
        id: shortStockId,
        name: "",
        quantity: quantity,
        unit: "",
        category: "",
        minStock: 5,
        lastUpdated: format(new Date(), "MM/dd/yy")
    }


    const [ stock, setStock ] = useState(stockFormat)

    useEffect(() => {
        stock.quantity = quantity
    },[quantity, stock])

    const handleSubmit = async(e) => {
        e.preventDefault()

        await pushAction("stocks", stock)
        toggleModal()
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            })
        }, 0)
        Toast("success", "New stock has been added successfully.", 2000)
    }
    return(
        <form 
            className="container-flex justify-start flex-col w-full py-[2rem] px-1 overflow-y-auto scrollbar-hide"
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className="container-flex flex-col w-full h-full p-1">
                <h1 className="w-full text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]"
                >
                    Add Stock
                </h1>
                <div className="container-flex flex-col p-1 mb-0 w-[85%]">
                    <div className="container-flex w-full">
                        <label htmlFor="name" className="w-auto">
                            Name:
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            placeholder="Ex: matcha latte..."
                            value={stock.name}
                            onChange={(e) =>
                                setStock({ ...stock, [e.target.name]: e.target.value })
                            }
                        />
                    </div>
                    <div className="container-flex w-full lg:w-[50%] gap-1">
                        <div className="flex-1 w-full lg:w-full h-full">
                            <button
                                type="button"
                                className="bg-red-500 w-full h-full text-white font-black shadow-md rounded-[15px] active:translate-y-[2px] active:shadow-inner 
                                transition-all duration-150"
                                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                            >
                                -1
                            </button>
                        </div>
                        <div className="flex-1">
                            <div className="container-flex justify-center mb-0 flex-1 h-full">
                            <input
                                id="quantity"
                                type="number"
                                required
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="flex-1 w-full h-full">
                            <button
                                type="button"
                                className="bg-[#88A550] w-full h-full text-white font-black shadow-md rounded-[15px] active:translate-y-[2px] active:shadow-inner 
                                transition-all duration-150"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +1
                            </button>
                        </div>
                    </div>
                    <div className="container-flex justify-between flex-col lg:flex-row w-full">
                        <div className="container-flex w-auto gap-1">
                            <label htmlFor="unit">
                                Unit:
                            </label>
                            <select
                                id="unit"
                                required
                                name="unit"
                                value={stock.unit}
                                onChange={(e) =>
                                setStock({ ...stock, [e.target.name]: e.target.value })
                            }
                                className="py-3 px-2"
                            >
                                <option value="">Select Unit</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="pcs">pcs</option>
                                <option value="pack">pack</option>
                            </select>
                        </div>
                        <div className="container-flex w-auto gap-1">
                            <label htmlFor="category">
                                Category:
                            </label>
                            <select
                                id="category"
                                required
                                name="category"
                                value={stock.category}
                                onChange={(e) =>
                                setStock({ ...stock, [e.target.name]: e.target.value })
                            }
                                className="py-3 px-2"
                            >
                                <option value="">Select Category</option>
                                <option value="dairy">Dairy</option>
                                <option value="coffee">Coffee</option>
                                <option value="sweetener">Sweetener</option>
                                <option value="flavor">Flavor</option>
                                <option value="toppings">Toppings</option>
                                <option value="non-food">Non-food</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full h-auto">
                        <button
                            type="submit"
                            className="press  hoverable:hover:bg-[#8b5e3c] 
                            hoverable:hover:scale-105 
                            hoverable:hover:shadow-[0_4px_12px_rgba(111,78,55,0.4)] w-[40%]"
                            style={{ fontVariant: "small-caps" }}
                            >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddStock
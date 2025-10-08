import { useContext, useState } from "react";
import FirebaseActionContext from "../../../../../context/firebaseactionContext";
import { CircleCheck } from 'lucide-react';
import { CircleAlert } from 'lucide-react';
import { TriangleAlert } from 'lucide-react';
import { X } from 'lucide-react';
const StockList = ({getDisplayList}) => {
    const { updateAction, removeAction } = useContext(FirebaseActionContext)
    const [ editable, setEditable ] = useState(false);
    const [ selectedStock, setSelectedStock ] = useState()


    const selectStock = (id) => {
        const stock = getDisplayList.find(key => key.id === id)
        setSelectedStock(stock)
    }

    const removeStock = async(id) => {
        const updatedStockList = getDisplayList.filter(key => key.id !== id)
        await removeAction("stocks", id, [updatedStockList])
    }

    const handleSaveQuantity = async() => {
        await updateAction("stocks", selectedStock.firebaseKey, selectedStock ) 
    }

    const signIcon = (quantity) => {
        if(quantity >= 20){
            return(
                <span>
                    <CircleCheck
                        size={20}
                        className="text-green-600"
                    />
                </span>
            )
        }
        else if(quantity <= 10){
            return(
                <span>
                    <TriangleAlert
                        size={20}
                        className="text-red-600"
                    />
                </span>
            )
        }
        else if(quantity <= 19){
            return(
                <span>
                    <CircleAlert
                        size={20}
                        className="text-amber-500 fill-amber-100"
                    />
                </span>
            )
        }

    }
    
    return(
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {getDisplayList.map((item, value) => (
                <div
                    key={value}
                    className="container-flex justify-start w-full h-auto gap-1 mt-1 p-2 relative border border-gray-400"
                >
                    <div
                        className="container-flex w-[22rem] p-1 mb-0 gap-1"
                    >
                        <span className="truncate block min-w-0 max-w-[8rem]">
                                {item.name}:
                        </span>
                        <input
                            id="quantity"
                            type="number"
                            required
                            name="quantity"
                            value={(editable && selectedStock.id === item.id) ? selectedStock.quantity : item.quantity}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedStock({
                                    ...item,
                                    [e.target.name]: value === "" ? "" : Number(value)
                                })
                            }}
                            readOnly={!editable}     
                            onFocus={() => {
                                setEditable(true)
                                selectStock(item.id)
                            }}
                            onBlur={() => {
                                handleSaveQuantity()
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSaveQuantity();
                                    e.target.blur()
                                }
                            }}
                            className="w-[6rem] bg-black text-white focus:outline-none focus:ring-0 focus:border-transparent"
                        />
                        {signIcon(item.quantity)}
                    </div>
                    <div className="absolute top-0 right-0 w-auto h-auto p-1 cursor-pointer">
                        <button
                            onClick={() => removeStock(item.firebaseKey)}
                        >
                            <X 
                                size={15}
                                color="red"
                            />
                        </button>
                    </div>    
                </div>
            ))}
       </div>
    )
}

export default StockList
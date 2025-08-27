import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const CoffeeAddOns = ({formData, setFormData}) => {
    const [ addOns, setAddOns ] = useState("")
    const ref = useRef(null);
    const inputAddOnsRef = (useRef(null))

    useEffect(() => {
        const storeAddOns = JSON.parse(sessionStorage.getItem("addOns"))
        if(storeAddOns){
            setFormData(prev => ({...prev, addOns: storeAddOns}))
        }
    }, [setFormData])

    const handleAddOns = (value) => {
        if (!value.trim()) return;

        const updatedAddOns = [...formData.addOns, value]
        setFormData({ ...formData, addOns: updatedAddOns })
        sessionStorage.setItem("addOns", JSON.stringify(updatedAddOns))
        setAddOns("")

        setTimeout(() => {
            const container = ref.current;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        },0)
    }

    const hanleRemove = (index) => {
        const updatedAddOns = formData.addOns.filter((_, i) => i !== index)
        setFormData({ ...formData, addOns: updatedAddOns })
        sessionStorage.setItem("storeAddOns", JSON.stringify(updatedAddOns))
    }

    const handleFocus = () => {
        const focus = inputAddOnsRef.current
        if(focus){
            focus?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
        }
    }

    return(
        <div className="mb-[0.80rem]">
            <h1 className="block w-full h-auto p-1 mb-1 font-nunito tracking-wide text-[clamp(0.85rem,2vw,1.05rem)] font-semibold"> 
                coffe addons
            </h1>
            <div className="grid grid-flow-row-2 w-full h-[25rem]">
                <div 
                    ref={ref}
                    className="grid grid-cols-3 gap-4 w-full max-h-full items-start overflow-y-scroll p-2 scrollbar-hide border border-black bg-white"
                >
                    {formData.addOns?.map((item, index) => (
                        <div 
                            key={index} 
                            className="truncate p-1 border border-black relative"
                        >
                            <span className="truncate block pr-6">
                                {item}
                            </span> 
                            <div 
                                className="flex justify-center items-center absolute top-0 right-0 rounded-[50%] p-1 cursor-pointer"
                                onClick={() => hanleRemove(index)}
                            >
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="w-3 h-3 text-red-600"
                                />
                            </div>
                        </div>
                    ))}   
                </div>
                <div className="flex justify-center items-center flex-col w-auto h-auto p-1 gap-1">
                    <label
                        htmlFor="addOns"
                        style={{ fontVariant: 'small-caps' }}
                    >
                        addons
                    </label>
                    <input
                        ref={inputAddOnsRef}
                        id="addOns"
                        type="text"
                        name="addOns"
                        onFocus={handleFocus}
                        value={addOns}
                        onChange={(e) => setAddOns(e.target.value)}
                        className="w-full"
                    />
                    <button
                        className="bg-[#3B2F2F] text-white px-4 py-2 rounded shadow-md w-[35%] sm:w-[45%] h-auto mt-2
                        hover:bg-[#2d2323] hover:scale-105 
                        active:scale-95 active:shadow-none
                        transition-transform duration-200 ease-in-out"
                        style={{ fontVariant: "small-caps" }}
                        type="button"
                        onClick={() => handleAddOns(addOns)}
                    >
                        add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CoffeeAddOns
import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const CoffeeFlavors = ({formData, setFormData}) => {
    const [ flavors, setFlavors ] = useState("")
    const flavorContainerRef = useRef(null);
    const inputFlavorRef = useRef(null);

    useEffect(() => {
        const storeFlavors = JSON.parse(sessionStorage.getItem("storeFlavors"))
        if(storeFlavors){
            setFormData(prev => ({...prev, flavors: storeFlavors}))
        }
    }, [setFormData])

    const addFlavors = (flavor) => {
        if (!flavor.trim()) return;

        const updatedFlavors = [...formData.flavors, flavor]
        setFormData({ ...formData, flavors: updatedFlavors })
        sessionStorage.setItem("storeFlavors", JSON.stringify(updatedFlavors))
        setFlavors("")

        setTimeout(() => {
            const flavorContainer = flavorContainerRef.current;
            if (flavorContainer) {
                flavorContainer.scrollTop = flavorContainer.scrollHeight;
            }
        },0);
    }

    const removeFlavors = (index) => {
        const updatedFlavors = formData.flavors.filter((_, i) => i !== index)
        setFormData({ ...formData, flavors: updatedFlavors });
        sessionStorage.setItem("storeFlavors", JSON.stringify(updatedFlavors))
    }

    const handleFocus = () => {
        const focus = inputFlavorRef.current
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
                add flavors
            </h1>
            <div className="grid grid-rows-2 w-full h-[25rem]">
                <div 
                    ref={flavorContainerRef}
                    className="grid grid-cols-3 gap-4 w-full max-h-full items-start overflow-y-scroll p-2 scrollbar-hide border border-black bg-white"
                >
                    {formData.flavors?.map((item, index) => (
                        <div 
                            key={index} 
                            className="truncate p-1 border border-black relative"
                        >
                            <span className="truncate block pr-6">
                                {item}
                            </span> 
                            <div 
                                className="flex justify-center items-center absolute top-0 right-0 rounded-[50%] p-1 cursor-pointer"
                                onClick={() => removeFlavors(index)}
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
                        htmlFor="add-flavors"
                        style={{ fontVariant: 'small-caps' }}
                    >
                        add flavors
                    </label>
                    <input
                        ref={inputFlavorRef}
                        id="add-flavors"
                        type="text"
                        name="flavors"
                        onFocus={handleFocus}
                        value={flavors}
                        onChange={(e) => setFlavors(e.target.value)}
                        className="w-full"
                    />
                    <button
                        className="bg-[#3B2F2F] text-white px-4 py-2 rounded shadow-md w-[35%] sm:w-[45%] h-auto mt-2
                        hover:bg-[#2d2323] hover:scale-105 
                        active:scale-95 active:shadow-none
                        transition-transform duration-200 ease-in-out"
                        style={{ fontVariant: "small-caps" }}
                        type="button"
                        onClick={() => addFlavors(flavors)}
                    >
                        add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CoffeeFlavors
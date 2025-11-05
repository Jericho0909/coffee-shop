import { useContext } from "react"
import CoffeeImage from "../coffee/coffeeImage"
import CoffeeName from "../coffee/coffeename"
import CoffeeAvailable from "../coffee/coffeeAvailable"
import CoffeeDescription from "../coffee/coffeeDescription"
import CoffeePrice from "../coffee/coffeePrice"
import CoffeeCategory from "../coffee/coffeeCategory"
import CoffeeFlavors from "../coffee/coffeeFlavors"
import CoffeeType from "../coffee/coffeeType"
import CoffeeAddOns from "../coffee/coffeeAddOns"
import ContainerContext from "../../../../../context/containerContext"

const Form = ({defaultFormData, formData, setFormData, formType}) => {
    const { container } = useContext(ContainerContext)
    const handleCancel = () => {
        setFormData(defaultFormData)
        sessionStorage.clear()

        const formContaineer = container.current
        if(formContaineer){
            formContaineer.scrollIntoView({behavior: 'smooth', block: 'start'});
        }

    }
    return(
        <>
            <div 
                ref={container}
                className="w-full h-auto my-0 mx-auto"
            >
                <div className="float-left w-auto h-auto">
                    <CoffeeImage
                        formData = {formData}
                        setFormData = {setFormData}
                        formType = {formType}
                    />
                </div>
                <div>
                    <CoffeeName
                        formData = {formData}
                        setFormData = {setFormData}
                        formType = {formType}
                    />
                    <CoffeeAvailable
                        formData = {formData}
                        setFormData = {setFormData}
                        formType = {formType}
                    />
                    <CoffeeDescription
                        formData = {formData}
                        setFormData = {setFormData}
                        formType = {formType}
                    />
                    <CoffeePrice
                        formData = {formData}
                        setFormData = {setFormData}
                        formType = {formType}
                    />
                    <CoffeeCategory
                        formData = {formData}
                        setFormData = {setFormData}
                        formType = {formType}
                    />
                    <CoffeeFlavors
                        formData = {formData}
                        setFormData = {setFormData}
                        formType = {formType}
                    />
                    <CoffeeType
                        formData = {formData}
                        setFormData = {setFormData}
                        formType = {formType}
                    />
                    <CoffeeAddOns
                        formData = {formData}
                        setFormData = {setFormData}
                        formType = {formType}
                    />
                </div>
                
            </div>
            <div 
                className={`flex items-center w-full h-auto 
                    ${formType === "AddProduct"
                        ? "justify-between"
                        : "justify-center"
                    }
                `}
            >
               {formType === "AddProduct" && (
                    <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded shadow-md w-[35%] sm:w-[45%] h-auto
                        transition-transform duration-300 ease-in-out
                        hover:bg-red-600 hover:scale-105 hover:shadow-[0_4px_12px_rgba(239,68,68,0.4)]
                        active:translate-y-1 active:shadow-none"
                        style={{ fontVariant: "small-caps" }}
                        onClick={() => handleCancel()}
                    >
                        cancel
                </button>
               )}
                <button
                    type="submit"
                    className="press w-[35%] sm:w-[45%] "
                    style={{ fontVariant: "small-caps" }}
                >
                    conforim
                </button>
            </div>
        </>
    )
}

export default Form
import CoffeeImage from "../coffee/coffeeImage"
import CoffeeName from "../coffee/coffeename"
import CoffeeAvailable from "../coffee/coffeeAvailable"
import CoffeeDescription from "../coffee/coffeeDescription"
import CoffeePrice from "../coffee/coffeePrice"
import CoffeeCategory from "../coffee/coffeeCategory"
import CoffeeFlavors from "../coffee/coffeeFlavors"
import CoffeeType from "../coffee/coffeeType"
import CoffeeAddOns from "../coffee/coffeeAddOns"

const Form = ({formData, setFormData}) => {
    return(
        <>
            <div className="w-full h-auto my-0 mx-auto">
                <div className="float-left w-auto h-auto">
                    <CoffeeImage
                        formData = {formData}
                        setFormData = {setFormData}
                    />
                </div>
                <div>
                    <CoffeeName
                        formData = {formData}
                        setFormData = {setFormData}
                    />
                    <CoffeeAvailable
                        formData = {formData}
                        setFormData = {setFormData}
                    />
                    <CoffeeDescription
                        formData = {formData}
                        setFormData = {setFormData}
                    />
                    <CoffeePrice
                        formData = {formData}
                        setFormData = {setFormData}
                    />
                    <CoffeeCategory
                        formData = {formData}
                        setFormData = {setFormData}
                    />
                    <CoffeeFlavors
                        formData = {formData}
                        setFormData = {setFormData}
                    />
                    <CoffeeType
                        formData = {formData}
                        setFormData = {setFormData}
                    />
                    <CoffeeAddOns
                        formData = {formData}
                        setFormData = {setFormData}
                    />
                </div>
                
            </div>
            <div className="flex justify-center items-center w-full h-auto">
                <button
                    type="submit"
                    className="bg-[#8c6244] text-white px-4 py-2 rounded shadow-md w-[50%] h-auto
                    active:translate-y-1 active:shadow-none
                    transition-transform duration-150 ease-in-out"
                    style={{ fontVariant: "small-caps" }}
                >
                    conforim
                </button>
            </div>
        </>
    )
}

export default Form
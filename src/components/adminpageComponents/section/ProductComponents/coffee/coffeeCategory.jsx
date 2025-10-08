import { useEffect } from "react"
const CoffeeCategory = ({formData, setFormData, formType}) => {

    useEffect(() => {
        const storeCategory = sessionStorage.getItem("category")
        if(storeCategory){
            setFormData(prev => ({...prev, category: storeCategory}))
        }
    }, [setFormData])

    const handleSaved = (e) => {
        const value = e.target.value
        if(formType === "AddProduct"){
            sessionStorage.setItem("category", value)
        }
    }

    return(
        <div className="flex justify-center items-center flex-col mb-[0.80rem]">
            <label 
                htmlFor="category"
                style={{ fontVariant: 'small-caps' }}
            >
                main category
            </label>
            <select 
                id="category" 
                name="category" 
                required
                value={formData.category || ""}
                onChange={(e) => {
                    setFormData({...formData, [e.target.name]: e.target.value});
                    handleSaved(e)
                }}
                className="category"
            >
                <option className="category" value="">
                    -- select category --
                </option>
                <option className="category" value="Espresso">
                    espresso
                </option>
                <option className="category" value="Americano">
                    americano
                </option>
                <option className="category" value="Latte">
                    latte
                </option>
                <option className="category" value="Cappuccino">
                    cappuccino
                </option>
                <option className="category" value="Macchiato">
                    macchiato
                </option>
                <option className="category" value="Mocha">
                    mocha
                </option>
                <option className="category" value="Flat White">
                    flat white
                </option>
                <option className="category" value="Cold Brew">
                    cold brew
                </option>
                <option className="category" value="Frappe">
                    frappe / blended
                </option>
                <option className="category" value="Non-Coffee">
                    non-coffee
                </option>
                <option className="category" value="Tea">
                    tea
                </option>
            </select>
        </div>
    )
}

export default CoffeeCategory
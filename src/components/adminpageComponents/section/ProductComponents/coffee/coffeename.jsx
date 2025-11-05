import { useEffect } from "react"
import toTitleCase from "../../../../../utils/toTitleCase";
const CoffeeName = ({formData, setFormData, formType}) => {
    
    useEffect(() => {
        const storedName = sessionStorage.getItem("name");
        if (storedName) {
            setFormData(prev => ({ ...prev, name: storedName }));
        }
    }, [setFormData]);

    const handleSaved = (e) => {
        const value = e.target.value
        if(formType === "AddProduct"){
            sessionStorage.setItem("name", value)
        }
        
    }

    return(
        <div className="flex flex-col mb-[0.80rem]">
            <label 
                htmlFor="coffee-name"
                style={{ fontVariant: 'small-caps' }}
            >
                coffee name
            </label>
            <input
                id="coffee-name"
                type="text"
                name="name"
                required
                spellCheck="false"
                value={formData.name || ""}
                onChange={(e) => {
                    const titleCase = toTitleCase(e.target.value )
                    setFormData({ ...formData, [e.target.name]: titleCase});
                    handleSaved(e)
                }}
                className="w-[100%]"
            />
        </div>
    )
}

export default CoffeeName
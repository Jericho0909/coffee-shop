import { useEffect } from "react"
const CoffeeDescription = ({formData, setFormData}) => {
    
    useEffect(() => {
        const storeDescription = sessionStorage.getItem("description")
        if(storeDescription){
            setFormData(prev => ({...prev, description: storeDescription}))
        }

    }, [setFormData])

    const handleSaved = (e) => {
        const value = e.target.value
        sessionStorage.setItem("description", value)
    }

    return (
        <div className="mt-[3.50rem] mb-[0.80rem] w-full h-auto">
            <label
                htmlFor="coffee-description"
                style={{ fontVariant: 'small-caps' }}
            >
                description
            </label>
            <textarea
                id="coffee-description"
                name="description"
                value={formData.description || ""}
                onChange={(e) => {
                    setFormData({...formData, [e.target.name] : e.target.value});
                    handleSaved(e)

                }} 
                className="w-full h-[8rem]"
            />
        </div>
    )
}

export default CoffeeDescription
import { useEffect } from "react"

const CoffeeAvailable = ({formData, setFormData, formType}) => {

    useEffect(() => {
        const storeAvailable = JSON.parse(sessionStorage.getItem("available"))
        
        setFormData(prev => ({...prev, available: storeAvailable || prev.available}))

    }, [setFormData])

    const handleSaved = (isAvailable) => {
        if(formType === "AddProduct"){
            sessionStorage.setItem("available", JSON.stringify(isAvailable))
        }
    }

    return (
        <div className="flex justify-center items-center flex-col mb-[0.80rem]">
             <h1 className="block w-full h-auto p-1 mb-1 font-nunito tracking-wide text-[clamp(0.85rem,2vw,1.05rem)] font-semibold"> 
                available
            </h1>
            <div className="flex justify-around items-center w-full">
                <div className="flex justify-center items-center">
                    <label
                        htmlFor="true"
                    >
                        true
                    </label>
                    <input
                        id="true"
                        type="radio"
                        name="available"
                        required
                        checked={formData.available === true}
                        onChange={(e) => {
                            setFormData({...formData, [e.target.name] : true});
                            handleSaved(true)
                        }}
                        className="mb-1"
                    />
                </div>
                <div className="flex justify-center items-center ">
                    <label
                        htmlFor="false"
                    >
                        false
                    </label>
                    <input
                        id="false"
                        type="radio"
                        name="available"
                        required
                        checked={formData.available === false}
                        onChange={(e) => {
                            setFormData({...formData, [e.target.name] : false});
                            handleSaved(false)
                        }}
                        className="mb-1"
                    />
                </div>
            </div>
        </div>
    )
}

export default CoffeeAvailable
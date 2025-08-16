import { useEffect } from "react"
const CoffeeType = ({formData, setFormData}) => {

    useEffect(() => {
        const storeType = sessionStorage.getItem("type")
        if(storeType){
            setFormData(prev => ({...prev, type: storeType}))
        }
    }, [setFormData])

    const handleSaved = (e) => {
        const value = e.target.value
        sessionStorage.setItem("type", value)
    }

    return(
        <div className="mb-[0.80rem]">
            <h1 className="block w-full h-auto p-1 mb-1 font-nunito tracking-wide text-[clamp(0.85rem,2vw,1.05rem)] font-semibold"> 
                type
            </h1>
            <div className="flex justify-between items-center mb-1 px-2 gap-1">
                <div className="flex justify-between items-center p-1">
                    <input 
                    id="hot-cold"
                    type="radio"
                    name="type"
                    required
                    value="Hot/Iced" 
                    checked={formData.type === "Hot/Iced" || ""}
                    onChange={(e) => {
                        setFormData({ ...formData, [e.target.name]: e.target.value });
                        handleSaved(e)
                    }}
                />
                    <label 
                        htmlFor="hot-cold"
                        className="mb-0"
                        style={{ fontVariant: 'small-caps' }}
                    >
                        hot/cold
                    </label>
                </div>
                <div className="flex justify-between items-center p-1">
                    <input 
                        id="hot"
                        type="radio"
                        name="type"
                        required
                        value="Hot" 
                        checked={formData.type === "Hot" || ""}
                        onChange={(e) => {
                            setFormData({ ...formData, [e.target.name]: e.target.value });
                            handleSaved(e)
                        }}
                    />
                    <label
                        htmlFor="hot"
                        className="mb-0"
                        style={{ fontVariant: 'small-caps' }}
                    >
                        hot
                    </label>
                </div>
                <div className="flex justify-between items-center p-1">
                    <input 
                        id="cold"
                        type="radio"
                        name="type"
                        required
                        value="Cold" 
                        checked={formData.type === "Cold" || ""}
                        onChange={(e) => {
                            setFormData({ ...formData, [e.target.name]: e.target.value });
                            handleSaved(e)
                        }}
                    />
                    <label 
                        htmlFor="cold"
                        className="mb-0"
                        style={{ fontVariant: 'small-caps' }}
                    >
                        cold
                    </label>
                </div>
            </div>
        </div>
    )
}

export default CoffeeType
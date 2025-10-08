import { useEffect } from "react"
const CoffeePrice = ({formData, setFormData, formType}) => {

    useEffect(() => {
        const storedBasedP = JSON.parse(sessionStorage.getItem("basedPrice") || 0)
        const storedTallP = JSON.parse(sessionStorage.getItem("tallPrice") || 0)
        const storedGrandeP = JSON.parse(sessionStorage.getItem("grandePrice") || 0)
        const storedVentiP = JSON.parse(sessionStorage.getItem("ventiPrice") || 0)

        if (storedBasedP || storedTallP || storedGrandeP || storedVentiP) {
            setFormData(prev => ({
                ...prev,
                price: Number(storedBasedP),
                sizeOptions: [
                    { size: "Tall", price: Number(storedTallP) },
                    { size: "Grande", price: Number(storedGrandeP) },
                    { size: "Venti", price: Number(storedVentiP) }
                ]
            }));
        }
    }, [setFormData]);


    const sizeOptions = formData.sizeOptions.map(key => key)
    const updateSizeOptions = (e, size) => {
        const updatedSizes = formData.sizeOptions.map((option) => {
            if (option.size === size) {
                return { ...option, price: Number(e.target.value) }
            }
            return option
        })
        setFormData({ ...formData, sizeOptions: updatedSizes })
    }

    const handleSaved = (e, size) => {
        const value = Number(e.target.value)
        if(formType === "AddProduct"){
            sessionStorage.setItem(size, JSON.stringify(value))
        }
    }

    return(
        <div className="mb-[0.80rem]">
            <label 
                htmlFor="coffee-price"
                style={{ fontVariant: 'small-caps' }}
            >
                price
            </label>
            <input
                id="coffee-price"
                type="number"
                name="price"
                required
                value={formData.price || ""}
                onChange={(e) => {
                    setFormData({...formData, [e.target.name]: Number( e.target.value)});
                    handleSaved(e, "basedPrice")
                }}
                className="w-[100%] mb-[0.80rem]"
            />
            <div className="flex justify-between items-center w-full px-2 gap-4">
                <div> 
                    <label 
                        htmlFor="Tall"
                        style={{ fontVariant: 'small-caps' }}
                    >
                        tall price
                    </label>
                    <input
                        id="Tall"
                        type="number"
                        name="Tall"
                        required
                        value={sizeOptions[0].price || ""}
                        onChange={(e) => {
                            updateSizeOptions(e, "Tall");
                            handleSaved(e, "tallPrice")
                        }}
                    />
                </div>
                <div>
                    <label 
                        htmlFor="Grande"
                        style={{ fontVariant: 'small-caps' }}
                    >
                        grande price
                    </label>
                    <input
                        id="Grande"
                        type="number"
                        name="Grande"
                        required
                        value={sizeOptions[1].price || ""}
                        onChange={(e) => {
                            updateSizeOptions(e, "Grande");
                            handleSaved(e, "grandePrice")
                        }}
                    />
                </div>
                <div>
                    <label 
                        htmlFor="Venti"
                        style={{ fontVariant: 'small-caps' }}
                    >
                        venti price
                    </label>
                    <input
                        id="coffee-price"
                        type="number"
                        name="Venti"
                        required
                        value={sizeOptions[2].price || ""}
                        onChange={(e) => {
                            updateSizeOptions(e, "Venti");
                            handleSaved(e, "ventiPrice")
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CoffeePrice
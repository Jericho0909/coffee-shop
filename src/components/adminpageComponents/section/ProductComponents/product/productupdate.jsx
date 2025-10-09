import { useContext, useState } from "react"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext"
import FirebaseActionContext from "../../../../../context/firebaseactionContext"
import ModalContext from "../../../../../context/modalContext"
import ImageContext from "../../../../../context/imageContext"
import AddHighlightContext from "../../../../../context/addhighlightContext"
import Form from "./form"
import showToast from "../../../../../utils/showToast"

const ProductUpdate = () => {
    const { productList } = useContext(FirebaseFetchDataContext)
    const { updateAction } = useContext(FirebaseActionContext)
    const { toggleModal } = useContext(ModalContext)
    const { setPreview  } = useContext(ImageContext)
    const { highlightUpdated } = useContext(AddHighlightContext)
    const { Toast } = showToast()
    const [ id,] = useState(sessionStorage.getItem("productId"))
    const product = productList.find(item => item.id === id)

    const selectedProduct = {
        id: id,
        image: product.image,
        name: product.name,
        price: product.price, 
        sizeOptions: product.sizeOptions.map(option => option),
        type: product.type,
        flavors: product.flavors,
        addOns: product.addOns,
        description: product.description,
        category: product.category,
        available: product.available,
        orderCount: 0
    }
    const [ formData, setFormData ] = useState(selectedProduct)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const safeData = {
            ...formData,
            image: formData.image ?? "__empty__",
            flavors: formData.flavors.length > 0 ? formData.flavors : ["__empty__"],
            addOns: formData.addOns.length > 0 ? formData.addOns : ["__empty__"],
        }
        await updateAction("products", product.firebaseKey, safeData)
        setPreview(null)
        sessionStorage.clear()
        toggleModal()
        Toast("success", "Product updated successfully!", 2000)
        highlightUpdated(product.id)
    }
    
    return(
        <form
            className="w-full h-full py-[2rem] px-[0.50rem] overflow-y-scroll scrollbar-hide"
            onSubmit={(e) => handleSubmit(e)}
        >
            <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
                update
            </h1>
            <Form
                defaultFormData={selectedProduct}
                formData={formData}
                setFormData={setFormData}
                formType={"Update"}
            />
        </form>
    )
}
export default ProductUpdate
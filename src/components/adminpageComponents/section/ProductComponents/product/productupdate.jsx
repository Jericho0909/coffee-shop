import { useContext, useState } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ActionContext from "../../../../../context/actionContext"
import ModalContext from "../../../../../context/modalContext"
import ImageContext from "../../../../../context/imageContext"
import AddHighlightContext from "../../../../../context/addhighlightContext"
import Form from "./form"
import toast from "react-hot-toast"
const ProductUpdate = () => {
    const { productList, setProductList } = useContext(FetchDataContext)
    const { patchAction } = useContext(ActionContext)
    const { toggleModal } = useContext(ModalContext)
    const { setPreview  } = useContext(ImageContext)
    const { highlightUpdated } = useContext(AddHighlightContext)
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
        const response = await patchAction("products", product.id, formData)
        setProductList(prev =>
            prev.map(item =>
                item.id === product.id ? response : item
            )
        )
        setPreview(null)
        sessionStorage.clear()
        toggleModal()
        toast.success(
            <div className="Notification">
                Product updated successfully!
            </div>,
            {
                style: {
                width: "100%",
                backgroundColor: "white",
                color: "#8c6244",
                padding: "12px 16px",
                borderRadius: "8px",
                },
                duration: 2000,
            }
        )

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
                formData = {formData}
                setFormData = {setFormData}
            />
        </form>
    )
}
export default ProductUpdate
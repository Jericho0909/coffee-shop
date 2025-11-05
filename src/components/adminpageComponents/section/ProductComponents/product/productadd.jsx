import { useContext, useState } from "react"
import FirebaseActionContext from "../../../../../context/firebaseactionContext"
import ImageContext from "../../../../../context/imageContext"
import ModalContext from "../../../../../context/modalContext"
import Form from "./form"
import { v4 as uuidv4 } from 'uuid'
import showToast from "../../../../../utils/showToast"
const ProductAdd = () => {
    const { pushAction } = useContext(FirebaseActionContext)
    const { preview, setPreview } = useContext(ImageContext)
    const { toggleModal } = useContext(ModalContext)
    const id = uuidv4()
    const { Toast } = showToast()

    const defaultFormData = {
        id: id,
        image: preview,
        name: "",
        price: 0, 
        sizeOptions: [
            { size: "Tall", price: 0},
            { size: "Grande", price: 0},
            { size: "Venti", price: 0}
        ],
        type: "",
        flavors: [],
        addOns: [],
        description: "",
        category: "",
        available: true,
        orderCount: 0
    }
    const [ formData, setFormData ] = useState(defaultFormData)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const safeData = {
            ...formData,
            image: formData.image ?? "__empty__",
            flavors: formData.flavors.length > 0 ? formData.flavors : ["__empty__"],
            addOns: formData.addOns.length > 0 ? formData.addOns : ["__empty__"],
        }
        await pushAction("products", safeData)
        sessionStorage.clear()
        setFormData(defaultFormData)
        setPreview(null)
        toggleModal()
        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
            })
        }, 0)
        Toast("success", "☕ Coffee added successfully!", 2000)
    }


    return(
        <form 
            className="w-full h-full py-[2rem] px-[0.50rem] overflow-y-scroll scrollbar-hide"
            onSubmit={(e) => handleSubmit(e)}
        >   
            <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem]">
                add
            </h1>
            <Form
                defaultFormData={defaultFormData}
                formData={formData}
                setFormData={setFormData}
                formType={"AddProduct"}
            />
        </form>
    )
}

export default ProductAdd
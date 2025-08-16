import { useContext, useState } from "react"
import ActionContext from "../../../../../context/actionContext"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ImageContext from "../../../../../context/imageContext"
import ModalContext from "../../../../../context/modalContext"
import ContainerContext from "../../../../../context/containerContext"
import Form from "./form"
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid'
const ProductAdd = () => {
        const { addAction } = useContext(ActionContext)
        const { setProductList } = useContext(FetchDataContext)
        const { preview } = useContext(ImageContext)
        const { toggleModal } = useContext(ModalContext)
        const { container } = useContext(ContainerContext)
        const id = uuidv4()

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
        const response = await addAction("products", formData)
        setProductList(prev => ([...prev, response]))
        sessionStorage.clear()
        setFormData(defaultFormData)
        toggleModal()
        setTimeout(() => {
            const productContainer = container.current;
            if (productContainer) {
                productContainer.scrollTop = productContainer.scrollHeight;
            }
        },0);

        toast.success(
            <div className="Notification">
                ☕ Coffee added successfully!
            </div>,
            {
                style: {
                    width: '100%',
                    backgroundColor: 'white',
                    color: '#8c6244',
                    padding: '12px 16px',
                    borderRadius: '8px',
                },
                duration: 2000,
            }
        );

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
                formData = {formData}
                setFormData = {setFormData}
            />
        </form>
    )
}

export default ProductAdd
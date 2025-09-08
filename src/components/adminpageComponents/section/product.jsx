import { useContext, useState, useEffect} from "react"
import ModalContext from "../../../context/modalContext"
import ContainerContext from "../../../context/containerContext"
import ProductList from "./ProductComponents/product/productlist"
import Loading from "../../loading"
const Products = () => {
    const { toggleModal, setModalName } = useContext(ModalContext)
    const { container } = useContext(ContainerContext)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])
    
    if(loading){
        return(
            <Loading/>
        )
    }

    const openModal = () => {
        setModalName("addProuct")
        toggleModal()
    }

    return(
        <section className="flex justify-center">
            <div 
                className="container flex justify-start items-center flex-col w-full p-2"
            >
                <div className="flex justify-between w-full h-auto my-1 p-1">
                    <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                        product
                    </h1>
                    <button
                        onClick={() => openModal()}
                        className="press w-auto"
                    >
                        add product
                    </button>
                </div>
                <div 
                    ref={container}
                    className="w-full flex-1 overflow-y-auto scrollbar-hide"
                >
                    <ProductList/>
                </div>
            </div>
        </section>
    )
}

export default Products
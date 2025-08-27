import { useContext, useState, useEffect} from "react"
import ModalContext from "../../../context/modalContext"
import ProductList from "./ProductComponents/product/productlist"
import Loading from "../../loading"
const Products = () => {
    const { toggleModal, setModalName } = useContext(ModalContext)
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
        <section>
            <div className="bg-[#f9f5f1] border border-[#8c6244] rounded-xl shadow-md sm:p-[0.90rem] md:p-[1.10rem] lg:p-[1.30rem] xl:p-[1.50rem] w-full">
                <div className="flex justify-between w-auto h-auto my-1 p-1">
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
                <div className="w-full h-auto p-1 ">
                    <ProductList/>
                </div>
            </div>
        </section>
    )
}

export default Products
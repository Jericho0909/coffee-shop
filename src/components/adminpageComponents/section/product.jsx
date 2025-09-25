import { useContext, useState, useEffect} from "react"
import SectionHeder from "../../sectionheader"
import ModalContext from "../../../context/modalContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import ContainerContext from "../../../context/containerContext"
import ProductList from "./ProductComponents/product/productlist"
import Loading from "../../loading"
const Products = () => {
    const { toggleModal, setModalName } = useContext(ModalContext)
    const { setKey, setUrl } = useContext(SearchContext)
    const { setKeyList } = useContext(SuggestionContext)
    const { container } = useContext(ContainerContext)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => { 
        setKey("productList") 
        setUrl("http://localhost:3500/products") 
        setKeyList("productlist") 
    }, [setKey, setUrl, setKeyList])
    
    if(loading){
        return(
            <Loading/>
        )
    }

    const openModal = () => {
        setModalName("addProuct")
        toggleModal()
    }

    const AddProductBtn = () => {
        return(
            <button 
            onClick={() => openModal()} className="press w-auto" > 
                add product 
            </button> 
        )
    }


    return(
        <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-screen">
            <SectionHeder 
                title="products" 
                haveExtraBtn={true}
                btnContent={<AddProductBtn/>}
            />
            <div 
                ref={container}
                className="w-full flex-1"
            >
                <ProductList/>
            </div>
        </section>
    )
}

export default Products
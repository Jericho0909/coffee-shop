import { useContext, useState, useEffect} from "react"
import SectionHeder from "../../sectionheader"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import ModalContext from "../../../context/modalContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import ContainerContext from "../../../context/containerContext"
import ProductList from "./ProductComponents/product/productlist"
import Loading from "../../loading"
const Products = () => {
    const { productList } = useContext(FirebaseFetchDataContext)
    const { toggleModal, setModalName } = useContext(ModalContext)
    const { setKey,
        setSetter,
        setValue,
        itemList,
        setItemList,
        hasResult
    } = useContext(SearchContext)
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
        setItemList([])
        setKey("productList")
        setSetter("products")
        setValue("name")
        setKeyList("productlist")
    }, [setKey, setSetter, setValue, setKeyList, setItemList])

    const openModal = () => {
        setModalName("addProuct")
        toggleModal()
    }

    const AddProductBtn = () => {
        return(
            <button 
            onClick={() => openModal()} 
            className="press hoverable:hover:bg-[#8b5e3c] 
            hoverable:hover:scale-105 
            hoverable:hover:shadow-[0_4px_12px_rgba(111,78,55,0.4)] w-auto"> 
                add product 
            </button> 
        )
    }

    if(loading){
        return(
            <Loading/>
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
                <ProductList 
                    productList={productList}
                    itemList ={itemList}
                    hasResult ={hasResult}
                />
            </div>
        </section>
    )
}

export default Products
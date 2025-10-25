import { useState, useEffect, useContext } from "react"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import ModalContext from "../../../context/modalContext"
import ContainerContext from "../../../context/containerContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import SectionHeder from "../../sectionheader"
import Loading from "../../loading"
import StockList from "./StockComponents/stocks/stockList"
const Stocks = () => {
    const { stockList } = useContext(FirebaseFetchDataContext)
    const { toggleModal, setModalName } = useContext(ModalContext)
    const { container } = useContext(ContainerContext)
    const { setKey,
        setSetter,
        setValue,
        itemList,
        setItemList,
        hasResult
    } = useContext(SearchContext)
    const { setKeyList } = useContext(SuggestionContext)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        },2000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        setItemList([])
        setKey("stockList")
        setSetter("stocks")
        setValue("name")
        setKeyList("stocklist")
    }, [setKey, setSetter, setValue, setKeyList, setItemList])

    const openModal = () => {
        setModalName("addStock")
        toggleModal()
    }

    const AddStockBtn = () => {
        return (
            <button
                className="press  hoverable:hover:bg-[#8b5e3c] 
                hoverable:hover:scale-105 
                hoverable:hover:shadow-[0_4px_12px_rgba(111,78,55,0.4)] w-auto"
                onClick={() => {openModal()}}
            >
                add stocks
            </button>
        )
    }

    const getDisplayList = () => itemList?.length > 0 
        ? itemList 
        : stockList

    if(loading){
        return(
            <Loading/>
        )
    }
    return(
        <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-screen">
            <SectionHeder
                title="stocks" 
                haveExtraBtn={true}
                btnContent={<AddStockBtn/>}
            />
            {(hasResult && stockList.length !== 0)
                ? (
                    <div 
                        ref={container}
                        className="w-full flex-1"
                    >
                        <StockList
                            getDisplayList = {getDisplayList()}
                        />
                    </div>
                )
                : (
                    <div className="container-flex justify-center w-full h-[90%] p-1 mb-0">
                        Add Stock
                    </div>
                )
            }
        </section>
    )
}

export default Stocks
import { useState, useEffect, useContext } from "react"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import ContainerContext from "../../../context/containerContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import SectionHeder from "../../sectionheader"
import Loading from "../../loading"
import CustomerTable from "./CustomerCompoments/customer/customertable"
const Customers = () => {
    const { customerList } = useContext(FirebaseFetchDataContext)
    const { container } = useContext(ContainerContext)
    const [ loading, setLoading ] = useState(true)
    const { setKey,
        setSetter,
        setValue,
        itemList,
        setItemList,
        hasResult
    } = useContext(SearchContext)
    const { setKeyList } = useContext(SuggestionContext)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    },[])

    useEffect(() => {
        setItemList([])
        setKey("customerList")
        setSetter("customers")
        setValue("username")
        setKeyList("customerlist")
    }, [setKey, setSetter, setValue,  setKeyList, setItemList])

    const getDisplayOnTable = () => itemList?.length > 0 
        ? [...itemList].reverse() 
        : [...customerList].reverse()


    if(loading){
        return(
            <Loading/>
        )
    }
    
    return(
        <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-screen">
            <SectionHeder 
                title="products" 
                haveExtraBtn={false}
            />
            {(hasResult && customerList.length !== 0) 
                ? (
                    <div 
                        ref={container}
                        className="w-full flex-1"
                    >
                        <CustomerTable
                            getDisplayOnTable = {getDisplayOnTable()}
                        />
                    </div>
                )
                : (
                    <div className="container-flex justify-center w-full h-[90%] p-1 mb-0">
                        No Customers
                    </div>
                )
            }
        </section>
    )
}

export default Customers
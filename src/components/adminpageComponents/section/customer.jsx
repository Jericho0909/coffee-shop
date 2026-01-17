import { useState, useEffect, useContext } from "react"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import SectionHeder from "../../sectionheader"
import Loading from "../../loading"
import CustomerTable from "./CustomerCompoments/customer/customertable"
const Customers = () => {
    const { customerList } = useContext(FirebaseFetchDataContext)
    const [ loading, setLoading ] = useState(true)
    const { setSetter,
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
        setSetter("customers")
        setValue("username")
        setKeyList("customerlist")
    }, [setSetter, setValue,  setKeyList, setItemList])

    const getDisplayOnTable = () => itemList?.length > 0 
        ? [...itemList].reverse() 
        : [...customerList].reverse()


    if(loading){
        return(
            <Loading/>
        )
    }
    
    return(
        <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-[70svh]">
            <SectionHeder 
                title="customers" 
                haveExtraBtn={false}
            />
            {(hasResult && customerList.length !== 0) 
                ? (
                    <div 
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
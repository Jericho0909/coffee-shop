import { useState, useEffect, useContext } from "react"
import FetchDataContext from "../../../context/fetchdataContext"
import ContainerContext from "../../../context/containerContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import SectionHeder from "../../sectionheader"
import Loading from "../../loading"
import CustomerTable from "./CustomerCompoments/customer/customertable"
const Customers = () => {
    const { customerList } = useContext(FetchDataContext)
    const { container } = useContext(ContainerContext)
    const [ loading, setLoading ] = useState(true)
    const { setKey, setUrl } = useContext(SearchContext)
    const { setKeyList } = useContext(SuggestionContext)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    })

    useEffect(() => {
        setKey("customerList")
        setUrl("http://localhost:3500/customers")
        setKeyList("customerlist")
    }, [setKey, setUrl, setKeyList])


    if(loading){
        return(
            <Loading/>
        )
    }
    
    return(
        <section className="flex justify-center">
            <div 
                className="container flex justify-start items-center flex-col w-full p-2"
            >
                <SectionHeder 
                    title="products" 
                    haveExtraBtn={false}
                />
                {customerList.length !== 0 
                    ? (
                        <div 
                            ref={container}
                            className="w-full flex-1 px-1 overflow-y-auto scrollbar-hide"
                        >
                            <CustomerTable
                                customerList={[...customerList].reverse()}
                            />
                        </div>
                    )
                    : (
                        <div className="container-flex justify-center w-full h-[90%] p-1 mb-0">
                            No Customers
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default Customers
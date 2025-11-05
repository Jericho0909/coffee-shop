import { useContext, useState, useEffect } from "react"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import ModalContext from "../../../context/modalContext"
import EmployerTable from "./EmployerComponents/Employer/employertable"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import SectionHeder from "../../sectionheader"
import Loading from "../../loading"
const Employers = () => {
    const { employerList } = useContext(FirebaseFetchDataContext)
    const { toggleModal, setModalName } = useContext(ModalContext)
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
        setKey("employerList")
        setSetter("employers")
        setValue("name")
        setKeyList("employerlist")
    }, [setKey, setSetter, setValue, setKeyList, setItemList])

    const openModal = () => {
        setModalName("addEmployer")
        toggleModal()
    }

    const AddEmployerBtn = () => {
        return (
            <button
                className="press  hoverable:hover:bg-[#8b5e3c] 
                hoverable:hover:scale-105 
                hoverable:hover:shadow-[0_4px_12px_rgba(111,78,55,0.4)] w-auto"
                onClick={() => {openModal()}}
            >
                add employer
            </button>
        )
    }

    const getDisplayOnTable = () => itemList?.length > 0 
        ? [...itemList].reverse() 
        : [...employerList].reverse()

    if(loading){
        return(
            <Loading/>
        )
    }

    return(
        <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-[70svh]">
            <SectionHeder 
                    title="employers" 
                    haveExtraBtn={true}
                    btnContent={<AddEmployerBtn/>}
                />
                {(hasResult &&  employerList.length !== 0) 
                    ? (
                        <div 
                            className="w-full flex-1"
                        >
                            <EmployerTable
                                getDisplayOnTable={getDisplayOnTable()}
                            />
                        </div>
                    )
                    : (
                        <div className="container-flex justify-center w-full h-[90%] p-1 mb-0">
                            No Employers
                        </div>
                    )
                }
        </section>
    )
}

export default Employers
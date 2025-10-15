import { useEffect, useState, useContext, useRef } from "react"
import FirebaseFetchDataContext from "../../../context/firebasefetchdataContext"
import CustomerorderContext from "../../../context/customerorderContext"
import ModalContext from "../../../context/modalContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import MenuList from "./menuComponents/menu/menulist"
import CoffeeCupIcon from "../../../assets/icons/coffee-icon3.png"
import Loading from "../../loading"
import SectionHeder from "../../sectionheader"
const Menu = () => {
    const { productList } = useContext(FirebaseFetchDataContext)
    const { customerOrders } = useContext(CustomerorderContext)
    const { setKey,
        setSetter,
        setValue,
        itemList,
        setItemList,
        hasResult
    } = useContext(SearchContext)
    const { setKeyList } = useContext(SuggestionContext)
    const { setIsOpen, setModalName } = useContext(ModalContext)
    const [ loading, setLoading ] = useState(true)
    const bounceRef = useRef(null)

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

    useEffect(() => {
        bounce()
    }, [customerOrders])

    const orderList = () => {
        setModalName("customerorder")
        setIsOpen(true)
    }

    const bounce = () => {
        const container = bounceRef.current
        if(container){
            container.classList.add("bounce")

            setTimeout(() => {
                container.classList.remove("bounce")
            }, 1500)
        }
    }
    
    if(loading){
        return(
            <Loading/>
        )
    }
    return (
        <section className="container-flex justify-start items-center flex-col w-full p-2 mb-0 min-h-screen">
            <SectionHeder 
                title="products" 
                haveExtraBtn={false}
            />
            <div className="fixed top-[12rem] right-[1.50rem] z-10">
                <button 
                    ref={bounceRef}
                    className="container-flex justify-center w-12 h-12 p-1 mb-0 cursor-pointer relative transition-transform duration-300  hoverable:hover:scale-125"
                    onClick={() => orderList()}
                    
                >
                    <img
                        src={CoffeeCupIcon}
                        className="w-[95%] h-[95%]"
                        alt="CoffeeCup-Icon"
                        loading="lazy"
                    />
                    <span className="absolute -top-2 right-1 font-opensans font-semibold border border-[#6F4E37] w-[1.45rem] rounded-[50%]">
                        {customerOrders.length !== 0
                            ? customerOrders.length
                            : "0"
                        }
                    </span>
                </button>
            </div>
            <div 
                className="w-full flex-1"
            >
                <MenuList 
                    productList={productList}
                    itemList ={itemList}
                    hasResult ={hasResult}
                />
            </div>
        </section>
    )
}

export default Menu

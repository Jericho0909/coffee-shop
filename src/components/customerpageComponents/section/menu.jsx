import { useEffect, useState, useContext, useRef } from "react"
import CustomerorderContext from "../../../context/customerorderContext"
import ModalContext from "../../../context/modalContext"
import SearchContext from "../../../context/searchContext"
import SuggestionContext from "../../../context/suggestionContext"
import MenuList from "./menuComponents/menu/menulist"
import CoffeeCupIcon from "../../../assets/icons/coffee-icon3.png"
import Loading from "../../loading"
import SectionHeder from "../../sectionheader"
const Menu = () => {
    const { customerOrders } = useContext(CustomerorderContext)
    const { setKey, setUrl } = useContext(SearchContext)
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
        setKey("productList") 
        setUrl("http://localhost:3500/products") 
        setKeyList("productlist") 
    }, [setKey, setUrl, setKeyList])

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

    const CartBtn = () => {
        return(
            <button 
                ref={bounceRef}
                className="container-flex justify-center w-12 h-12 p-1 mb-0 cursor-pointer"
                onClick={() => orderList()}
                
            >
                <img
                    src={CoffeeCupIcon}
                    className="w-[80%] h-[80%]"
                    alt="CoffeeCup-Icon"
                    loading="lazy"
                />
            </button>
        )
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
                haveExtraBtn={true}
                btnContent={<CartBtn/>}
            />
           <div 
                className="w-full flex-1"
            >
                <MenuList/>
            </div>
        </section>
    )
}

export default Menu

import { useEffect, useState, useContext, useRef } from "react"
import CustomerorderContext from "../../../context/customerorderContext"
import ModalContext from "../../../context/modalContext"
import MenuList from "./menuComponents/menu/menulist"
import CoffeeCupIcon from "../../../assets/icons/coffee-icon3.png"
import Loading from "../../loading"
const Menu = () => {
    const { customerOrders } = useContext(CustomerorderContext)
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
        <section className="container flex justify-center items-center flex-col p-2">
            <div className="w-full h-auto p-2">
                <div className="container-flex justify-between w-full h-auto mb-1">
                    <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start p-1">
                        menu
                    </h1>
                    <div 
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
                    </div>
                </div>
            </div>
           <div 
                className="w-full flex-1 overflow-y-auto scrollbar-hide"
            >
                <MenuList/>
            </div>
        </section>
    )
}

export default Menu

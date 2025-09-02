import MenuList from "./menuComponents/menu/menulist"
import CoffeeCupIcon from "../../../assets/icons/coffee-icon3.png"

const Menu = () => {

    return (
        <div className="container flex justify-center items-center flex-col w-full h-full p-2">
            <div className="w-full h-auto p-3">
                <div className="container-flex justify-end w-full h-auto mb-1">
                    <div className="w-10 h-10">
                        <img
                            src={CoffeeCupIcon}
                            className="w-full h-full"
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
        </div>
    )
}

export default Menu

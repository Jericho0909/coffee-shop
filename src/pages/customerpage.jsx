import { useContext, useState, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import Notification from "../components/notification"
import MediaQueryContext from "../context/mediaqueryContext"
import WindowSizeContext from "../context/windowsizeContext";
import ModalContext from "../context/modalContext";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Header from "../components/header";
import Aside from "../components/aside";
import Main from "../components/customerpageComponents/main";
import Modal from "../components/modal";
import PlaceOrderModal from "../components/customerpageComponents/section/menuComponents/menuModal/placeordermodal";
import ContactForm from "../components/customerpageComponents/contactform";
const Customerpage = () => {
    const navigate = useNavigate()
    const { id, username } = useParams()
    const { isMobile: mediaQueryMobile, isMediumDevice, isLargeDevice } = useContext(MediaQueryContext)
    const { isMobile: windowSizeMobile } = useContext(WindowSizeContext)
    const { isOpen, modalName } = useContext(ModalContext)
    const [ opensidebar, setOpenSiderBar ] = useState(false)
    const sidebarRef = useRef(null)
    const onToggleSidebar = () => {
        setTimeout(() => setOpenSiderBar(prev => !prev))
    }
   

    const rightChildren = () => {
        return(
            <>
                { (mediaQueryMobile || isMediumDevice || isLargeDevice) && (
                    <button
                        onClick={() => onToggleSidebar()}
                    >
                        <Bars3Icon className="w-6 h-6 text-white"/>
                    </button>
                )}
            </>
        )
    }

    const asideRightChildren = () => {
        return(
            <ul className="flex-col">
                 <li>
                    <NavLink 
                        to={`/Customerpage/${id}/${username}/Menu`} 
                        onClick={onToggleSidebar}
                        className="relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full"
                    >
                    
                        menu
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Customerpage/${id}/${username}/History`} 
                        onClick={onToggleSidebar}
                        className="relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full"
                    >
                    
                        history
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Customerpage/${id}/${username}/Settings`} 
                        onClick={onToggleSidebar}
                        className="relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        setting
                    </NavLink>
                </li>
                <li>
                    <button
                    className="bg-black text-white px-6 py-2 rounded-md mt-3 
                    hover:bg-[#734d35] hover:scale-105 
                    active:scale-95 active:shadow-none
                    transition-all duration-300 ease-in-out shadow-md"
                        style={{ fontVariant: "small-caps" }}
                        onClick={Logout}
                    >
                        logout
                    </button>
                </li>
            </ul>
        )
    }

    const modalComponents = {
        contactform: <ContactForm/>,
        placeorder: <PlaceOrderModal/>
    }


    const Logout = () => {
        navigate("/");
    }


    return (
        <div className="flex flex-col">
            <Notification/>
            <Header
                style={{}}
                title = "kape na"
                children = {rightChildren}
            />
            <div className="flex w-full">
                {windowSizeMobile 
                    ? (
                        <aside
                            ref={sidebarRef}
                            onClick={(e) => e.stopPropagation()}
                            className={`fixed top-[5rem] left-0 w-full md:w-[40%] h-full bg-[#f9f5f1] border border-[#8c6244] shadow-md z-50 transform transition-transform duration-300 ease-in-out
                            ${opensidebar ? "translate-x-0" : "-translate-x-full"}`}
                        >
                            <Aside
                                children = {asideRightChildren}
                            />
                        </aside>
                    )
                    : (
                        <aside
                            ref={sidebarRef}
                            className="w-auto h-[89vh] bg-[#f9f5f1] border border-[#8c6244] shadow-md mt- p-1 mr-1"
                        >
                            <Aside
                                children = {asideRightChildren}
                            />
                        </aside>
                    )
                }
                {(isOpen) && (
                    <Modal>
                        {modalComponents[modalName]}
                    </Modal>
                )}
                <Main/>
                
            </div>

        </div>
    )
}

export default Customerpage
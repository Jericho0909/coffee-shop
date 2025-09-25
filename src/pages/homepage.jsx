import { useContext, useState, useEffect, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MediaQueryContext from "../context/mediaqueryContext";
import SectionContext from "../context/sectionContext";
import Navbar from "../components/navbar";
import Header from "../components/header";
import Main from "../components/homepageComponents/main";
import Footer from "../components/homepageComponents/footer";
import Login from "../components/homepageComponents/auth/login";
import Signup from "../components/homepageComponents/auth/signup";
import Forgot from "../components/homepageComponents/auth/forgotpass";
import Notification from "../components/notification";
import Modal from "../components/modal";
import ModalContext from "../context/modalContext";
import AuthviewContext from "../context/autviewContext";
import Modalicon from "../assets/icons/coffee-icon2.png"

const Homepage = () => {
    const { isOpen } = useContext(ModalContext)
    const { authView } = useContext(AuthviewContext)
    const [ delay, setDelay ] = useState(true)
    const { isMobile } = useContext(MediaQueryContext)
    const { activeSection } = useContext(SectionContext)
    const [ IsOpen, setIsOpen ] = useState(false);
    const buttonRef = useRef(null);
    const toggleNavbar = () => setIsOpen(prev => !prev);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelay(false);
        }, 800)

        return () => clearTimeout(timer)
    },[])

    useEffect(() => {
        const handleClickAnywhere = (event) => {
            if ( buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("click", handleClickAnywhere);

        return () => {
            document.removeEventListener("click", handleClickAnywhere);
        };
    }, []);

    const setView = {
        login : <Login/>,
        signup: <Signup/>,
        forgot: <Forgot/>
    }

    const RightContent = () => {
        return(
            <>
                {isMobile ? (
                    <>
                        <button
                            ref={buttonRef}
                            onClick={toggleNavbar}
                            className="text-sm px-4 py-2 bg-gray-200 rounded cursor-pointer"
                        >
                            <Bars3Icon className="w-6 h-6 text-gray-700" />
                        </button>
                        {IsOpen && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-[#8c6244] border rounded shadow z-10">
                            <Navbar activeSection={activeSection}/>
                        </div>
                        )}
                    </>
                    ) : (
                        <Navbar activeSection={activeSection}/>
                    )
                }
            </>
        )
    }

    if(delay) return
    return (
        <>
            <Notification/>
            { isOpen && (
            <Modal>
                <div className="w-[20%] h-auto">
                    <img 
                        src={Modalicon}
                        alt="Coffe"
                        className="w-full h-full m-1 p1"
                        loading="lazy"
                    />
                </div>
                {setView[authView]}
                
            </Modal>
            )}
            <Header
                title="kape shop"
                rightContent={<RightContent/>}
            />
            <Main/>
            <Footer/>
        </>
    )
};

export default Homepage;

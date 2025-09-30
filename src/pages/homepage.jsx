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
import { AnimatePresence } from "framer-motion";

const Homepage = () => {
    const { isOpen } = useContext(ModalContext)
    const { authView } = useContext(AuthviewContext)
    const [ delay, setDelay ] = useState(true)
    const { isMobile } = useContext(MediaQueryContext)
    const { activeSection } = useContext(SectionContext)
    const [ IsOpen, setIsOpen ] = useState(false);
    const containerRef = useRef(null);
    const toggleNavbar = () => setIsOpen(prev => !prev)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelay(false);
        }, 800)

        return () => clearTimeout(timer)
    },[])

    useEffect(() => {
        const handleClickAnywhere = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsOpen(false)
            }
        };

        document.addEventListener("mousedown", handleClickAnywhere)
        return () => {
            document.removeEventListener("mousedown", handleClickAnywhere)
        }
    }, [])

    const setView = {
        login : <Login/>,
        signup: <Signup/>,
        forgot: <Forgot/>
    }

    const RightContent = () => {
        return(
            <>
                {isMobile ? (
                    <div ref={containerRef} className="relative">
                        <button
                        onClick={toggleNavbar}
                        className="text-sm px-4 py-2 bg-gray-200 rounded cursor-pointer"
                        >
                        <Bars3Icon className="w-6 h-6 text-gray-700" />
                        </button>

                        {IsOpen && (
                        <div className="absolute top-full right-0 mt-2 w-[10rem] bg-[#8c6244] border rounded shadow z-10 p-1">
                            <Navbar 
                                activeSection={activeSection}
                                toggleNavbar = {toggleNavbar}
                            />
                        </div>
                        )}
                    </div>
                    ) : (
                        <Navbar 
                            activeSection={activeSection}
                            toggleNavbar = {toggleNavbar}
                        />
                    )
                }
            </>
        )
    }

    if(delay) return
    return (
        <div>
            <Notification/>
            <AnimatePresence>
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
            </AnimatePresence>
            <Header
                title="kape shop"
                rightContent={<RightContent/>}
            />
            <Main/>
            <Footer/>
        </div>
    )
};

export default Homepage;

import { useContext, useState, useEffect, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MediaQueryContext from "../../context/mediaqueryContext";
import Navbar from "../navbar";
import SectionContext from "../../context/sectionContext";
import  CoffeeIcon from "../../assets/icons/coffee-icon.png" 
const Header = () => {
    const { isMobile } = useContext(MediaQueryContext)
    const { activeSection } = useContext(SectionContext)
    const [ isOpen, setIsOpen ] = useState(false);
    const buttonRef = useRef(null);
    const toggleNavbar = () => setIsOpen(prev => !prev);

    

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

    return (
        <header 
            className="bg-[#8c6244] w-full h-[5.20rem] p-[clamp(0.20rem,1vw,0.30rem)] fixed top-0 border border-black z-10"
        >
            <div className="left">
                <div className="w-[4.90rem] sm:w-[5.30rem] md:w-[5.90rem] lg:w-[6rem] xl:w-[6.20rem] h-auto">
                    <img 
                        className="w-full h-full"
                        src={CoffeeIcon} 
                        alt="Coffee-Shop" 
                    />
                </div>
                <div className="w-full m-1 p-1 text-[clamp(1rem,2vw,1.50rem)] text-white font-bold">
                    kape shop
                </div>
            </div>
            <div className="right">
                {isMobile ? (
                    <>
                        <button
                        ref={buttonRef}
                        onClick={toggleNavbar}
                        className="text-sm px-4 py-2 bg-gray-200 rounded cursor-pointer"
                        >
                            <Bars3Icon className="w-6 h-6 text-gray-700" />
                        </button>
                        {isOpen && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-[#8c6244] border rounded shadow ">
                            <Navbar activeSection={activeSection}/>
                        </div>
                        )}
                    </>
                ) : (
            <Navbar activeSection={activeSection}/>
            )}
            </div>
        </header>

    )
}

export default Header


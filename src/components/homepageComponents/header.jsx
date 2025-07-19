import { useContext, useState, useEffect, useRef } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import MediaQueryContext from "../../context/mediaquery";
import Navbar from "../navbar";
import SectionContext from "../../context/sectionContext";
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
            className="flex justify-between items-center bg-[#8c6244] w-full gap-2 py-1 px-3 fixed top-0 border border-black z-10"
        >
            <div className="left text-xs">
                <div className="w-[11%] h-auto">
                    <img src="/icons/coffee-icon.png" alt="Coffee-Shop" />
                </div>
                <div className="m-1 p-1 text-[clamp(1rem,2vw,2rem)] text-white font-bold">
                    Kape Shop
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
                        <div className="absolute top-full right-0 mt-2 w-40 bg-white border rounded shadow ">
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


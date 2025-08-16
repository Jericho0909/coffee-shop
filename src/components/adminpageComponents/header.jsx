import { useContext } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import WindowSizeContext from "../../context/windowsizeContext";
const Header = ({ setOpenSiderBar }) => {
    const { isMobile } = useContext(WindowSizeContext)
    const onToggleSidebar = () => setOpenSiderBar(prev => !prev)
    
    return(
        <header 
            className="bg-[#8c6244] w-full h-[5.20rem] p-[clamp(0.20rem,1vw,0.30rem)] fixed top-0 border border-black z-10"
        >
            <div className="left w-full m-1 p-1 text-[clamp(1rem,2vw,1.50rem)] text-white font-bold">
                admin
            </div>
            <div className="right">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleSidebar()
                    }}
                >
                    {!isMobile 
                        ? (
                           null
                    ) : (
                         <Bars3Icon className="w-6 h-6 text-white" />
                    )}
                </button>
            </div>
        </header>
    )
}

export default Header
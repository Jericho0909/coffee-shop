import { useContext } from "react"
import MediaQueryContext from "../context/mediaqueryContext";
import ModalContext from "../context/modalContext";
import CoffeeTooltip from "./tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser }  from '@fortawesome/free-solid-svg-icons';
const Navbar = ({ activeSection, toggleNavbar }) => {
    const { isMobile } = useContext(MediaQueryContext)
    const { toggleModal } = useContext(ModalContext)
    const scrollToSection = (id) => {
        const sectionId = document.getElementById(id)
        if (sectionId) {
            sectionId.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }

    return(
        <nav className="container-flex justify-center mb-0">
            <ul className={`container-flex justify-center w-full h-auto mb-0 gap-1 ${isMobile ? "flex-col" : " flex-row"}`}>
                <li>
                    <CoffeeTooltip text="login" side="bottom" align="center">
                        <button 
                        className="flex justify-center items-center w-10 h-10 rounded-full border border-white p-2"
                        onClick={() => toggleModal()}
                        >
                            <FontAwesomeIcon 
                                icon={faUser}
                                className="w-4 h-4 text-white"
                            /> 
                        </button>
                    </CoffeeTooltip>
                </li>
                <li 
                    className={`cursor-pointer px-2 py-1 rounded-full transition duration-300 
                    ${activeSection === "home" 
                        ? "bg-white text-[#6F4E37]" 
                        : "text-white"
                    } 
                    hover:bg-white hover:text-[#6F4E37]`}
                    onClick={() => {
                            scrollToSection("home");
                            toggleNavbar()
                        }
                    }
                >
                    home
                </li>
                <li 
                    className={`cursor-pointer px-3 py-1 rounded-full transition duration-300 
                    ${activeSection === "about" 
                        ? "bg-white text-[#6F4E37]" 
                        : "text-white"
                    } 
                    hover:bg-white hover:text-[#6F4E37]`}
                    onClick={() => {
                            scrollToSection("about");
                            toggleNavbar()
                        }
                    }
                >
                    about
                </li>
                <li 
                    className={`cursor-pointer px-3 py-1 rounded-full transition duration-300 
                    ${activeSection === "contact" 
                        ? "bg-white text-[#6F4E37]" 
                        : "text-white"
                    } 
                    hover:bg-white hover:text-[#6F4E37]`}
                    onClick={() => {
                            scrollToSection("contact");
                            toggleNavbar()
                        }
                    }
                >
                    contact
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
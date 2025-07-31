import { useContext } from "react"
import MediaQueryContext from "../context/mediaqueryContext";
import ModalContext from "../context/modalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser }  from '@fortawesome/free-solid-svg-icons';
const Navbar = ({ activeSection }) => {
    const { isMobile } = useContext(MediaQueryContext)
    const { toggleModal } = useContext(ModalContext)
    const scrollToSection = (id) => {
        const sectionId = document.getElementById(id)
        if (sectionId) {
            sectionId.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }

    return(
        <nav>
            <ul className={`${isMobile ? "flex-col" : " flex-row"}`}>
                <li>
                    <button 
                        className="flex justify-center items-center w-10 h-10 rounded-full border border-white p-2"
                        onClick={() => toggleModal()}
                    >
                        <FontAwesomeIcon 
                            icon={faUser}
                            className="w-4 h-4 text-white"
                        /> 
                    </button>
                </li>
                <li 
                    className={`text-hover-coffee ${activeSection === "home" ? "text-white" : ""}`}
                    onClick={() => scrollToSection("home")}
                >
                    home
                </li>
                <li 
                    className={`text-hover-coffee ${activeSection === "about" ? "text-white" : ""}`}
                    onClick={() => scrollToSection("about")}
                >
                    about
                </li>
                <li 
                    className={`text-hover-coffee ${activeSection === "contact" ? "text-white" : ""}`}
                    onClick={() => scrollToSection("contact")}
                >
                    contact
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
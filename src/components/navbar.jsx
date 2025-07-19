import { useContext } from "react"
import MediaQueryContext from "../context/mediaquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser }  from '@fortawesome/free-solid-svg-icons';
const Navbar = ({ activeSection }) => {
    const { isMobile } = useContext(MediaQueryContext)
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
                    <div className="flex justify-center items-center w-10 h-10 rounded-full border border-[#8c6244] p-2">
                        <FontAwesomeIcon 
                            icon={faUser}
                            className="w-4 h-4 text-[#8c6244]"
                        /> 
                    </div>
                </li>
                <li 
                    className={`text-hover-coffee ${activeSection === "home" ? "text-[#6F4E37]" : ""}`}
                    onClick={() => scrollToSection("home")}
                >
                    Home
                </li>
                <li 
                    className={`text-hover-coffee ${activeSection === "about" ? "text-[#6F4E37]" : ""}`}
                    onClick={() => scrollToSection("about")}
                >
                    About
                </li>
                <li 
                    className={`text-hover-coffee ${activeSection === "contact" ? "text-[#6F4E37]" : ""}`}
                    onClick={() => scrollToSection("contact")}
                >
                    Contact
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
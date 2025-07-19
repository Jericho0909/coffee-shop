import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return(
        <footer className="flex justify-between items-center bg-[#8c6244] w-full  gap-2 py-1 px-3">
            <div className="footerDetails">
                tana at magKape
            </div>
            <div className="footerDetails">
                © 2025 Kape Shop. All rights reserved.
            </div>
            <div className="footerDetails flex flex-col justify-center items-center">
                <div className="cotactInfo">
                    <FontAwesomeIcon 
                        icon={faPhoneVolume}
                        className="w-2 h-2 text-black p-2"
                    />
                    <p>
                        09123456789
                    </p>
                </div>
                <div className="cotactInfo">
                    <FontAwesomeIcon 
                        icon={faEnvelope}
                        className="w-2 h-2 text-black p-2"
                    />
                    <p>
                        takape0012@gmail.com
                    </p>
                </div>
                <div className="cotactInfo">
                    <FontAwesomeIcon 
                        icon={faLocationDot} 
                        className="w-2 h-2 text-black p-2"
                    />
                    <p>
                        Bagong Pook Ros. Bat.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
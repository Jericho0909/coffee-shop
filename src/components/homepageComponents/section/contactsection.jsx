import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion"
import useSectionInView from "../../../hooks/useSectionInView";
import SectionContext from "../../../context/sectionContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { toast } from "react-hot-toast";
const Contact = () => {
                
    const { ref, inView } = useSectionInView(0.6);
    const { setActiveSection } = useContext(SectionContext)
    const [ Gmail, setGmail ] = useState("")
    const [ Message, setMessage ] = useState()

    useEffect(() => {
        if(inView){
            setActiveSection("contact")
        }
    },[inView, setActiveSection])

    const handleSubmit = (e) => {
        e.preventDefault()
        setGmail("")
        setMessage("")
        
        toast.success(
            <div className="Notification">
                Successfully Sent
            </div>,
            {
                style: {
                    width: '100%',
                    backgroundColor: 'white',
                    color: '#8c6244',
                    padding: '12px 16px',
                    borderRadius: '8px',
                },
                duration: 2000,
            }
        );
        
    }

    return(
        <motion.section 
            ref={ref}
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            animate={inView
                ? { opacity: 1, y: 0 } 
                : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center mb-2"
        >
            <div className="container w-[95%] sm:w-[90%] md:w-[85%] lg:w-[60%] xl:w-[50%] p-[1rem]">
                <h1 className="text-[clamp(1rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center">
                    CONTACT US
                </h1>
                <form 
                    onSubmit={handleSubmit}
                    className="flex justify-start items-center flex-col mb-4"
                >
                    <div className="w-full h-auto mb-2">
                        <label htmlFor="name">
                            Enter your Gmail:
                        </label>
                        <input
                            id="name"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={Gmail}
                            onChange={(e) => setGmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full h-auto mb-2">
                        <label htmlFor="message">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            placeholder="Type your message here..."
                            required
                            value={Message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-[#8c6244] text-white px-6 py-2 rounded-md mt-3 hover:bg-[#734d35] transition-all duration-300"
                    >
                        Submit
                    </button>
                </form>
                <h1 className="text-[clamp(1rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center">
                    FOLLOW US
                </h1>
                <div className="flex justify-between items-center w-full h-auto p-2">
                <div className="socialLink">
                        <FontAwesomeIcon 
                            icon={faFacebook} 
                            className="w-6 h-6 text-blue-600"
                        />
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            facebook/ta kape
                        </a>
                </div>
                    <div className="socialLink">
                        <FontAwesomeIcon 
                            icon={faInstagram} 
                            className="w-6 h-6 text-pink-500" 
                        />
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            instagram/ta kape
                        </a>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Contact
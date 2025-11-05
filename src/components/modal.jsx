    import { useContext, useEffect, useState } from "react";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faXmark } from '@fortawesome/free-solid-svg-icons';
    import { motion } from "framer-motion";
    import ModalContext from "../context/modalContext";
    import AuthviewContext from "../context/autviewContext";
    import AuthValidationContext from "../context/authvalidationContext";
    import ImageContext from "../context/imageContext";

    const Modal = ({ children }) => {
        const { isOpen, toggleModal } = useContext(ModalContext)
        const { setAuthView } = useContext(AuthviewContext)
        const { clearValidationErrors } = useContext(AuthValidationContext)
        const { setPreview } = useContext(ImageContext)
        const [ isLoading, setIsLoading ] = useState(true)

        useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false)
            }, 200)

            return () => clearTimeout(timer)
        }, [])
        
        useEffect(() => {
            if(isOpen) {
                document.documentElement.style.overflow = "hidden"
                document.body.style.overflow = "hidden"
            } 
            else{
                document.documentElement.style.overflow = ""
                document.body.style.overflow = ""
            }

            return () => {
                document.documentElement.style.overflow = ""
                document.body.style.overflow = ""
            }
        }, [isOpen])

        if(isLoading) return

        return (
            <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center items-center fixed inset-0 z-[50] bg-black/50 w-full h-full min-h-full"
                >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: -50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: -50 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="container flex justify-center items-center flex-col w-full sm:w-[78%] md:w-[80%] lg:w-[80%] xl:w-[46%] h-[90%] sm:h-[70%] md:h-[65%] lg:h-[70%] xl:h-[85%] m-1 sm:m-[2rem] p-1 sm:p-[2rem] relative rounded-none bg-white shadow-lg"
                >
                    <button
                    className="absolute top-3 right-4"
                    onClick={() => {
                        toggleModal();
                        setAuthView("login");
                        clearValidationErrors();
                        setPreview(null)
                    }}
                    >
                        <FontAwesomeIcon icon={faXmark} className="w-7 h-7" />
                    </button>
                    {children}
                </motion.div>
            </motion.div>
        )
    }


    export default Modal;

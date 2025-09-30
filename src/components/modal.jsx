    import { useContext } from "react";
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faXmark } from '@fortawesome/free-solid-svg-icons';
    import { motion } from "framer-motion";
    import ModalContext from "../context/modalContext";
    import AuthviewContext from "../context/autviewContext";
    import AuthValidationContext from "../context/authvalidationContext";

    const Modal = ({ children }) => {
        const { toggleModal } = useContext(ModalContext);
        const { setAuthView } = useContext(AuthviewContext);
        const { clearValidationErrors } = useContext(AuthValidationContext);

        return (
            <motion.div
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center items-center fixed inset-0 z-[50] bg-transparent backdrop-blur-[5px] w-full h-full min-h-full"
                >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: -50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: -50 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="container flex justify-center items-center flex-col w-full sm:w-[78%] md:w-[80%] lg:w-[80%] xl:w-[46%] h-[90%] sm:h-[70%] md:h-[65%] lg:h-[70%] xl:h-[83%] m-1 sm:m-[2rem] p-1 sm:p-[2rem] relative rounded-none bg-white shadow-lg"
                >
                    <button
                    className="absolute top-2 right-4"
                    onClick={() => {
                        toggleModal();
                        setAuthView("login");
                        clearValidationErrors();
                    }}
                    >
                    <FontAwesomeIcon icon={faXmark} className="w-6 h-6" />
                    </button>
                    {children}
                </motion.div>
            </motion.div>
        )
    }


    export default Modal;

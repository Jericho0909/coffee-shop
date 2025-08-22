import { useContext } from "react";
import ModalContext from "../context/modalContext";
import AuthviewContext from "../context/autviewContext";
import AuthValidationContext from "../context/authvalidationContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const Modal = ({children }) => {
    const { isOpen, toggleModal} = useContext(ModalContext)
    const { setAuthView } = useContext(AuthviewContext)
    const { clearValidationErrors } = useContext(AuthValidationContext)

  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center fixed inset-0 z-[50] bg-transparent backdrop-blur-[5px] w-full h-full min-h-full">
        <div 
            className="container flex justify-center items-center flex-col w-full sm:w-[78%] md:w-[80%] lg:w-[50%] xl:w-[46%] h-[90%] sm:h-[70%] md:h-[65%] lg:h-[70%] xl:h-[83%] m-1 sm:m-[2rem] p-1 sm:p-[2rem] relative rounded-none"
        >
            <button 
            className="absolute top-2 right-4" 
            onClick={() => {
                toggleModal();
                setAuthView("login");
                sessionStorage.clear();
                clearValidationErrors()
            }}>
                <FontAwesomeIcon 
                    icon={faXmark}
                    className="w-6 h-6"
                />
            </button>
            {children}  
        </div>
    </div>
  );
};

export default Modal

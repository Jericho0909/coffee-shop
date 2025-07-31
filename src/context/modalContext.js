import { createContext } from "react";
import useModal from "../hooks/useModal";

const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const { isOpen, setIsOpen, toggleModal } = useModal()

    return(
        <ModalContext.Provider
            value={{
                isOpen, 
                setIsOpen, 
                toggleModal
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext
import { createContext } from "react";
import useModal from "../hooks/useModal";

const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const { isOpen, setIsOpen, toggleModal, modalName, setModalName } = useModal()

    return(
        <ModalContext.Provider
            value={{
                isOpen, 
                setIsOpen, 
                toggleModal,
                modalName,
                setModalName
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext
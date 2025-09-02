import { useState } from "react"
const useModal = () => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ modalName, setModalName ] = useState("")
    const toggleModal = () => setIsOpen(prev => !prev)
    
    return {
        isOpen,
        setIsOpen,
        toggleModal,
        modalName,
        setModalName
    }

}

export default useModal
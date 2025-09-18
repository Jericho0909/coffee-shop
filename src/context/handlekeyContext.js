import { createContext } from "react";
import useHandleKey from "../hooks/useHandleKey";

const HandleKeyContext = createContext()

export const HandleKeyProvider = ({children}) => {
    const { highlightedIndex, setHighlightedIndex, handleKeyDown } = useHandleKey()

    return(
        <HandleKeyContext.Provider
            value={{
                highlightedIndex,
                setHighlightedIndex,
                handleKeyDown
            }}
        >
            {children}
        </HandleKeyContext.Provider>
    )

}

export default HandleKeyContext
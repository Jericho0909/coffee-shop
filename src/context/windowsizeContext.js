import { createContext } from "react";
import useWindowsize from "../hooks/useWindowSize";

const WindowSizeContext = createContext()

export const WindowSizeProvider = ({children}) => {
    const { isLargePhone, isMobile } = useWindowsize()

    return (
        <WindowSizeContext.Provider
            value={{
                isLargePhone,
                isMobile
            }}
        >
            {children}
        </WindowSizeContext.Provider>
    )
}

export default WindowSizeContext
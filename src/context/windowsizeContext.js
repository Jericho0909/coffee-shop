import { createContext } from "react";
import useWindowsize from "../hooks/useWindowSize";

const WindowSizeContext = createContext()

export const WindowSizeProvider = ({children}) => {
    const { isLargePhone } = useWindowsize()

    return (
        <WindowSizeContext.Provider
            value={{
                isLargePhone
            }}
        >
            {children}
        </WindowSizeContext.Provider>
    )
}

export default WindowSizeContext
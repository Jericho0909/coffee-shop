import { createContext } from "react";
import useMediaquery from "../hooks/useMediaQuery";

const MediaQueryContext = createContext()

export const MediaQueryProvider = ({children}) => {
    const { isMobile } = useMediaquery()

    return (
        <MediaQueryContext.Provider
            value={{
                isMobile
            }}
        >
            {children}
        </MediaQueryContext.Provider>
    )
}

export default MediaQueryContext
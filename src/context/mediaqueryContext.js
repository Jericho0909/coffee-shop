import { createContext } from "react";
import useMediaquery from "../hooks/useMediaQuery";

const MediaQueryContext = createContext()

export const MediaQueryProvider = ({children}) => {
    const { isMobile, isMediumDevice, isLargeDevice, isExtraLargeDevice } = useMediaquery()

    return (
        <MediaQueryContext.Provider
            value={{
                isMobile,
                isMediumDevice,
                isLargeDevice,
                isExtraLargeDevice
            }}
        >
            {children}
        </MediaQueryContext.Provider>
    )
}

export default MediaQueryContext
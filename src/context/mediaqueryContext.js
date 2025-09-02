import { createContext } from "react";
import useMediaquery from "../hooks/useMediaQuery";

const MediaQueryContext = createContext()

export const MediaQueryProvider = ({children}) => {
    const { isMediumPhone, isMobile, isMediumDevice, isLargeDevice, isExtraLargeDevice } = useMediaquery()

    return (
        <MediaQueryContext.Provider
            value={{
                isMediumPhone,
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
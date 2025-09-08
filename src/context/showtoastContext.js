import { createContext } from "react";
import useShowToast from "../hooks/useShowToast";

const ShowToastContext = createContext()

export const ShowToastProvider = ({children}) => {
    const { showToast } = useShowToast()

    return(
        <ShowToastContext.Provider
            value={{
                showToast
            }}
        >
            {children}
        </ShowToastContext.Provider>
    )
}

export default ShowToastContext
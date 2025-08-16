import { createContext, useRef } from "react";

const ContainerContext = createContext()

export const ContainerProvider = ({children}) => {
    const container = useRef(null)
    return(
        <ContainerContext.Provider
            value={{
                container
            }}
        >
            {children}
        </ContainerContext.Provider>
    )
}

export default ContainerContext
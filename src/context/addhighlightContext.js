import { createContext } from "react";
import useScrollRestoration from "../hooks/useAddHighlight";

const AddHighlightContext = createContext()

export const AddHighlightProvider = ({children}) => {
    const { containerRefs, saveIndex, highlightUpdated } = useScrollRestoration()

    return(
        <AddHighlightContext.Provider
            value={{
                containerRefs,
                saveIndex,
                highlightUpdated
            }}
        >
            {children}
        </AddHighlightContext.Provider>
    )
}

export default AddHighlightContext
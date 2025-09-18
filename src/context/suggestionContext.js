import { createContext } from "react";
import useSuggestion from "../hooks/useSuggestion";

const SuggestionContext = createContext()

export const SuggestionProvider = ({children}) => {
    const { filterData, setKeySearch, setKeyList } = useSuggestion()

    return (
        <SuggestionContext.Provider
            value={{
                filterData,
                setKeySearch,
                setKeyList
            }}
        >
            {children}
        </SuggestionContext.Provider>
    )
}

export default SuggestionContext
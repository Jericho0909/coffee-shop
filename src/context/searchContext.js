import { createContext } from "react";
import useSearch from "../hooks/useSearch";

const SearchContext = createContext()

export const SearchProvider = ({children}) => {
    const { setKey, setUrl, handleSearch, Reset } = useSearch()

    return(
        <SearchContext.Provider
            value={{
                setKey, 
                setUrl,
                handleSearch,
                Reset
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
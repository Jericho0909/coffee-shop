import { createContext } from "react";
import useSearch from "../hooks/useSearch";

const SearchContext = createContext()

export const SearchProvider = ({children}) => {
    const { itemList, setItemList, setKey, setSetter, setValue,  handleSearch, Reset, hasResult } = useSearch()

    return(
        <SearchContext.Provider
            value={{
                itemList,
                setItemList,
                setKey,
                setSetter,
                setValue,
                handleSearch,
                Reset,
                hasResult
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext
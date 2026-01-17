import { useState, useContext, useEffect, useRef } from "react"
import MediaQueryContext from "../context/mediaqueryContext"
import SearchContext from "../context/searchContext"
import SuggestionContext from "../context/suggestionContext"
import HandleKeyContext from "../context/handlekeyContext"
import { Search } from 'lucide-react';
import { X } from 'lucide-react';
const SectionHeder = ({title, haveExtraBtn, btnContent}) => {
    const { isMobile } = useContext(MediaQueryContext)
    const { handleSearch, Reset } = useContext(SearchContext)
    const { filterData, setKeySearch } = useContext(SuggestionContext)
    const { highlightedIndex,
        setHighlightedIndex,
        handleKeyDown 
    } = useContext(HandleKeyContext)
    const [ search, setSearch ] = useState("")
    const [ showSearchBar, setShowSearchBar ] = useState(false)
    const [ showSuggestion, setShowSuggestion ] = useState(false)
    const [ showRestBtn, setShowResetBTn ] = useState(false)
    const searchBarRef = useRef(null)

    useEffect(() => {
        const handleClickAnywhere = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setShowSearchBar(false)
                setShowSuggestion(false)
                setHighlightedIndex(-1)
            }
        }

        document.addEventListener("click", handleClickAnywhere);
        return () => document.removeEventListener("click", handleClickAnywhere)
    }, [setHighlightedIndex])

    const handleEnter = (e) => {
        if (e.key !== "Enter") return;

        e.preventDefault()
        if (highlightedIndex >= 0) {
            const selected = filterData[highlightedIndex]
            setSearch(selected.customerName || selected.username || selected.name)
            handleSearch(selected.customerName || selected.username || selected.name)
            setShowSuggestion(false)
        } else {
            handleSearch(search)
        }
    }

    const searchBar = () => {
        return(
            <div ref={searchBarRef} className="container-flex mb-0 border border-black">
                <input
                    id="search-Id-username"
                    type="text"
                    placeholder="search...."
                    spellCheck={false}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setKeySearch(e.target.value);
                        setHighlightedIndex(-1)
                        setShowResetBTn(false)
                    }}
                    onFocus={() => setShowSuggestion(true)}
                    onKeyDown={(e) => {
                        handleKeyDown(e, filterData)
                        handleEnter(e)
                        if (e.key === "Enter"){
                            setShowSuggestion(false)
                            setShowResetBTn(true)
                            e.currentTarget.blur()
                        }
                    }}
                    className="rounded-none border-none bg-none focus:outline-none focus:ring-0 focus:border-transparent"
                />
                {(!showRestBtn && search)
                    ? (
                        <button
                            onClick={() => {
                                handleSearch(search);
                                setShowSuggestion(false);
                                setShowResetBTn(true)
                            }}
                        >
                            <Search size={25}/>   
                        </button>
                    )
                    : (
                        <button
                            onClick={() => {
                                Reset();
                                setSearch("");
                                setShowResetBTn(false)
                            }}
                        >
                            <X size={25} />
                        </button>
                    )
                }
            </div>
        )
    }

    const suggestionSearch = () => {
        return(
            <div className="absolute top-full left-0 w-full z-50 bg-[#f9f5f1] border border-[#8c6244] rounded-xl shadow-md">
                <ul className="container-flex justify-start flex-col w-full min-h-48 m-0 p-2 overflow-y-auto scrollbar-hide">
                    {filterData.length !== 0
                        ? (
                            filterData.map((item, index) => (
                                <li
                                    key={index}
                                    className={`block font-opensans text-[clamp(0.82rem,2vw,1rem)] font-medium truncate cursor-pointer transition-colors duration-300
                                    ${highlightedIndex === index ? "bg-[#8c6244] text-white" : "hover:bg-[#8c6244] hover:text-white"}
                                    `}
                                    style={{ fontVariant: "normal" }}
                                    onClick={() => {
                                        setSearch(item.customerName || item.username || item.name);
                                        handleSearch(item.customerName || item.username || item.name);
                                        setShowSuggestion(false);
                                        setShowResetBTn(true)
                                    }}
                                >
                                    {item.customerName || item.username || item.name}
                                </li>
                            ))
                        )
                        : (
                            <p>
                                No result
                            </p>
                        )
                    }
                </ul>
            </div>
        )
    }

    return(
        <div className="container-flex justify-between w-full h-auto my-1 p-1 mb-[0.50rem] gap-1">
            <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                {title}
            </h1>
            <div
            className="container-flex justify-center w-auto h-full px-1 mb-0 bg-white relative"
            >
            {isMobile 
                ? (
                    showSearchBar 
                        ?   (   
                                <>
                                    {searchBar()}
                                    {(search && showSuggestion) && (
                                        suggestionSearch()
                                    )}
                                </>
                            ) 
                        : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setShowSearchBar(true)
                            }}
                        >
                                <Search size={25} />
                            </button>
                        )
                    ) 
                : (
                    <>
                        {searchBar()}
                        {(search && showSuggestion) && (
                            suggestionSearch()
                        )}
                    </>
                )}
            </div>
            {haveExtraBtn && btnContent}

            
        </div>
    )
}

export default SectionHeder
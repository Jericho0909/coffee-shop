import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";

const useSearch = () => {
    const db = getDatabase();
    const [ key, setKey ] = useState("")
    const [ setter, setSetter ] = useState("")
    const [ value, setValue ] = useState("")
    const [ , setSearchParams ] = useSearchParams()
    const [ , setLoading ] = useState(false)
    const [ itemList, setItemList ] = useState([])
    const [ hasResult, setHasResult ] = useState(true)

    const getSearchResult = async (searchQuery) => {
        const snapshot = await get(searchQuery);

        if (snapshot.exists()) {
            const data = snapshot.val();
            const results = Object.keys(data).map(key => ({
                firebaseKey: key,
                ...data[key]
            }))
            setHasResult(true)
            return results
        } 
        else {
            setHasResult(false)
            return []
        }
    }
    
    const handleSearch = async (Query) => {
        if (!Query){
            setItemList([])
            resetSearchParams()
            return
        }

        try {
            const listRef = ref(db, setter)
            const searchQuery = query(listRef, orderByChild(value), equalTo(Query))
            setLoading(true)
            setSearchParams({ q: Query })

            if (key === "orderList"){
                getSearchResult(searchQuery).then((response) => {
                    setItemList(response)
                })
            } 
            else if (key === "customerList"){
                getSearchResult(searchQuery).then((response) => {
                    setItemList(response)
                })
            }
            else if (key === "employerList"){
                getSearchResult(searchQuery).then((response) => {
                    setItemList(response)
                })
            }
            else if (key === "productList"){
                getSearchResult(searchQuery).then((response) => {
                    setItemList(response)
                })
            }
            else if (key === "stockList"){
                getSearchResult(searchQuery).then((response) => {
                    setItemList(response)
                })
            }
        } 
        catch(error) {
            console.error("Search error:", error)
        } 
        finally {
            setLoading(false)
        }
    }

    const Reset = () => {
        resetSearchParams()
        setHasResult(true)
        setItemList([])
    }

    const resetSearchParams = () => {
        setSearchParams({})
    }


    return {
        itemList,
        setItemList,
        setKey,
        setSetter,
        setValue,
        handleSearch,
        Reset,
        hasResult
    }
}

export default useSearch

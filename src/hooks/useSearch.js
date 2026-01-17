import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";
import normalizeText from "../utils/normalizeText";

const useSearch = () => {
    const db = getDatabase();
    const [ setter, setSetter ] = useState("")
    const [ value, setValue ] = useState("")
    const [ , setSearchParams ] = useSearchParams()
    const [ , setLoading ] = useState(false)
    const [ itemList, setItemList ] = useState([])
    const [ hasResult, setHasResult ] = useState(true)

    const getSearchResult = async (refQuery) => {
        const snapshot = await get(refQuery)

        if (snapshot.exists()) {
            const data = snapshot.val()
            const results = Object.keys(data).map(key => ({
                firebaseKey: key,
                ...data[key]
            }))

            setHasResult(true)
            return results
        } else {
            setHasResult(false)
            return []
        }
    }
    
    const handleSearch = async (Query) => {
        if (!Query) {
            setItemList([])
            resetSearchParams()
            return
        }

        const normalizedQuery = normalizeText(Query)

        try {
            setLoading(true)
            setSearchParams({ q: Query })
            const listRef = ref(db, setter)
            const allItems = await getSearchResult(listRef)
            const filtered = allItems.filter(item => {
            const fieldToCompare = item[value] 
            return normalizeText(fieldToCompare).includes(normalizedQuery)
            })

            setItemList(filtered)
            setHasResult(filtered.length > 0)

        } catch (error) {
            console.error("Search error:", error)
        } finally {
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
        setSetter,
        setValue,
        handleSearch,
        Reset,
        hasResult
    }
}

export default useSearch
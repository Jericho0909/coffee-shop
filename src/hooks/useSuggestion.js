import { useEffect, useState, useCallback } from "react"
import {ref, onValue} from "firebase/database"
import { database } from "../firebase";
import { useDebounce } from "@uidotdev/usehooks";
const useSuggestion = () => {
    const [ list, setList ] = useState([])
    const [ filterData, setFilterData ] = useState([])
    const [ keysearch, setKeySearch ] = useState("")
    const [ keyList, setKeyList ] = useState("")
    const debouncedSearch = useDebounce(keysearch, 300)

    const getUniqueList = (data) => {
        return Array.from(
            new Map(
            data.map(item => [
                item.customerName || item.username || item.name,
                item
            ])
            ).values()
        )
    }

    const fetchData = useCallback((nodeName) => {
        const listRef = ref(database, nodeName)
        return onValue(listRef, snapshot => {
            const data = snapshot.val()
            const arr = data 
            ? Object.keys(data).map(key => (
                { 
                    firebaseKey: key,
                    ...data[key] 
                })) 
            : []
            const uniqueData = getUniqueList(arr)
            setList(uniqueData)
        })
    }, []);

    useEffect(() => {
        if(keyList === "orderlist"){
            fetchData("orders")
        }
        else if(keyList === "customerlist"){
            fetchData("customers")
        }
        else if(keyList === "employerlist"){
            fetchData("employers")
        }
        else if(keyList === "productlist"){
            fetchData("products")
        }
        else if(keyList === "stocklist"){
            fetchData("stocks")
        }
    }, [keyList, fetchData]);

    useEffect(() => {
        if (!debouncedSearch) {
            setFilterData(list)
            return;
        }

        const Data = list.filter(key =>
            key.id.toString().includes(debouncedSearch) 
            || key.customerName?.toLowerCase().includes(debouncedSearch.toLowerCase()) 
            || key.username?.toLowerCase().includes(debouncedSearch.toLowerCase()) 
            ||  key.name?.toLowerCase().includes(debouncedSearch.toLowerCase())
        ) 

        const uniqueData = getUniqueList(Data)

        setFilterData(uniqueData.slice(0, 4))
    }, [debouncedSearch, keyList, list])



    return{
        filterData,
        setKeySearch,
        setKeyList
    }
}

export default useSuggestion
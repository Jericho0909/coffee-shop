import { useEffect, useState, useCallback } from "react"
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";
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

    const fetchData = useCallback(async (url) => {
        try {
            const response = await axios.get(url)
            const uniqueData = getUniqueList(response.data)
            return uniqueData.slice(0, 4)
        } catch(error){
            console.log("Error", error)
        }
    }, []);

    useEffect(() => {
        if(keyList === "orderlist"){
            fetchData("http://localhost:3500/orders")
            .then((data) => setList(data));
        }
        else if(keyList === "customerlist"){
            fetchData("http://localhost:3500/customers")
            .then((data) => setList(data));
        }
        else if(keyList === "employerlist"){
            fetchData("http://localhost:3500/employers")
            .then((data) => setList(data));
        }
        else if(keyList === "productlist"){
            fetchData("http://localhost:3500/products")
            .then((data) => setList(data));
        }
        else if(keyList === "stocklist"){
            fetchData("http://localhost:3500/stocks")
            .then((data) => setList(data));
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
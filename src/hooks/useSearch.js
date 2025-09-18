import { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import FetchDataContext from "../context/fetchdataContext";
import axios from "axios";


const useSearch = () => {
    const { 
        setOrderList, 
        setCustomerList,
        setEmployerList,
        setProductList
    } = useContext(FetchDataContext);
    
    const [ key, setKey ] = useState("")
    const [ url, setUrl ] = useState("")
    const [ , setSearchParams ] = useSearchParams()
    const [ , setLoading ] = useState(false);

    
    const handleSearch = async (query) => {
        if (!query){
            resetSearchParams()
            return
        }

        try {
            setLoading(true)
            setSearchParams({ q: query })

            if (key === "orderList"){
                const response = await axios.get(!isNaN(query)
                    ? `${url}?id=${query}`
                    : `${url}?customerName=${query}`
                )
                setOrderList(response.data)
            } 
            else if (key === "customerList"){
                const response = await axios.get(!isNaN(query)
                    ? `${url}?id=${query}`
                    : `${url}?username=${query}`
                )
                setCustomerList(response.data)
            }
            else if (key === "employerList"){
                const response = await axios.get(!isNaN(query)
                    ? `${url}?id=${query}`
                    : `${url}?name=${query}`
                )
                setEmployerList(response.data)
            }
            else if (key === "productList"){
                const response = await axios.get(!isNaN(query)
                    ? `${url}?id=${query}`
                    : `${url}?name=${query}`
                )
                setProductList(response.data)
            }
        } 
        catch(error) {
            console.error("Search error:", error)
        } 
        finally {
            setLoading(false)
        }
    }

    const Reset = async () => {
        resetSearchParams()
        try{
            const response = await axios.get(url)

            if(key === "orderList"){
                setOrderList(response.data);
            } 
            else if (key === "customerList"){
                setCustomerList(response.data)
            } 
            else if (key === "employerList"){
                setEmployerList(response.data)
            }
            else if (key === "productList"){
                setProductList(response.data)
            }
        }catch(error) {
            console.error("Fetch error:", error)
        }
    }

    const resetSearchParams = () => {
        setSearchParams({})
    }


    return {
        setKey,
        setUrl,
        handleSearch,
        Reset
    }
}

export default useSearch

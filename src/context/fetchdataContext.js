import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useFetchData";

const FetchDataContext = createContext()

export const FetchDataProvider = ({children}) => {
    const [ adminList, setAdminList ] = useState([])
    const [ productList, setProductList ] = useState([])

    const { data: Admins, fetchError: adminsError, isLoading: adminsIsLoading, setIsLoading: setAdminsIsLoading } = useAxiosFetch('http://localhost:3500/admins')
    const { data: Products, fetchError: productsError, isLoading: productsIsLoading, setIsLoading: setProductsIsLoading } = useAxiosFetch('http://localhost:3500/products')

    useEffect(() => {
        setAdminList(Admins)
        setProductList(Products)
    },[Admins, Products])

    return (
        <FetchDataContext.Provider
            value={{
                Admins, adminList, setAdminList, adminsError, adminsIsLoading, setAdminsIsLoading,
                Products, productList, setProductList, productsError, productsIsLoading, setProductsIsLoading
            }}
        >
            {children}
        </FetchDataContext.Provider>
    )
}

export default FetchDataContext
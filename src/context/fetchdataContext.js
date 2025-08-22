import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useFetchData";

const FetchDataContext = createContext()

export const FetchDataProvider = ({children}) => {
    const [ adminList, setAdminList ] = useState([])
    const [ productList, setProductList ] = useState([])
    const [ employerList, setEmployerList ] = useState([])
    const [ customerList, setCustomerList ] = useState([])

    const { data: Admins, fetchError: adminsError, isLoading: adminsIsLoading, setIsLoading: setAdminsIsLoading } = useAxiosFetch('http://localhost:3500/admins')
    const { data: Products, fetchError: productsError, isLoading: productsIsLoading, setIsLoading: setProductsIsLoading } = useAxiosFetch('http://localhost:3500/products')
    const { data: Employers, fetchError: EmployersError, isLoading: EmployersIsLoading, setIsLoading: setEmployersIsLoading } = useAxiosFetch('http://localhost:3500/employers')
    const { data: Customers, fetchError: CustomersError, isLoading: CustomersIsLoading, setIsLoading: setCustomersIsLoading } = useAxiosFetch('http://localhost:3500/employers')


    useEffect(() => {
        setAdminList(Admins)
        setProductList(Products)
        setEmployerList(Employers)
        setCustomerList(Customers)
    },[Admins, Products, Employers, Customers])

    return (
        <FetchDataContext.Provider
            value={{
                Admins, adminList, setAdminList, adminsError, adminsIsLoading, setAdminsIsLoading,
                Products, productList, setProductList, productsError, productsIsLoading, setProductsIsLoading,
                Employers, employerList, setEmployerList, EmployersError, EmployersIsLoading, setEmployersIsLoading,
                Customers, customerList, setCustomerList, CustomersError,
                CustomersIsLoading, setCustomersIsLoading
            }}
        >
            {children}
        </FetchDataContext.Provider>
    )
}

export default FetchDataContext
import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useFetchData";
import axios from "axios";

const FetchDataContext = createContext()

export const FetchDataProvider = ({children}) => {
    const [ adminList, setAdminList ] = useState([])
    const [ productList, setProductList ] = useState([])
    const [ employerList, setEmployerList ] = useState([])
    const [ customerList, setCustomerList ] = useState([])
    const [ orderList, setOrderList ] = useState([])
    const [ stockList, setStockList ] = useState([])

    const { data: Admins, fetchError: adminsError, isLoading: adminsIsLoading, setIsLoading: setAdminsIsLoading } = useAxiosFetch('http://localhost:3500/admins')
    const { data: Products, fetchError: productsError, isLoading: productsIsLoading, setIsLoading: setProductsIsLoading } = useAxiosFetch('http://localhost:3500/products')
    const { data: Employers, fetchError: EmployersError, isLoading: EmployersIsLoading, setIsLoading: setEmployersIsLoading } = useAxiosFetch('http://localhost:3500/employers')
    const { data: Customers, fetchError: CustomersError, isLoading: CustomersIsLoading, setIsLoading: setCustomersIsLoading } = useAxiosFetch('http://localhost:3500/customers')
    const { data: Orders, fetchError: OrdersError, isLoading: OrdersIsLoading, setIsLoading: setOrdersIsLoading } = useAxiosFetch('http://localhost:3500/orders')
    const { data: Stock, fetchError: stockError, isLoading: stockIsLoading, setIsLoading: setstockIsLoading } = useAxiosFetch('http://localhost:3500/stocks')


    useEffect(() => {
        setAdminList(Admins)
        setProductList(Products)
        setEmployerList(Employers)
        setCustomerList(Customers)
        setOrderList(Orders)
        setStockList(Stock)
    },[Admins, Products, Employers, Customers, Orders, Stock])

    const fetchData = async(url, key) => {
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
            else if (key === "stockList"){
                setStockList(response.data)
            }
        }catch(error) {
            console.error("Fetch error:", error)
        }
    }

    return (
        <FetchDataContext.Provider
            value={{
                Admins, adminList, setAdminList, adminsError, adminsIsLoading, setAdminsIsLoading,
                Products, productList, setProductList, productsError, productsIsLoading, setProductsIsLoading,
                Employers, employerList, setEmployerList, EmployersError, EmployersIsLoading, setEmployersIsLoading,
                Customers, customerList, setCustomerList, CustomersError,
                CustomersIsLoading, setCustomersIsLoading,
                Orders, orderList, setOrderList, OrdersError, OrdersIsLoading, setOrdersIsLoading,
                Stock, stockList, setStockList, stockError, stockIsLoading,
                setstockIsLoading,
                fetchData
            }}
        >
            {children}
        </FetchDataContext.Provider>
    )
}

export default FetchDataContext
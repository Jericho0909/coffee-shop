import { createContext, useState } from "react";

const CustomerorderContext = createContext()

export const CustomerOrderProvider = ({children}) => {
    const [ customerOrders, setCustomerOrders ] = useState([JSON.parse(sessionStorage.getItem("customerOrders")) || []])

    return(
        <CustomerorderContext.Provider
            value={{
                customerOrders,
                setCustomerOrders
            }}
        >
            {children}
        </CustomerorderContext.Provider>
    )
}

export default CustomerorderContext
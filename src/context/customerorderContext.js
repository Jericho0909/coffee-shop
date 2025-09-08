import { createContext, useState } from "react";

const CustomerorderContext = createContext()

export const CustomerOrderProvider = ({children}) => {
    const [ customerOrders, setCustomerOrders ] = useState(() => {
        const saved = sessionStorage.getItem("customerOrders");
        return saved ? JSON.parse(saved) : []
    });

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
import { createContext, useCallback, useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const FirebaseFetchDataContext = createContext();

export const FirebaseFetchDataProvider = ({ children }) => {
  const [ adminList, setAdminList ] = useState([]);
  const [ productList, setProductList ] = useState([]);
  const [ employerList, setEmployerList ] = useState([]);
  const [ customerList, setCustomerList ] = useState([]);
  const [ orderList, setOrderList ] = useState([]);
  const [ stockList, setStockList ] = useState([]);

  const subscribeNode = useCallback((nodeName, setter) => {
    const dbRef = ref(database, nodeName);
    return onValue(dbRef, snapshot => {
        const data = snapshot.val()
        const arr = data 
            ? Object.keys(data).map(key => (
                { 
                  firebaseKey: key, 
                  ...data[key]
                })) 
            : []
        setter(arr)
    })
  },[])

  useEffect(() => {
    const unsubAdmins = subscribeNode("admins", setAdminList);
    const unsubProducts = subscribeNode("products", setProductList);
    const unsubEmployers = subscribeNode("employers", setEmployerList);
    const unsubCustomers = subscribeNode("customers", setCustomerList);
    const unsubOrders = subscribeNode("orders", setOrderList);
    const unsubStock = subscribeNode("stocks", setStockList);

    
    return () => {
        unsubAdmins();
        unsubProducts();
        unsubEmployers();
        unsubCustomers();
        unsubOrders();
        unsubStock();
    }
    }, [subscribeNode])


  return (
    <FirebaseFetchDataContext.Provider
      value={{
        subscribeNode,
        adminList, setAdminList,
        productList, setProductList,
        employerList, setEmployerList,
        customerList, setCustomerList,
        orderList, setOrderList,
        stockList, setStockList
      }}
    >
      {children}
    </FirebaseFetchDataContext.Provider>
  );
};

export default FirebaseFetchDataContext;

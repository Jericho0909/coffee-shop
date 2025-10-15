import { useEffect, useRef, useState } from "react";
import { ref, onChildAdded, onChildChanged } from "firebase/database";
import { database } from "../firebase";

export function useOrdersListener(onNewOrder) {
    const [ hasNewOrder, setHasNewOrder ] = useState(false);
    const [ orderComplete, setOrderComplete ] = useState([])
    const isInitialLoad = useRef(true);
    useEffect(() => {
        const ordersRef = ref(database, "orders")

        const addListener = onChildAdded(ordersRef, (snapshot) => {
            if (isInitialLoad.current) return
                setHasNewOrder(true);
                onNewOrder?.(snapshot.val());
        });

        const changeListener = onChildChanged(ordersRef, (snapshot) => {
            console.log("🟡 Order updated:", snapshot.val())
            const orderComplete = snapshot.val()
            setOrderComplete(orderComplete)
        })

        const timer = setTimeout(() => {
            isInitialLoad.current = false
        }, 1000);


        return () => {
        clearTimeout(timer);
        addListener();
        changeListener();
        };
    }, [onNewOrder]);
    
    return {
        hasNewOrder,
        setHasNewOrder,
        orderComplete
    }
}

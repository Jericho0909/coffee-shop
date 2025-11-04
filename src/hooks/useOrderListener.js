import { useEffect, useRef, useState } from "react";
import { ref, get, onChildAdded, onChildChanged } from "firebase/database";
import { database } from "../firebase";

export function useOrdersListener(onNewOrder) {
  const [hasNewOrder, setHasNewOrder] = useState(false)
  const [orderComplete, setOrderComplete] = useState([])
  const existingKeys = useRef(new Set())
  const isMounted = useRef(true)

  useEffect(() => {
    const ordersRef = ref(database, "orders")
    isMounted.current = true

    const init = async () => {
      const snapshot = await get(ordersRef)
      if (snapshot.exists()) {
        snapshot.forEach((child) => {
          existingKeys.current.add(child.key)
        })
      }

      const unsubscribeAdd = onChildAdded(ordersRef, (snapshot) => {
        if(!isMounted.current) return;

        if(!existingKeys.current.has(snapshot.key)){
          existingKeys.current.add(snapshot.key)
          setHasNewOrder(true)
          onNewOrder?.(snapshot.val())
        }
      })

      const unsubscribeChange = onChildChanged(ordersRef, (snapshot) => {
        if (!isMounted.current) return
        setOrderComplete(snapshot.val())
      })

      return () => {
        unsubscribeAdd()
        unsubscribeChange()
      }
    }

    const cleanupPromise = init()

    return () => {
      isMounted.current = false
      cleanupPromise.then((cleanup) => cleanup && cleanup())
    }
  }, [onNewOrder])

  return { hasNewOrder, setHasNewOrder, orderComplete }
}

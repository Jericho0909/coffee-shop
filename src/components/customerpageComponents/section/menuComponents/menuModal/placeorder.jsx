import { useState, useContext, useEffect } from "react"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext";
import CustomerorderContext from "../../../../../context/customerorderContext";
import ModalContext from "../../../../../context/modalContext";
import ShowToastContext from "../../../../../context/showtoastContext";
import { PhilippinePeso } from 'lucide-react';

const PlaceOrder = ({customer}) => {
    const { productList } = useContext(FirebaseFetchDataContext)
    const { customerOrders, setCustomerOrders } = useContext(CustomerorderContext)
    const { setIsOpen, setModalName } = useContext(ModalContext)
    const { showToast } = useContext(ShowToastContext)
    const [ productId ] = useState(sessionStorage.getItem("productId"))
    const [ count, setCount ] = useState(1)

    const item = productList.find(key => key.id === productId)
    console.log(item)

    const orderFormat = {
        productId: item.id,
        name: item.name,
        size: "",
        quantity: count,
        flavor: "",
        addOns: [],
        price: 0,
        subtotal: 0
        
    }

    const [ order, setOrder ] = useState(orderFormat)
    const [ subtotal, setSubTotal] = useState(order.subtotal)

    useEffect(() => {
        order.quantity = count
        const addOnsPrice = order.addOns.length * 5;
        const total = (order.price + addOnsPrice) * count
        setSubTotal(total)
        order.subtotal = total
    }, [order, count])

    const addOns = (value) => {
        if(order.addOns.includes(value)){
            setOrder(prev => ({
                ...prev,
                addOns: prev.addOns.filter(key => key !== value)
            }))
        }
        else{
            setOrder(prev => ({
                ...prev,
                addOns: [...prev.addOns, value]
            }))
        }
    }

    const placeOrder = (e) => {
        e.preventDefault();
        const isMissingContact = !customer.email || !customer.phone || !customer.location;
        if(isMissingContact){
            setModalName("contactform")
            setIsOpen(true)
            showToast("error", "We need your contact details before we can process your order.",2000)
            return
        }
        showToast("success", "Your order has been placed successfully.",2000)
        setCustomerOrders(item => ([...item, order]))
        const orders = [...customerOrders, order]
        sessionStorage.setItem("customerOrders", JSON.stringify(orders))
        setTimeout(() => {
            setIsOpen(false)
        }, 200)
    }

    return(
        <div>
            testing
        </div>
    )
}

export default PlaceOrder
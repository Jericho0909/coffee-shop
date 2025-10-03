import { useContext } from "react"
import ModalContext from "../../../../../context/modalContext"
import Table from "../../../../table"
const OrderTable = ({table, orderList, itemList}) => {
    const { toggleModal, setModalName } = useContext(ModalContext)
    const tableHeader = [
        {label: "OrderID", key: "id"},
        {label: "Customer", key: "customerName"},
        {label: "Date", key: "orderDate"},
        {label: "Total", key: "total"},
        {label: "Status", key: "status"},
    ]

    const data = () => (itemList?.length > 0 
        ? itemList
        : orderList
    )

    const filterOrders = () => {
        if(table === "ordersHistory"){
            const completedOrders = data().filter(order => order.status.includes("Completed") || order.status.includes("Cancelled"))
            return completedOrders.reverse()
        }
        else{
            const currentOrders = data().filter(order => !order.status.includes("Completed") && !order.status.includes("Cancelled"))
            return currentOrders.reverse()
        }
    }

    const openModal = (row) => {
        sessionStorage.setItem("orderID", row.id)
        setModalName("manageOrder")
        toggleModal()
    }

    return (
        <Table
            tableHeader = {tableHeader}
            tableData = {filterOrders()}
            openModal = {openModal}
        />
    )
}

export default OrderTable
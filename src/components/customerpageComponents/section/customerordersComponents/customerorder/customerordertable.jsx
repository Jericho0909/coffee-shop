import { useContext } from "react"
import Table from "../../../../table"
import ModalContext from "../../../../../context/modalContext"
const CustomerOrderTable = ({customerOrders}) => {
    const { toggleModal, setModalName } = useContext(ModalContext)
    const tableHeader = [
        {label: "OrderID", key: "orderId"},
        {label: "Date", key: "orderDate"},
        {label: "Status", key: "status"},
        {label: "PaymentMethod", key: "paymentMethod"},
        {label: "Total", key: "total"},
    ]

    const openModal = (row) => {
        sessionStorage.setItem("customerOrder", JSON.stringify(row))
        setModalName("manageCustomerOrder")
        toggleModal()
    }

    return(
       <Table
            tableHeader = {tableHeader}
            tableData = {customerOrders}
            openModal = {openModal}
        />
    )
}

export default CustomerOrderTable
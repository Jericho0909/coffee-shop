import { useContext } from "react"
import ModalContext from "../../../../../context/modalContext"
import Table from "../../../../table"
const OrderTable = ({orders}) => {
    const { toggleModal, setModalName } = useContext(ModalContext)
    const tableHeader = [
        {label: "OrderID", key: "id"},
        {label: "Customer", key: "customerName"},
        {label: "Date", key: "orderDate"},
        {label: "Total", key: "total"},
        {label: "Status", key: "status"},
    ]



    const openModal = (row) => {
        sessionStorage.setItem("orderID", row.id)
        setModalName("manageOrder")
        toggleModal()
    }

    return (
        <Table
            tableHeader = {tableHeader}
            tableData = {orders}
            openModal = {openModal}
        />
    )
}

export default OrderTable
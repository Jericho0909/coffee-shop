import { useContext } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ModalContext from "../../../../../context/modalContext"
import Table from "../../../../table"
const OrderTable = () => {
    const { orderList } = useContext(FetchDataContext)
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
            tableData = {orderList}
            openModal = {openModal}
        />
    )
}

export default OrderTable
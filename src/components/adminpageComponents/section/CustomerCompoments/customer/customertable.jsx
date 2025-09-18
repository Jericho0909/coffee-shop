import { useContext } from "react"
import ModalContext from "../../../../../context/modalContext"
import Table from "../../../../table"
const CustomerTable = ({customerList}) => {
    const { toggleModal, setModalName } = useContext(ModalContext)

    const tableHeader = [
        {label: "CustomerID", key: "id"},
        {label: "Name", key: "username"},
        {label: "Contact", key: "phone"},
        {label: "TotalOrders", key: "totalOrders"},
        {label: "TotalSpent", key: "totalSpent"},
    ]

    const openModal = (row) => {
        sessionStorage.setItem("customerID", row.id)
        setModalName("manageCustomer")
        toggleModal()
    }

    return (
        <Table
            tableHeader = {tableHeader}
            tableData = {customerList}
            openModal = {openModal}
        />
    )
}

export default CustomerTable
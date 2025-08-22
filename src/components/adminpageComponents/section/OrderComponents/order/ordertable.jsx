import { useContext } from "react"
import ModalContext from "../../../../../context/modalContext"
import Table from "../../../../table"
const OrderTable = () => {
    const { toggleModal, setModalName } = useContext(ModalContext)
    const tableHeader = [
        {label: "OrderID", key: "id"},
        {label: "Customer", key: "customer"},
        {label: "Date", key: "date"},
        {label: "Total", key: "total"},
        {label: "Status", key: "status"},
    ]

    const tableData = [
        {
            id: "#001",
            customer: "Juan Dela Cruz",
            date: "2025-08-10",
            total: "₱350",
            status: "Completed"
        },
        {
            id: "#002",
            customer: "Maria Santos",
            date: "2025-08-11",
            total: "₱120",
            status: "Pending"
        },
        {
            id: "#003",
            customer: "Pedro Reyes",
            date: "2025-08-12",
            total: "₱200",
            status: "Cancelled"
        },
        {
            id: "#004",
            customer: "Ana Cruz",
            date: "2025-08-13",
            total: "₱500",
            status: "Processing"
        }
    ]



    const openModal = (row) => {
        sessionStorage.setItem("orderID", row.id)
        setModalName("manage")
        toggleModal()
    }

    return (
        <Table
            tableHeader = {tableHeader}
            tableData = {tableData}
            openModal = {openModal}
        />
    )
}

export default OrderTable
import { useContext } from "react"
import FetchDataContext from "../../../../../context/fetchdataContext"
import ModalContext from "../../../../../context/modalContext"
import Table from "../../../../table"

const EmployerTable = () => {
    const { toggleModal, setModalName } = useContext(ModalContext)
    const { employerList } = useContext(FetchDataContext)
    const tableHeader = [
        {label: "Id", key: "id"},
        {label: "Name", key: "name"},
        {label: "Role", key: "role"},
        {label: "Email/Username", key: "email"},
        {label: "Status", key: "status"},
    ]

    

    const openModal = (row) => {
        sessionStorage.setItem("employerID", row.id)
        sessionStorage.setItem("employerName", row.name)
        setModalName("manageEmployer")
        toggleModal()
    }

    return(
        <Table
            tableHeader = {tableHeader}
            tableData= {employerList}
            openModal = {openModal}
        />
    )
}

export default EmployerTable
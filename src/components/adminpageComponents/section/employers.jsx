import { useContext, useState, useEffect } from "react"
import ModalContext from "../../../context/modalContext"
import EmployerTable from "./EmployerComponents/Employer/employertable"
import ContainerContext from "../../../context/containerContext"
import Loading from "../../loading"
const Employers = () => {
    const { toggleModal, setModalName } = useContext(ModalContext)
    const { container } = useContext(ContainerContext)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    })

    if(loading){
        return(
            <Loading/>
        )
    }

    const openModal = () => {
        setModalName("addEmployer")
        toggleModal()
    }

    return(
        <section className="flex justify-center">
            <div className="container w-full">
                <div className="flex justify-between w-auto h-auto my-1 p-1 mb-[0.50rem]">
                    <h1 className="text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-start">
                        employers
                    </h1>
                    <button
                        className="press w-auto"
                        onClick={() => {openModal()}}
                    >
                        add employer
                    </button>
                </div>
                <div 
                    ref={container}
                    className="w-full flex-1 overflow-y-auto scrollbar-hide"
                >
                    <EmployerTable/>
                </div>
            </div>
        </section>
    )
}

export default Employers
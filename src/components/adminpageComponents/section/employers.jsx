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
        <section>
            <div className="bg-[#f9f5f1] border border-[#8c6244] rounded-xl shadow-md sm:p-[0.90rem] md:p-[1.10rem] lg:p-[1.30rem] xl:p-[1.50rem] w-full">
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
                    className="w-full max-h-[82vh] xl:max-h-[71vh] overflow-y-auto scrollbar-hide"
                >
                    <EmployerTable/>
                </div>
            </div>
        </section>
    )
}

export default Employers
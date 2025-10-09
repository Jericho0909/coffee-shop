import { useContext, useState } from "react"
import FirebaseFetchDataContext from "../../../../../context/firebasefetchdataContext";
import ModalContext from "../../../../../context/modalContext"
import ShowToastContext from "../../../../../context/showtoastContext";
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';
const UserSettings = ({user}) => {
    const { orderList } = useContext(FirebaseFetchDataContext)
    const { showToast } = useContext(ShowToastContext)
    const { setIsOpen, setModalName } = useContext(ModalContext)
    const [ showPassword, setShowPassword ] = useState(false)

    const editProfile = () => {
       const hasActiveOrder = orderList
        .filter(order => order.customerName === user.username)
        .some(o => o.status === "Pending" || o.status === "Processing")

        if(hasActiveOrder){
            showToast("error", "You cannot edit your profile while you have a pending order in progress.", 4000)
            return
        }
        setModalName("editProfile")
        setIsOpen(true)
    }

    const password = showPassword ? user.password : "*".repeat(user.password.length)

    const infoRow = (title1, value1, title2, value2) => {
        return(
            <div className="container-flex flex-col w-full font-opensans tracking-wide text-[clamp(0.80rem,2vw,1rem)]p-1 mb-[0.40rem]">
                <div className="container-flex w-full mb-[0.40rem] xl:mb-[0.30rem] gap-1">
                    <span className="font-bold">
                        {title1}
                    </span>
                    <span className="text-[#D4A373] italic">
                        {value1}
                    </span>
                </div>
                <div className="container-flex w-full mb-[0.40rem] xl:mb-[0.30rem] gap-1">
                    <span className="font-bold">
                        {title2}
                    </span>
                    <span className="text-[#D4A373] italic">
                        {value2}
                    </span>
                    {title2 === "Password:" && (
                        <button
                            className="w-auto h-auto"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <EyeClosed size={16}/> : <Eye size={16}/>}
                        </button>
                    )}
                </div>
            </div>
        )
    }

    return(
        <div className="container-flex justify-start flex-col w-full h-[90%] sm:w-[80%] lg:w-[100%] xl:w-[90%] py-[2rem] xl:py-[0.50rem] px-1 ">
            <div className="container-flex justify-center w-[5rem] xl:w-[4rem] h-[5rem] xl:h-[4rem] rounded-[50%] bg-[#8c6244] border border-black mb-0">
                <span className="font-nunito text-[2rem] p-1">
                    {user.username.charAt(0).toUpperCase()}
                </span>
            </div>
            <section className="w-full h-auto p-1">
                <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem] xl:mb-[0.50rem]">
                    account info
                </h1>
                {infoRow("Username:", user.username, "Password:", password)}
                {infoRow("Phone:", user.phone, "Email:", user.email)}
                <div className="container-flex w-full font-opensans tracking-wide text-[clamp(0.80rem,2vw,1rem)]p-1 mb-[0.40rem] gap-1">
                    <span className="font-bold">
                        Location:
                    </span>
                    <span className="text-[#D4A373] italic">
                        {user.location}
                    </span>
                </div>
            </section>
            <section>
                <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem] xl:mb-[0.50rem]">
                    activity stats
                </h1>
                {infoRow("Date Joined:", user.dateJoined, "Last Order Date:", user.lastOrderDate)}
                {infoRow("Total Orders:", user.totalOrders, "Total Spent:", user.totalSpent)}
            </section>
            <div className="container-flex justify-center w-full h-auto p-1">
                <button
                    className="press w-[50%]"
                    onClick={() => editProfile()}
                >
                    edit 
                </button>
            </div>
        </div>
    )
}

export default UserSettings
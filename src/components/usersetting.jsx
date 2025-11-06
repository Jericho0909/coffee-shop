import { useState } from "react"
import { Eye } from 'lucide-react';
import { EyeClosed } from 'lucide-react';
const UserSettings = ({user, editProfile}) => {
    const [ showPassword, setShowPassword ] = useState(false)
    const password = showPassword ? user.password : "*".repeat(user.password.length)
    const infoRow = (label, value) => {
        return(
            <div className="container-flex flex-col w-full font-opensans tracking-wide text-[clamp(0.78rem,2vw,1rem)] p-1 mb-[0.40rem]">
                <div className="container-flex w-full mb-[0.40rem] xl:mb-[0.30rem] gap-1">
                    <span className="font-bold">
                        {label}
                    </span>
                    <span className="text-[#D4A373] italic">
                        {value}
                    </span>
                    {label === "Password:" && (
                        <button
                            className="w-auto h-auto"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <Eye size={16}/> : <EyeClosed size={16}/>}
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
                {infoRow("Name:", user.name)}
                {infoRow("Username:", user.username)}
                {infoRow("Password:", password)}
                {infoRow("Phone:", user.phone)}
                {infoRow("Email:", user.email)}
                {infoRow("Location:", user.location)}
            </section>
            {user?.dateJoined && (
            <section>
                <h1 className="text-stroke text-[clamp(1.20rem,2vw,1.50rem)] font-nunito tracking-wide font-black text-center mb-[1rem] xl:mb-[0.50rem]">
                    activity stats
                </h1>
                {infoRow("Date Joined:", user.dateJoined)}
                {infoRow("Last Order Date:", user.lastOrderDate)}
                {infoRow("Total Orders:", user.totalOrders)}
                {infoRow("Total Spent:", user.totalSpent)}
            </section>
            )}
            <div className="container-flex justify-center w-full h-auto p-1">
                <button
                    className="press  hoverable:hover:bg-[#8b5e3c] 
                    hoverable:hover:scale-105 
                    hoverable:hover:shadow-[0_4px_12px_rgba(111,78,55,0.4)] w-[30%]"
                    onClick={() => editProfile()}
                >
                    edit 
                </button>
            </div>
        </div>
    )
}

export default UserSettings
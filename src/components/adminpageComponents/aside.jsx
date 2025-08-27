import { useNavigate, NavLink, useParams } from "react-router-dom";
import  CoffeeIcon from "../../assets/icons/coffee-icon.png"
const Aside = ({ setOpenSiderBar}) => {
    const navigate = useNavigate()
    const { id, username } = useParams()


    const onToggleSidebar = () => {
        setTimeout(() => setOpenSiderBar(false))
    }

    const Logout = () => {
        navigate("/");
    }
    return (
        <>
            <div className="flex justify-center items-center w-full h-auto mt-[5rem]">
                <img
                className="w-20 h-auto"
                src={CoffeeIcon}
                alt="Coffee-Shop"
                loading="lazy"
                />
            </div>

            <nav className="flex flex-col items-start p-4 space-y-4">
                <ul className="flex-col">
                    <li>
                        <NavLink 
                            to={`/Adminpage/${id}/${username}/Dashboard`} 
                            onClick={onToggleSidebar}
                            className="relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full"
                        >
                        
                            dashboard
                        </NavLink>
                    </li>
                    <li>
                       <NavLink 
                            to={`/Adminpage/${id}/${username}/Products`} 
                            onClick={onToggleSidebar}
                            className="relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            products
                        </NavLink> 
                    </li>
                    <li>
                        <NavLink 
                            to={`/Adminpage/${id}/${username}/Orders`} onClick={onToggleSidebar}
                            className="relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={`/Adminpage/${id}/${username}/Customers`} 
                            onClick={onToggleSidebar}
                            className="relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            customers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to={`/Adminpage/${id}/${username}/Employers`} 
                            onClick={onToggleSidebar}
                            className="relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            employers
                        </NavLink>
                    </li>
                    <li>
                        <button
                        className="bg-black text-white px-6 py-2 rounded-md mt-3 
                        hover:bg-[#734d35] hover:scale-105 
                        active:scale-95 active:shadow-none
                        transition-all duration-300 ease-in-out shadow-md"
                            style={{ fontVariant: "small-caps" }}
                            onClick={Logout}
                        >
                            logout
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Aside
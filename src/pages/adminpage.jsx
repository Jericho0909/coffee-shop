import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useOrdersListener } from "../hooks/useOrderListener";
import FirebaseFetchDataContext from "../context/firebasefetchdataContext";
import WindowSizeContext from "../context/windowsizeContext";
import ModalContext from "../context/modalContext";
import Header from "../components/header";
import Main from "../components/main";
import Aside from "../components/aside";
import Notification from "../components/notification";
import Modal from "../components/modal";
import ProductAdd from "../components/adminpageComponents/section/ProductComponents/product/productadd";
import ProductUpdate from "../components/adminpageComponents/section/ProductComponents/product/productupdate";
import ProductDetails from "../components/adminpageComponents/section/ProductComponents/product/productdetails";
import ManageOrder from "../components/adminpageComponents/section/OrderComponents/manageModal/manageOrder";
import AddEmployer from "../components/adminpageComponents/section/EmployerComponents/EmployersModal/addemployer";
import ManageEmployer from "../components/adminpageComponents/section/EmployerComponents/EmployersModal/updateemployer";
import ManageCustomer from "../components/adminpageComponents/section/CustomerCompoments/cutomerModal/manageCustomer";
import AddStock from "../components/adminpageComponents/section/StockComponents/stockModal/addstock";
import AdminEditProfile from "../components/adminpageComponents/section/AdminSettingsCompoments/settingsModal/adminEditProfile";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
import showToast from "../utils/showToast";
const Adminpage = () => {
    const navigate = useNavigate()
    const { orderList } = useContext(FirebaseFetchDataContext)
    const { isMobile } = useContext(WindowSizeContext)
    const { isOpen, modalName } = useContext(ModalContext)
    const { id, username } = useParams()
    const { hasNewOrder, setHasNewOrder } = useOrdersListener()
    const { Toast } = showToast()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ opensidebar, setOpenSiderBar ] = useState(false)
    const sidebarRef = useRef(null)
    const orderPendingAndProccessing = orderList.filter(key => key.status.includes("Processing") || key.status.includes("Pending"))

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const handleClickAnywhere = (e) => {
            if(!isMobile) return

            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setOpenSiderBar(false)
            }
        };
      
        document.addEventListener("click", handleClickAnywhere);
      
        return () => {
          document.removeEventListener("click", handleClickAnywhere);
        };
    }, [isMobile])

    useEffect(() => {
        if(hasNewOrder){
            Toast("success", "You Have NewOrder!", 2000)
            const timer = setTimeout(() => {
            setHasNewOrder(false);
            }, 2100);
            return () => clearTimeout(timer)
        }
    }, [hasNewOrder, Toast, setHasNewOrder])


    const modalComponents = {
        addProuct: <ProductAdd/>,
        updateProduct: <ProductUpdate/>,
        detailProduct: <ProductDetails/>,
        manageOrder: <ManageOrder/>,
        addEmployer: <AddEmployer/>,
        manageEmployer: <ManageEmployer/>,
        manageCustomer: <ManageCustomer/>,
        addStock: <AddStock/>,
        adminEditProfile: <AdminEditProfile/>
    }

    const onToggleSidebar = () => {
        setTimeout(() => setOpenSiderBar(prev => !prev))
    }

    const Logout = () => {
        sessionStorage.clear()
        navigate("/");
    }

    const RightContent = () => {
        return(
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleSidebar()
                }}
            >
                {!isMobile 
                    ? (
                        null
                    ) 
                    : (
                        <Bars3Icon className="w-6 h-6 text-white" />
                    )
                }
            </button>
        )
    }

    const NavContent = () => {
        return(
            <ul className="flex-col">
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Dashboard`} 
                        onClick={() => {
                            onToggleSidebar();
                        }}
                        className={({ isActive }) =>`
                        relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23]
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
                        after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                        ${isActive ? "after:w-full text-[#6F4E37] font-semibold" : ""}
                        `}
                    >
                    
                        dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Products`} 
                        onClick={() => {
                            onToggleSidebar();
                        }}
                        className={({ isActive }) =>`
                        relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23]
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
                        after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                        ${isActive ? "after:w-full text-[#6F4E37] font-semibold" : ""}
                        `}
                    >
                        products
                    </NavLink> 
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Orders`} onClick={() => {
                            onToggleSidebar();               
                        }}
                        className={({ isActive }) =>`
                        relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23]
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
                        after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                        ${isActive ? "after:w-full text-[#6F4E37] font-semibold" : ""}
                        `}
                    >
                        orders
                        <div className="container-flex justify-center mb-0 absolute -top-2 -right-4 w-6 h-6 rounded-[50%] text-[0.85rem] text-white bg-[#6F4E37] border border-black">
                            {orderPendingAndProccessing.length}
                        </div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Customers`} 
                        onClick={() => {
                            onToggleSidebar()
                            
                        }}
                        className={({ isActive }) =>`
                        relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23]
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
                        after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                        ${isActive ? "after:w-full text-[#6F4E37] font-semibold" : ""}
                        `}
                    >
                        customers
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Employers`} 
                        onClick={() => {
                            onToggleSidebar()
                        }}
                        className={({ isActive }) =>`
                        relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23]
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
                        after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                        ${isActive ? "after:w-full text-[#6F4E37] font-semibold" : ""}
                        `}
                    >
                        employers
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Stocks`} onClick={() => {
                            onToggleSidebar()
                            
                        }}
                        className={({ isActive }) =>`
                        relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23]
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
                        after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                        ${isActive ? "after:w-full text-[#6F4E37] font-semibold" : ""}
                        `}
                    >
                        stocks
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Settings`} onClick={() => {
                            onToggleSidebar()
                            
                        }}
                        className={({ isActive }) =>`
                        relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23]
                        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px]
                        after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                        ${isActive ? "after:w-full text-[#6F4E37] font-semibold" : ""}
                        `}
                    >
                        settings
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
        )
    }

    if(isLoading) return

    return(
        <div className="flex flex-col">  
            <Notification/>
            <Header
                title = "admin"
                rightContent={<RightContent/>}
            />
            <div className="flex w-full">
                {isMobile ?(
                    <aside
                        ref={sidebarRef}
                        onClick={(e) => e.stopPropagation()}
                        className={`fixed top-[5rem] left-0 w-full md:w-[40%] h-full bg-[#f9f5f1] border border-[#8c6244] shadow-md z-50 transform transition-transform duration-300 ease-in-out
                        ${opensidebar ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <Aside>
                            <NavContent/>
                        </Aside>
                    </aside>
                ) : (
                    <aside
                        ref={sidebarRef}
                        className="fixed top-[5.20rem] bottom-0 bg-[#f9f5f1] border border-[#8c6244] shadow-md mt- p-1 mr-1"
                    >
                        <Aside>
                            <NavContent/>
                        </Aside>
                    </aside>
                )}
                <AnimatePresence>
                    {(isOpen ) && (
                        <Modal>
                            {modalComponents[modalName]}
                        </Modal>
                    )}
                </AnimatePresence>
                <Main />
            </div>
        </div>
    )
}

export default Adminpage
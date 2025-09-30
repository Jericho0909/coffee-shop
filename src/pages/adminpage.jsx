import { useEffect, useState, useContext, useRef } from "react"
import { useNavigate, NavLink, useParams } from "react-router-dom";
import FetchDataContext from "../context/fetchdataContext";
import WindowSizeContext from "../context/windowsizeContext"
import ModalContext from "../context/modalContext"
import Header from "../components/header";
import Main from "../components/main";
import Aside from "../components/aside";
import CoffeGif from "../../src/assets/gif/coffee-Gif.gif";
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
import { Bars3Icon } from "@heroicons/react/24/outline";
import { AnimatePresence } from "framer-motion";
const Adminpage = () => {
    const navigate = useNavigate()
    const { fetchData } = useContext(FetchDataContext)
    const { isMobile } = useContext(WindowSizeContext)
    const { isOpen, modalName } = useContext(ModalContext)
    const { id, username } = useParams()
    const [ loading, setLoading ] = useState(true)
    const [ opensidebar, setOpenSiderBar ] = useState(false)
    const [ active, setActive ] = useState(sessionStorage.getItem("section") || "dashboardsection")
    const sidebarRef = useRef(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 9000)

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
    }, [isMobile]);


    const modalComponents = {
        addProuct: <ProductAdd/>,
        updateProduct: <ProductUpdate/>,
        detailProduct: <ProductDetails/>,
        manageOrder: <ManageOrder/>,
        addEmployer: <AddEmployer/>,
        manageEmployer: <ManageEmployer/>,
        manageCustomer: <ManageCustomer/>,
        addStock: <AddStock/>
    }

    const onToggleSidebar = () => {
        setTimeout(() => setOpenSiderBar(prev => !prev))
    }

    const saveSection = (section) => {
        sessionStorage.setItem("section", section)
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
                            setActive("dashboardsection");
                            saveSection("dashboardsection")
                        }}
                        className={`
                            relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                            ${active === "dashboardsection" 
                                ? "after:w-full text-[#6F4E37] font-semibold" 
                                : ""
                            } 
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
                            setActive("productsection");
                            saveSection("productsection");
                            fetchData("http://localhost:3500/products", "productList")
                        }}
                        className={`
                            relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                            ${active === "productsection" 
                                ? "after:w-full text-[#6F4E37] font-semibold" 
                                : ""
                            } 
                        `}
                    >
                        products
                    </NavLink> 
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Orders`} onClick={() => {
                            onToggleSidebar();
                            setActive("ordersection");
                            saveSection("ordersection");
                            fetchData("http://localhost:3500/orders", "orderList")
                        }}
                        className={`
                            relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                            ${active === "ordersection" 
                                ? "after:w-full text-[#6F4E37] font-semibold" 
                                : ""
                            } 
                        `}
                    >
                        orders
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Customers`} 
                        onClick={() => {
                            onToggleSidebar();
                            setActive("customersection");
                            saveSection("customersection");
                            fetchData("http://localhost:3500/customers", "customerList")
                        }}
                        className={`
                            relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                            ${active === "customersection" 
                                ? "after:w-full text-[#6F4E37] font-semibold" 
                                : ""
                            } 
                        `}
                    >
                        customers
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Employers`} 
                        onClick={() => {
                            onToggleSidebar();
                            setActive("employersection");
                            saveSection("employersection");
                            fetchData("http://localhost:3500/employers", "employerList")
                        }}
                        className={`
                            relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                            ${active === "employersection" 
                                ? "after:w-full text-[#6F4E37] font-semibold" 
                                : ""
                            } 
                        `}
                    >
                        employers
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to={`/Adminpage/${id}/${username}/Stocks`} onClick={() => {
                            onToggleSidebar();
                            setActive("stocksection")
                            saveSection("stocksection");
                            fetchData("http://localhost:3500/stocks", "stockList")
                        }}
                        className={`
                            relative text-[clamp(1.30rem,2vw,1.45rem)] text-[#3e2f23] 
                            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#6F4E37] after:transition-all after:duration-300 hover:after:w-full
                            ${active === "stocksection" 
                                ? "after:w-full text-[#6F4E37] font-semibold" 
                                : ""
                            } 
                        `}
                    >
                        stocks
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

    if( loading ){
        return (
            <div className="flex justify-center items-center bg-[#8c6244] w-full h-[100vh]">
                <div className="flex justify-center items-center flex-col w-auto h-auto m-1 p-1 gap-5">
                    <img
                        className="w-[65%] sm:w-[50%] lg:w-[45%] xl:w-[20%] h-auto rounded-[50%]"
                        src={CoffeGif}
                        alt="Coffee-Icon-Loading"
                    />
                    <p className="loader text-[2rem] font-bold font-mono w-fit">
                        Loading...
                    </p>
                </div>
            </div>
        )
    }

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
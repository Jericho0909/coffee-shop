import { useEffect, useState, useContext, useRef } from "react"
import WindowSizeContext from "../context/windowsizeContext"
import ModalContext from "../context/modalContext"
import Header from "../components/adminpageComponents/header"
import Main from "../components/adminpageComponents/main"
import Aside from "../components/adminpageComponents/aside"
import CoffeGif from "../../src/assets/gif/coffee-Gif.gif"
import Notification from "../components/notification"
import Modal from "../components/modal"
import ProductAdd from "../components/adminpageComponents/section/ProductComponents/product/productadd"
import ProductUpdate from "../components/adminpageComponents/section/ProductComponents/product/productupdate"
import ProductDetails from "../components/adminpageComponents/section/ProductComponents/product/productdetails"
const Adminpage = () => {
    const [ loading, setLoading ] = useState(true)
    const [ opensidebar, setOpenSiderBar ] = useState(false)
    const { isMobile } = useContext(WindowSizeContext)
    const { isOpen, modalName } = useContext(ModalContext)
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
        detailProduct: <ProductDetails/>
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
        <>  
            <Notification/>
            <Header setOpenSiderBar = { setOpenSiderBar }/>
            <div className="flex w-full min-h-screen">
                {isMobile ?(
                    <aside
                        ref={sidebarRef}
                        onClick={(e) => e.stopPropagation()}
                        className={`fixed top-[5rem] left-0 w-full md:w-[40%] h-full bg-[#f9f5f1] border border-[#8c6244] shadow-md z-50 transform transition-transform duration-300 ease-in-out
                        ${opensidebar ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <Aside
                            setOpenSiderBar = {setOpenSiderBar}
                        />
                    </aside>
                ) : (
                    <aside
                        ref={sidebarRef}
                        className="w-auto h-auto bg-[#f9f5f1] border border-[#8c6244] shadow-md mt-[6rem] p-1"
                    >
                        <Aside
                            setOpenSiderBar = {setOpenSiderBar}
                        />
                    </aside>
                )}
                {(isOpen ) && (
                <Modal>
                    {modalComponents[modalName]}
                </Modal>
            )}
                <Main />
            </div>
        </>
    )
}

export default Adminpage
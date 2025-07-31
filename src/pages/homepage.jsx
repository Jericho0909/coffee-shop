import { useContext } from "react";
import Header from "../components/homepageComponents/header";
import Main from "../components/homepageComponents/main";
import Footer from "../components/homepageComponents/footer";
import Login from "../components/homepageComponents/auth/login";
import Signup from "../components/homepageComponents/auth/signup";
import Forgot from "../components/homepageComponents/auth/forgotpass";
import Notification from "../components/notification";
import Modal from "../components/modal";
import ModalContext from "../context/modalContext";
import AuthviewContext from "../context/autviewContext";
import Modalicon from "../assets/icons/coffee-icon2.png"

const Homepage = () => {
    const { isOpen } = useContext(ModalContext)
    const { authView } = useContext(AuthviewContext)

    const setView ={
        login : <Login/>,
        signup: <Signup/>,
        forgot: <Forgot/>
    }

  return (
    <>
        <Notification/>
        <Header/>   
        <Main/>
        <Footer/>
        { isOpen && (
        <Modal>
            <div className="w-[20%] h-auto">
                <img 
                src={Modalicon}
                alt="Coffe"
                className="w-full h-full m-1 p1"
                />
            </div>
            {setView[authView]}
            
        </Modal>
      )}
    </>
  );
};

export default Homepage;

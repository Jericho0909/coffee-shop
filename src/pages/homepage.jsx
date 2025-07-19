import Header from "../components/homepageComponents/header";
import Main from "../components/homepageComponents/main";
import Footer from "../components/homepageComponents/footer";
import Notification from "../components/notification";

const Homepage = () => {

  return (
    <>
      <Notification/>
      <Header/>
      <Main/>
      <Footer/>
    </>
  );
};

export default Homepage;

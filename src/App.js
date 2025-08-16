import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";
import Adminpage from "./pages/adminpage";
import Dashboard from "./components/adminpageComponents/section/dashboard";
import Products from "./components/adminpageComponents/section/product";
import Customers from "./components/adminpageComponents/section/customer";
import Orders from "./components/adminpageComponents/section/order";
import StaffandBarista from "./components/adminpageComponents/section/staff/barista";
import { WindowSizeProvider } from "./context/windowsizeContext";
import { SectionProvider } from "./context/sectionContext";
import { MediaQueryProvider } from "./context/mediaqueryContext";
import { ModalProvider } from "./context/modalContext";
import { AuthviewProvider } from "./context/autviewContext";
import { FetchDataProvider } from "./context/fetchdataContext";
import { ActionProvider } from "./context/actionContext";
import { ImageProvider } from "./context/imageContext";
import { ContainerProvider } from "./context/containerContext";

function App() {
  return (
    <div className="App">
      <FetchDataProvider>
        <ActionProvider>
          <WindowSizeProvider>
            <SectionProvider>
              <MediaQueryProvider>
                <ModalProvider>
                  <AuthviewProvider>
                    <ImageProvider>
                      <ContainerProvider>
                        <Routes>
                          <Route path="/" element={<Homepage/>
                          }/>
                          <Route path="/Adminpage/:id/:username" element={<Adminpage/>}>
                              <Route index element={<Navigate to="Dashboard" replace />} />
                              <Route path="Dashboard" element={<Dashboard/>}/>
                              <Route path="Products" element={<Products/>}/>
                              <Route path="Customers" element={<Customers/>}/>
                              <Route path="Orders" element={<Orders/>}/>
                              <Route path="StaffandBarista" element={<StaffandBarista/>}/>
                          </Route>
                        </Routes>
                      </ContainerProvider>
                    </ImageProvider>
                  </AuthviewProvider>
                </ModalProvider>
              </MediaQueryProvider>
            </SectionProvider>
        </WindowSizeProvider>
      </ActionProvider>
      </FetchDataProvider>
    </div>
  );
}

export default App;

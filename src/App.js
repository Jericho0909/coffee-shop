import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";
import Adminpage from "./pages/adminpage";
import Customerpage from "./pages/customerpage";
import Dashboard from "./components/adminpageComponents/section/dashboard";
import Products from "./components/adminpageComponents/section/product";
import Customers from "./components/adminpageComponents/section/customer";
import Orders from "./components/adminpageComponents/section/order";
import Employers from "./components/adminpageComponents/section/employers";
import Menu from "./components/customerpageComponents/section/menu";
import OrderHistory from "./components/customerpageComponents/section/orderhistory";
import Settings from "./components/customerpageComponents/section/settings";
import { WindowSizeProvider } from "./context/windowsizeContext";
import { SectionProvider } from "./context/sectionContext";
import { MediaQueryProvider } from "./context/mediaqueryContext";
import { ModalProvider } from "./context/modalContext";
import { AuthviewProvider } from "./context/autviewContext";
import { FetchDataProvider } from "./context/fetchdataContext";
import { ActionProvider } from "./context/actionContext";
import { ImageProvider } from "./context/imageContext";
import { ContainerProvider } from "./context/containerContext";
import { AuthValidationProvider } from "./context/authvalidationContext";
import { AddHighlightProvider } from "./context/addhighlightContext";
import { CustomerOrderProvider } from "./context/customerorderContext";

function App() {
  return (
    <div className="App">
      <FetchDataProvider>
        <ActionProvider>
          <WindowSizeProvider>
            <MediaQueryProvider>
              <ModalProvider>
                <AuthValidationProvider>
                  <AuthviewProvider>
                    <Routes>
                      <Route 
                        path="/" 
                        element={
                          <SectionProvider>
                            <Homepage/>
                          </SectionProvider>
                        }
                      />
                      <Route 
                        path="/Adminpage/:id/:username" element={
                          <ImageProvider>
                            <ContainerProvider>
                              <AddHighlightProvider>
                                <Adminpage/>
                              </AddHighlightProvider>
                            </ContainerProvider>
                          </ImageProvider>
                        }
                      >
                        <Route index element={
                        <Navigate to="Dashboard" replace />} />
                        <Route path="Dashboard" element={<Dashboard/>}/>
                        <Route path="Products" element={<Products/>}/>
                        <Route path="Customers" element={<Customers/>}/>
                        <Route path="Orders" element={<Orders/>}/>
                        <Route path="Employers" element={<Employers/>}/>
                      </Route>
                      <Route
                        path="/Customerpage/:id/:username"
                        element={
                          <ImageProvider>
                            <AddHighlightProvider>
                              <CustomerOrderProvider>
                                <Customerpage/>
                              </CustomerOrderProvider>
                            </AddHighlightProvider>
                          </ImageProvider>
                        }
                      >
                        <Route index element={
                          <Navigate to="Menu" replace />} 
                        />
                        <Route path="Menu" element={<Menu/>}/>
                        <Route path="History" element={<OrderHistory/>}/>
                        <Route path="Settings" element={<Settings/>}/>
                      </Route>
                    </Routes>
                  </AuthviewProvider>
                </AuthValidationProvider>
              </ModalProvider>
            </MediaQueryProvider>
        </WindowSizeProvider>
      </ActionProvider>
      </FetchDataProvider>
    </div>
  );
}

export default App;

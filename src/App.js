import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";
import Adminpage from "./pages/adminpage";
import Customerpage from "./pages/customerpage";
import Dashboard from "./components/adminpageComponents/section/dashboard";
import Products from "./components/adminpageComponents/section/product";
import Customers from "./components/adminpageComponents/section/customer";
import Orders from "./components/adminpageComponents/section/order";
import Employers from "./components/adminpageComponents/section/employers";
import Stocks from "./components/adminpageComponents/section/stock";
import Menu from "./components/customerpageComponents/section/menu";
import CustomerOrders from "./components/customerpageComponents/section/customerorders";
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
import { ShowToastProvider } from "./context/showtoastContext";
import { SearchProvider } from "./context/searchContext";
import { SuggestionProvider } from "./context/suggestionContext";
import { HandleKeyProvider } from "./context/handlekeyContext";
import { FirebaseFetchDataProvider } from "./context/firebasefetchdataContext";
import { FirebaseActionProvider } from "./context/firebaseactionContext";

function App() {
  return (
    <div className="App">
      <FetchDataProvider>
        <ActionProvider>
          <FirebaseFetchDataProvider>
            <FirebaseActionProvider>
              <WindowSizeProvider>
                <MediaQueryProvider>
                  <ModalProvider>
                    <AuthValidationProvider>
                      <AuthviewProvider>
                        <ShowToastProvider>
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
                                        <SearchProvider>
                                          <Adminpage/>
                                        </SearchProvider>
                                    </AddHighlightProvider>
                                  </ContainerProvider>
                                </ImageProvider>
                              }
                            >
                              <Route index element={
                              <Navigate to="Dashboard" replace />} />
                              <Route path="Dashboard" element={<Dashboard/>}/>
                              <Route path="Products" element={
                                <SearchProvider>
                                  <SuggestionProvider>
                                    <HandleKeyProvider>
                                      <Products/>
                                    </HandleKeyProvider>
                                  </SuggestionProvider>
                                </SearchProvider>
                              }/>
                              <Route path="Customers" element={
                                <SearchProvider>
                                  <SuggestionProvider>
                                    <HandleKeyProvider>
                                      <Customers/>
                                    </HandleKeyProvider>
                                  </SuggestionProvider>
                                </SearchProvider>
                              }/>
                              <Route path="Orders" element={
                                <SearchProvider>
                                  <SuggestionProvider>
                                    <HandleKeyProvider>
                                      <Orders/>
                                    </HandleKeyProvider>
                                  </SuggestionProvider>
                                </SearchProvider>
                              }/>
                              <Route path="Employers" element={
                                <SearchProvider>
                                  <SuggestionProvider>
                                    <HandleKeyProvider>
                                      <Employers/>
                                    </HandleKeyProvider>
                                  </SuggestionProvider>
                                </SearchProvider>
                              }/>
                              <Route path="Stocks" element={
                                <SearchProvider>
                                  <SuggestionProvider>
                                    <HandleKeyProvider>
                                      <Stocks/>
                                    </HandleKeyProvider>
                                  </SuggestionProvider>
                                </SearchProvider>
                              }/>
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
                              <Route path="Menu" element={
                                <SearchProvider>
                                  <SuggestionProvider>
                                    <HandleKeyProvider>
                                      <Menu/>
                                    </HandleKeyProvider>
                                  </SuggestionProvider>
                                </SearchProvider>
                              }/>
                              <Route path="CustomerOrders" element={<CustomerOrders/>}/>
                              <Route path="Settings" element={<Settings/>}/>
                            </Route>
                          </Routes>
                        </ShowToastProvider>
                      </AuthviewProvider>
                    </AuthValidationProvider>
                  </ModalProvider>
                </MediaQueryProvider>
              </WindowSizeProvider>
          </FirebaseActionProvider>
          </FirebaseFetchDataProvider>
      </ActionProvider>
      </FetchDataProvider>
    </div>
  );
}

export default App;

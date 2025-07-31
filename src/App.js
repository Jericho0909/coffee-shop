import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import Adminpage from "./pages/adminpage";
import { WindowSizeProvider } from "./context/windowsizeContext";
import { SectionProvider } from "./context/sectionContext";
import { MediaQueryProvider } from "./context/mediaqueryContext";
import { ModalProvider } from "./context/modalContext";
import { AuthviewProvider } from "./context/autviewContext";
import { FetchDataProvider } from "./context/fetchdataContext";
import { ActionProvider } from "./context/actionContext";
function App() {
  return (
    <div className="App">
      <FetchDataProvider>
        <ActionProvider>
          <WindowSizeProvider>
            <SectionProvider>
              <MediaQueryProvider>
                <ModalProvider>
                  <Routes>
                    <Route path="/" element={
                      <AuthviewProvider>
                        <Homepage/>
                      </AuthviewProvider>
                    }/>
                    <Route path="/Adminpage/:id/:username" element={
                      <Adminpage/>
                    }/>
                  </Routes>
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

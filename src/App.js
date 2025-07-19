import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import { WindowSizeProvider } from "./context/windowsizeContext";
import { SectionProvider } from "./context/sectionContext";
import { MediaQueryProvider } from "./context/mediaquery";
function App() {
  return (
    <div className="App">
      <WindowSizeProvider>
        <SectionProvider>
          <MediaQueryProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </MediaQueryProvider>
        </SectionProvider>
      </WindowSizeProvider>
    </div>
  );
}

export default App;

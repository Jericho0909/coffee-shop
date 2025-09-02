import { createContext, useState } from "react";

const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const [ activeSection, setActiveSection ] = useState(null);

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export default SectionContext
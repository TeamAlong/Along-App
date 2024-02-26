import React, { createContext, useContext, useState } from "react";

const UiContext = createContext();

export const useUi = () => useContext(UiContext);

export const UiProvider = ({ children }) => {
  const [showSpin, setShowSpin] = useState(true);
  const 

  return (
    <UiContext.Provider value={{ showSpin, setShowSpin }}>
      {children}
    </UiContext.Provider>
  );
};

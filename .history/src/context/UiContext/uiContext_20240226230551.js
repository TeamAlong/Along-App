import React, { createContext, useContext, useState } from "react";

const UiContext = createContext();

export const useUi = () => useContext(UiContext);

export const UiProvider = ({ children }) => {
  const [showSpin, setShowSpin] = useState(true);
  const [showBtn, setShowBtn] = useState(true);
  const [showArriving, setShowArriving] = useState(false);

  return (
    <UiContext.Provider value={{ showSpin, setShowSpin , setShowBtn,showBtn, showArriving}}>
      {children}
    </UiContext.Provider>
  );
};

import { createContext, useContext, useState } from "react";

export const FromContext = createContext();
export const useFrom = () => useContext(FromContext);

export const FromProvider = ({ children }) => {
  const [source, setSource] = useState([]);

  return (
    <FromContext.Provider
      value={{
        source,
        setSource,
      }}
    >
      {children}
    </FromContext.Provider>
  );
};

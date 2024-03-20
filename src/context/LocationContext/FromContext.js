import { createContext, useContext, useState } from "react";

export const FromContext = createContext();
export const useFrom = () => useContext(FromContext);

export const FromProvider = ({ children }) => {
  //const [source, setSource] = useState([]);
  const [source, setSource] = useState(null);
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

import { createContext, useContext, useState } from "react"

export const DestinationContext = createContext();

export const useDestination = () => useContext(DestinationContext);

export const DestinationProvider = ({ children }) => {
  //const [destination, setDestination] = useState([]);
  const [destination, setDestination] = useState(null);

  return (
    <DestinationContext.Provider
      value={{
        destination,
        setDestination,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

// tripContext.js
import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const useTrip = () => useContext(TripContext);

export const TripProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [driverLocation, setDriverLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  return (
    <TripContext.Provider
      value={{
        userLocation,
        setUserLocation,
        driverLocation,
        setDriverLocation,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

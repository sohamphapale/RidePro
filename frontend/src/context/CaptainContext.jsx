import React, { createContext, useContext, useState } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [RideDetails, setRideDetails] = useState({});

  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicles: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  return (
    <CaptainDataContext.Provider
      value={{ captain, setCaptain, RideDetails, setRideDetails }}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;

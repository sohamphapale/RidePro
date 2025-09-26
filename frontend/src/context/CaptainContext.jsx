import React, { createContext, useContext, useState } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  return (
    <CaptainDataContext.Provider
      value={(captain, setCaptain, isLoading, setIsLoading)}
    >
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;

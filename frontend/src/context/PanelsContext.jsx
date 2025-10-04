import React, { createContext, useContext, useState } from "react";

export const PanelsDataContext = createContext();

const PanelsContext = ({ children }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehivlePanel, setVehivlePanel] = useState(false);
  const [ConfirmeRide, setConfirmeRide] = useState(false);
  return (
    <PanelsDataContext.Provider
      value={{
        panelOpen,
        setPanelOpen,
        vehivlePanel,
        setVehivlePanel,
        ConfirmeRide,
        setConfirmeRide,
      }}
    >
      {children}
    </PanelsDataContext.Provider>
  );
};

export default PanelsContext;

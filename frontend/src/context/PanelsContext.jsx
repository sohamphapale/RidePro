import React, { createContext, useContext, useState } from "react";

export const PanelsDataContext = createContext();

const PanelsContext = ({ children }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehivlePanel, setVehivlePanel] = useState(false);
  const [ConfirmeRide, setConfirmeRide] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [RidePopUpPanel, setRidePopUpPanel] = useState(true);
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  return (
    <PanelsDataContext.Provider
      value={{
        panelOpen,
        setPanelOpen,
        vehivlePanel,
        setVehivlePanel,
        ConfirmeRide,
        setConfirmeRide,
        vehicleFound,
        setVehicleFound,
        RidePopUpPanel,
        setRidePopUpPanel,
        ConfirmRidePopUpPanel,
        setConfirmRidePopUpPanel,
      }}
    >
      {children}
    </PanelsDataContext.Provider>
  );
};

export default PanelsContext;

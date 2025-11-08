import React, { createContext, useContext, useState } from "react";

export const PanelsDataContext = createContext();

const PanelsContext = ({ children }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehivlePanel, setVehivlePanel] = useState(false);
  const [ConfirmeRide, setConfirmeRide] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [lookingForDriver, setLookingForDriver] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fare, setFare] = useState({});
  const [ChooseVehicle, setChooseVehicle] = useState({ type: "", fare: 0 });
  const [pickLocation, setPickLocation] = useState("");
  const [destLocation, setDestLocation] = useState("");
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
        pickup,
        setPickup,
        destination,
        setDestination,
        fare,
        setFare,
        ChooseVehicle,
        setChooseVehicle,
        pickLocation,
        setPickLocation,
        destLocation,
        setDestLocation,
        lookingForDriver,
        setLookingForDriver,
      }}
    >
      {children}
    </PanelsDataContext.Provider>
  );
};

export default PanelsContext;

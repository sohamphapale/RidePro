import React, { createContext, useContext, useState } from "react";

export const CaptainPanelsContext = createContext();

const CaptainPanels = ({ children }) => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [RidePopUpPanel, setRidePopUpPanel] = useState(false);
  return (
    <CaptainPanelsContext.Provider
      value={{
        finishRidePanel,
        setFinishRidePanel,
        ConfirmRidePopUpPanel,
        setConfirmRidePopUpPanel,
        RidePopUpPanel,
        setRidePopUpPanel,
      }}
    >
      {children}
    </CaptainPanelsContext.Provider>
  );
};

export default CaptainPanels;

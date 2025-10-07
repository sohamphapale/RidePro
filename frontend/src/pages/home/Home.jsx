import React, { useContext } from "react";
import LocationSearchPanel from "./components/LocationSearchPanel";
import ChooseVehiclePanle from "./components/ChooseVehiclePanle";
import { PanelsDataContext } from "../../context/PanelsContext";
import ConfirmeRidePanel from "./components/ConfirmeRidePanel";
import VehicleFoundPanel from "./components/VehicleFoundPanel";

const Home = () => {
  return (
    <div>
      <div className="h-screen relative overflow-hidden">
        <img
          className="w-16 absolute top-5 left-5"
          src="ridepro_logo.png"
          alt="RidePro Logo"
        />
        <div className="h-screen w-screen ">
          {/* image for temporary */}
          <img className="h-full w-full object-cover" src="mapimg.gif" />
        </div>
        <LocationSearchPanel />
        <ChooseVehiclePanle />
        <ConfirmeRidePanel />
        <VehicleFoundPanel />
      </div>
    </div>
  );
};

export default Home;

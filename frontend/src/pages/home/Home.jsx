import React, { use, useContext, useEffect } from "react";
import LocationSearchPanel from "./components/LocationSearchPanel";
import ChooseVehiclePanle from "./components/ChooseVehiclePanle";
import { PanelsDataContext } from "../../context/PanelsContext";
import ConfirmeRidePanel from "./components/ConfirmeRidePanel";
import VehicleFoundPanel from "./components/VehicleFoundPanel";
import SocketContext from "../../context/SocketContext";
import { UserDataContext } from "../../context/UserContext";
import LookingForDriver from "./components/lookingForDriver";

const Home = () => {
  const { reciveMessage, sendMessage, socket } = useContext(SocketContext);
  const { setLookingForDriver, setVehicleFound } =
    useContext(PanelsDataContext);
  const { user, setUser, setUserRideDetails, userRideDetails } =
    useContext(UserDataContext);

  useEffect(() => {
    console.log(user._id);

    sendMessage("join", { userType: "user", userId: user._id });
  }, []);

  useEffect(() => {
    if (!socket) return;

    reciveMessage("ride_confirmed", async (data) => {
      console.log(data);
      await setUserRideDetails(data);
      setLookingForDriver(false);
      setVehicleFound(true);
    });

    return () => {
      socket.off("ride_confirmed");
    };
  }, [socket]);

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
        <LookingForDriver />
      </div>
    </div>
  );
};

export default Home;

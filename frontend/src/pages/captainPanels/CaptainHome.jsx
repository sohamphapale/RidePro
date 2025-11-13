import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "./components/CaptainDetails";
import RidePopUp from "./components/RidePopUp";
import ConfirmRidePopUp from "./components/ConfirmRidePopUp";
import SocketContext from "../../context/SocketContext";
import { CaptainDataContext } from "../../context/CaptainContext";
import { CaptainPanelsContext } from "../../context/CaptainPanels";
import OTPConfirm from "./components/OTPConfirm";

const CaptainHome = () => {
  const { reciveMessage, sendMessage, socket } = useContext(SocketContext);
  const { captain, setRideDetails } = useContext(CaptainDataContext);
  const { setRidePopUpPanel, RidePopUpPanel } =
    useContext(CaptainPanelsContext);

  useEffect(() => {
    sendMessage("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          sendMessage("update-location-captain", {
            userId: captain._id,
            location: { ltd: latitude, lng: longitude },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 5000);
    updateLocation(); // Initial call immediately
    return () => clearInterval(locationInterval);
  }, []);

  useEffect(() => {
    if (!socket) return;

    reciveMessage("new-ride", (data) => {
      setRidePopUpPanel(true);
      setRideDetails(data);
    });

    // optional cleanup
    return () => {
      socket.off("new-ride");
    };
  }, [socket]);

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-screen w-screen ">
        {/* image for temporary */}
        <img className="h-full w-full object-cover" src="mapimg.gif" />
      </div>
      {/* captain Details */}
      <CaptainDetails />
      {RidePopUpPanel && <RidePopUp />}
      <ConfirmRidePopUp />
    </div>
  );
};

export default CaptainHome;

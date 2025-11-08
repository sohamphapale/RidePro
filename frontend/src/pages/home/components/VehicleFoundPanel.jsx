import React, { useContext, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PanelsDataContext } from "../../../context/PanelsContext";
import { UserDataContext } from "../../../context/UserContext";

const VehicleFoundPanel = () => {
  gsap.registerPlugin(useGSAP);
  const VehicleFoundRef = useRef(null);
  const {
    vehicleFound,
    setVehicleFound,
    destLocation,
    destination,
    ChooseVehicle,
  } = useContext(PanelsDataContext);
  const { setUserRideDetails, userRideDetails } = useContext(UserDataContext);

  useEffect(() => {
    if (vehicleFound) {
      gsap.to(VehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(VehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  const btnClick = () => {
    setVehicleFound(true);
    setConfirmeRide(false);
  };

  return (
    <div className="h-full w-screen top-0 overflow-hidden">
      <div
        ref={VehicleFoundRef}
        className="fixed z-10 translate-y-full  justify-end bottom-0 bg-white w-screen p-2 px-4"
      >
        <div>
          {/* time meet at the locaiton */}
          <div className="flex justify-between  py-3 border-b border-gray-200 items-center ">
            <h3 className="text-xl font-semibold text-center  mb-2">
              Meet at the pickup point
            </h3>
            <div className="flex  flex-col justify-center rounded-sm\ items-center h-13 w-13 bg-black text-white font-medium">
              <p className="text-center">2</p>
              <p className="text-center">min</p>
            </div>
          </div>

          <div className="flex justify-between py-2">
            {/* img content */}
            <div className="relative flex items-center">
              {/* Captain image (front) */}
              <div className="relative z-10 w-18 h-18 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src="/captain.jpg"
                  alt="Captain"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Car image (behind) */}
              <div className="absolute left-12 w-18 h-18 rounded-full overflow-hidden">
                <img
                  src="/cars/Maruti Dzire VDI .webp"
                  alt="Car"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            </div>
            {/* car info and driver reting */}
            <div className="text-right text-[#545454] font-medium">
              <p>{userRideDetails.captain?.fullname.firstname}</p>
              <h3 className="font-bold text-black">
                {userRideDetails.captain?.vehicles.plate}
              </h3>
              <p>{userRideDetails.captain?.vehicles.color}</p>
              <span>
                capacity: {userRideDetails.captain?.vehicles.capacity}
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="text-[#6B6B6B] bg-[#eee] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
          >
            Send a message...
            <i className="ri-send-plane-2-fill"></i>
          </button>
        </div>
        <div className="flex justify-around m-1 pb-5  border-b border-gray-200 ">
          <div className="flex flex-col justify-center items-center">
            <button
              type="button"
              className="text-[#6B6B6B] justify-center  bg-[#eee] h-16 w-16 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm  text-center inline-flex items-center dark:focus:ring-gray-500 m-2"
            >
              <i className="ri-shield-line text-2xl text-blue-500"></i>
            </button>
            <p>Safety</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button
              type="button"
              className="text-[#6B6B6B] justify-center  bg-[#eee] h-16 w-16 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm  text-center inline-flex items-center dark:focus:ring-gray-500 m-2"
            >
              <i className="ri-user-location-fill text-2xl text-blue-500"></i>
            </button>
            <p>Share my trip</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center w-full h-full ">
              <button
                type="button"
                className="text-[#6B6B6B] justify-center bg-[#eee] h-16 w-16 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-full text-sm  text-center inline-flex items-center dark:focus:ring-gray-500 m-2"
              >
                <i className="ri-phone-fill text-2xl text-blue-500"></i>
              </button>
            </div>
            <p>Call driver</p>
          </div>
        </div>
        {/* location */}
        <div className="flex justify-center  items-center  m-1 p-3 border-b border-gray-200  mb-7 mt-2">
          <div className="w-[40px]">
            <i className="ri-map-pin-fill"></i>
          </div>
          <div className="w-full  ">
            <h4 className="text-xl font-bold">{destLocation}</h4>
            <h5 className="font- text-sm">{destination}</h5>
          </div>
        </div>
        <div className="flex justify-center my-3">
          <button
            onClick={() => btnClick()}
            type="button"
            className="w-2/3  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Make a Payment (₹{ChooseVehicle.fare})
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleFoundPanel;

// conent adding is done

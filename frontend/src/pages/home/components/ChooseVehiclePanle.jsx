import React, { useContext, useEffect, useRef, useState } from "react";
import { PanelsDataContext } from "../../../context/PanelsContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { UserDataContext } from "../../../context/UserContext";

const ChooseVehiclePanle = () => {
  gsap.registerPlugin(useGSAP);
  const {
    vehivlePanel,
    setConfirmeRide,
    setVehivlePanel,
    fare,
    ChooseVehicle,
    setChooseVehicle,
  } = useContext(PanelsDataContext);
  const vehivlePanelRef = useRef(null);
  useEffect(() => {
    if (vehivlePanel) {
      gsap.to(vehivlePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehivlePanelRef.current, {
        transform: "translateY(100%)",
        duration: 1, // optional: controls speed
      });
    }
  }, [vehivlePanel]);

  const onClick = (type, fare) => {
    setChooseVehicle({ type: type, fare: fare });
    
  };
  const onChoose = () => {
    setConfirmeRide(true);
    setVehivlePanel(false);
  };

  return (
    <div>
      <div className="h-full w-screen top-0">
        <div
          ref={vehivlePanelRef}
          className="fixed z-10 translate-y-full justify-end bottom-0 bg-white w-screen p-3 py-5"
        >
          <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
          <div
            onClick={() => onClick("Go", fare.car)}
            className={`flex items-center justify-between m-1 p-3 border-2 ${
              ChooseVehicle.type === "Go" ? "border-black" : "border-gray-200"
            } rounded-xl cursor-pointer`}
          >
            <img className="h-18 pr-2" src="RideProCarPng.webp" alt="" />
            <div className="w-1/2">
              <h4 className="font-medium text-sm">
                RideGO
                <span>
                  <i className="ri-user-3-fill"></i>4
                </span>
              </h4>
              <h5 className="text-sm">2mins</h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable, compact ride
              </p>
            </div>
            <h2 className="text-xl font-semibold">₹{fare.car}</h2>
          </div>
          <div
            onClick={() => onClick("Auto", fare.auto)}
            className={`flex items-center justify-between m-1 p-3 border-2 ${
              ChooseVehicle.type === "Auto" ? "border-black" : "border-gray-200"
            } rounded-xl cursor-pointer`}
          >
            <img className="h-12 pr-2" src="RideProAutoPng.webp" alt="" />
            <div className="w-1/2">
              <h4 className="font-medium text-sm">
                Ride Auto
                <span>
                  <i className="ri-user-3-fill"></i>4
                </span>
              </h4>
              <h5 className="text-sm">5mins</h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable, Auto rides
              </p>
            </div>
            <h2 className="text-xl font-semibold">₹{fare.auto}</h2>
          </div>
          <div
            onClick={() => onClick("Moto", fare.motorcycle)}
            className={`flex items-center justify-between m-1 p-3 border-2 ${
              ChooseVehicle.type === "Moto" ? "border-black" : "border-gray-200"
            } rounded-xl cursor-pointer`}
          >
            <img className="h-12 pr-2" src="RideProMotoPng.webp" alt="" />
            <div className="w-1/2">
              <h4 className="font-medium text-sm">
                Ride Moto
                <span>
                  <i className="ri-user-3-fill"></i>1
                </span>
              </h4>
              <h5 className="text-sm">3mins</h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable, motorcycle ride
              </p>
            </div>
            <h2 className="text-xl font-semibold">₹{fare.motorcycle}</h2>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="button"
              onClick={onChoose}
              className="w-2/3 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Choose Ride {ChooseVehicle.type}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseVehiclePanle;

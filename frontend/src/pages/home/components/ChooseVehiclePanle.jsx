import React, { useContext, useEffect, useRef } from "react";
import { PanelsDataContext } from "../../../context/PanelsContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const ChooseVehiclePanle = () => {
  gsap.registerPlugin(useGSAP);
  const { vehivlePanel, setConfirmeRide } = useContext(PanelsDataContext);

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

  const onClick = () => {
    setConfirmeRide(true);
  };

  return (
    <div>
      <div className="h-full w-screen top-0">
        <div
          ref={vehivlePanelRef}
          className="fixed z-10 translate-y-full justify-end bottom-0 bg-white w-screen p-3 py-5"
        >
          <h3 className="text-2xl font-semibold  mb-5">Choose a Vehicle</h3>
          <div
            onClick={onClick}
            className="flex  items-center justify-between m-1 p-3 border-2 border-gray-200   active:border-black rounded-xl"
          >
            <img className="h-18 pr-2" src="RideProCarPng.webp" alt="" />
            <div className=" w-1/2">
              <h4 className="font-medium text-sm">
                RideGO
                <span>
                  <i className="ri-user-3-fill"></i>4
                </span>
              </h4>
              <h5 className="font- text-sm">2mins </h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable, compact ride
              </p>
            </div>
            <h2 className="text-xl font-semibold">₹193.02</h2>
          </div>
          <div
            onClick={onClick}
            className="flex  items-center justify-between m-1 p-3 border-2 border-gray-200  active:border-black rounded-xl"
          >
            <img className="h-12 pr-2" src="RideProAutoPng.webp" alt="" />
            <div className=" w-1/2">
              <h4 className="font-medium text-sm">
                Ride Auto
                <span>
                  <i className="ri-user-3-fill"></i>4
                </span>
              </h4>
              <h5 className="font- text-sm">5mins </h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable, Auto rides
              </p>
            </div>
            <h2 className="text-xl font-semibold">₹118.68</h2>
          </div>
          <div
            onClick={onClick}
            className="flex  items-center justify-between m-1 p-3 border-2 border-gray-200   active:border-black rounded-xl"
          >
            <img className="h-12 pr-2" src="RideProMotoPng.webp" alt="" />
            <div className=" w-1/2">
              <h4 className="font-medium text-sm">
                Ride Moto
                <span>
                  <i className="ri-user-3-fill"></i>1
                </span>
              </h4>
              <h5 className="font- text-sm">3mins </h5>
              <p className="font-normal text-xs text-gray-600">
                Affordable,\ motorcycle ride
              </p>
            </div>
            <h2 className="text-xl font-semibold">₹65.17</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseVehiclePanle;

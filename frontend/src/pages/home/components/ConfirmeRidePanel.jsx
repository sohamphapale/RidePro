import React, { useContext, useEffect, useRef } from "react";
import { PanelsDataContext } from "../../../context/PanelsContext";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ConfirmeRidePanel = () => {
  gsap.registerPlugin(useGSAP);
  const ConfirmeRideRef = useRef(null);
  const { ConfirmeRide, vehicleFound, setVehicleFound } =
    useContext(PanelsDataContext);

  useEffect(() => {
    if (ConfirmeRide) {
      gsap.to(ConfirmeRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ConfirmeRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ConfirmeRide]);

  const btnClick = () => {
    setVehicleFound(true);
    setConfirmeRide(false);
  };
  return (
    <div>
      <div className="h-full w-screen top-0">
        <div
          ref={ConfirmeRideRef}
          className="fixed z-10 translate-y-full justify-end bottom-0 bg-white w-screen p-3 py-5"
        >
          <h3 className="text-2xl font-semibold text-center mb-2">
            Looking for nearby drivers
          </h3>
          {/* this is for line */}
          <div className="w-full flex ">
            <div className="bg-radial from-[#276EF1] from-10%  w-full h-[3px]  rounded-b-full"></div>
            <div className="bg-radial from-[#276EF1] from-10%  w-full h-[3px]  rounded-b-full"></div>
          </div>
          {/* this is for car img */}
          <div className="flex items-center justify-center w-full border-b border-gray-200 p-10">
            <div className="flex justify-center   bg-[#EFF3FE] h-20 w-56  rounded-full">
              <div className="flex bg-[#D3E1FB] h-16 w-40 m-1 justify-center  rounded-full ">
                <img
                  className="h-26 pr-2 self-baseline-last"
                  src="RideProCarPng.webp"
                  alt=""
                />
              </div>
            </div>
          </div>
          {/* more info */}
          <div>
            {/* location */}
            <div className="flex  items-center  m-1 p-3 border-b border-gray-200  ">
              <div className="w-[40px]">
                <i class="ri-square-fill"></i>
              </div>
              <div className="w-full  ">
                <h4 className="text-xl font-bold">562/11-A</h4>
                <h5 className="font- text-sm">
                  Kailondrahialli, Benguluru, karnataka
                </h5>
              </div>
            </div>
            {/* near by */}
            <div className="flex  items-center  m-1 p-3 border-b border-gray-200 ">
              <div className="w-[40px]">
                <i class="ri-square-fill"></i>
              </div>
              <div className="w-full ">
                <h4 className="text-xl font-bold">Third Wave Coffee</h4>
                <h5 className="font- text-sm">
                  17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout,
                  Bengaluru, karnataka
                </h5>
              </div>
            </div>
            {/* ride price */}
            <div className="flex  items-center  m-1 p-3 border-b border-gray-200  ">
              <div className="w-[40px]">
                <i class="ri-bank-card-2-fill"></i>
              </div>
              <div className="w-full ">
                <h4 className="text-xl font-bold">₹193.20</h4>
                <h5 className="font- text-sm">Cash, Cash</h5>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <button
              onClick={btnClick}
              type="button"
              class="w-2/3  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmeRidePanel;

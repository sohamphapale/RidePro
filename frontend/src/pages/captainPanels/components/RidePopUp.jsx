import { useContext, useEffect, useRef } from "react";
import { PanelsDataContext } from "../../../context/PanelsContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const RidePopUp = () => {
  gsap.registerPlugin(useGSAP);
  const RidePopUpRef = useRef(null);
  const { RidePopUpPanel, setRidePopUpPanel, setConfirmRidePopUpPanel } =
    useContext(PanelsDataContext);

  useEffect(() => {
    if (RidePopUpPanel) {
      gsap.to(RidePopUpRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(RidePopUpRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [RidePopUpPanel]);

  const onConfirmClick = () => {
    setConfirmRidePopUpPanel(true);
    setRidePopUpPanel(false);
  };

  return (
    <div className="  h-full w-screen top-0">
      <div
        ref={RidePopUpRef}
        className="translate-y-full fixed z-10 justify-end bottom-0 bg-white w-screen p-3 py-5"
      >
        <h3 className="text-2xl font-semibold text-center mb-2">
          New Ride Available!
        </h3>
        {/* this is for line */}
        <div className="w-full flex ">
          <div className="bg-radial from-[#276EF1] from-10%  w-full h-[3px]  rounded-b-full"></div>
          <div className="bg-radial from-[#276EF1] from-10%  w-full h-[3px]  rounded-b-full"></div>
        </div>

        {/* user info with name profile photo and distanc */}
        <div className="flex justify-between  my-3 px-3 items-center border-b border-gray-200  bg-gradient-to-tl from-red-500 via-orange-500 to-yellow-500 rounded-full">
          <div className="flex justify-between py-2 items-center">
            {/* img content */}
            <div className="relative flex items-center">
              {/* user image (front) */}
              <div className="relative z-10 w-18 h-18 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src="/captain.jpg"
                  alt="Captain"
                  className="h-full object-cover"
                />
              </div>
            </div>

            {/* user info  */}
            <div className="text-left text-[#727272] font-medium px-4">
              <h3 className="font-medium text-xl text-black ">
                Jeremiah Curtis{" "}
              </h3>
              {/* <p>Basic level</p> */}
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-xl font-bold">2.2KM</h4>
          </div>
        </div>

        <div>
          {/* location */}
          <div className="flex  items-center  m-1 p-3 border-b border-gray-200  ">
            <div className="w-[40px]">
              <i className="ri-map-pin-fill"></i>
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
              <i className="ri-square-fill"></i>
            </div>
            <div className="w-full ">
              <h4 className="text-xl font-bold">Third Wave Coffee</h4>
              <h5 className="font- text-sm">
                17th Cross Rd, PWD Quarters, 1st Sector, HSR Layout, Bengaluru,
                karnataka
              </h5>
            </div>
          </div>
          {/* ride price */}
          <div className="flex  items-center  m-1 p-3 border-b border-gray-200  ">
            <div className="w-[40px]">
              <i className="ri-bank-card-2-fill"></i>
            </div>
            <div className="w-full ">
              <h4 className="text-xl font-bold">₹193.20</h4>
              <h5 className="font- text-sm">Cash, Cash</h5>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <button
            onClick={onConfirmClick}
            type="button"
            className="w-2/3  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Confirm
          </button>

          <button
            onClick={() => setRidePopUpPanel(false)}
            type="button"
            className="w-2/3 text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Ignor
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;

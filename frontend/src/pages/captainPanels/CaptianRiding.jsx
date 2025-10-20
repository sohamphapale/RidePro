import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PanelsDataContext } from "../../context/PanelsContext.jsx";
import FinishRide from "./FinishRide.jsx";

const CaptianRideing = () => {
  const { finishRidePanel, setFinishRidePanel } = useContext(PanelsDataContext);
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
      {/* Captain Ride Details  */}
      <div className="h-full w-screen top-0 overflow-hidden">
        <div
          onClick={() => {
            setFinishRidePanel(true);
          }}
          className="fixed z-10  justify-end bottom-0 bg-yellow-400 w-screen px-2 pb-4 rounded-t-3xl"
        >
          <div className="flex justify-center text-[#919191] items-center text-center  ">
            <i className="ri-subtract-line text-5xl"></i>
          </div>
          <div className="h-1/5 px-6 py-3 flex  items-center   justify-between bg-yellow-400">
            <h4 className="font-semibold text-lg text-black ">4 KM away</h4>
            <button
              type="button"
              className="w-44  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Complete Ride
            </button>
          </div>
        </div>
        <FinishRide />
      </div>
    </div>
  );
};

export default CaptianRideing;

// <div className="flex justify-center text-[#919191] items-center text-center  ">
//   <i className="ri-subtract-line s text-5xl"></i>
// </div>

// <div className="flex justify-between py-2 items-center">
//   <div className="flex justify-between py-2 items-center">
//     {/* img content */}
//     <div className="relative flex items-center">
//       {/* user image (front) */}
//       <div className="relative z-10 w-18 h-18 rounded-full overflow-hidden border-4 border-white shadow-md">
//         <img
//           src="/captain.jpg"
//           alt="Captain"
//           className="h-full object-cover"
//         />
//       </div>
//     </div>

//     {/* user info  */}
//     <div className="text-left text-[#727272] font-medium px-4">
//       <h3 className="font-medium text-xl text-black ">
//         Jeremiah Curtis{" "}
//       </h3>
//       <p>Basic level</p>
//     </div>
//   </div>
//   <div className="text-right">
//     <h4 className="text-xl font-bold">₹193.20</h4>
//     <h5 className="font- text-sm font-medium text-[#727272]">
//     </h5>
//   </div>
// </div>

import { useContext, useEffect, useRef, useState } from "react";
import { CaptainDataContext } from "../../../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  //  fullname: {
  //     firstname: "",
  //     lastname: "",
  //   },
  //   email: "",
  //   password: "",
  //   vehicles: {
  //     color: "",
  //     plate: "",
  //     capacity: "",
  //     vehicleType: "",
  //   },

  return (
    <div className="h-full w-screen top-0 overflow-hidden">
      <div className="fixed z-10  justify-end bottom-0 bg-white w-screen p-2 px-4 rounded-t-3xl">
        {/* we are working on this panel */}

        <div className="flex justify-center text-[#919191] items-center text-center  ">
          <i className="ri-subtract-line s text-5xl"></i>
        </div>

        <div className="flex justify-between py-2 items-center">
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
                {captain.fullname.firstname}
              </h3>
              <p>Best Captain</p>
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-xl font-bold">₹193.20</h4>
            <h5 className="font- text-sm font-medium text-[#727272]">Earned</h5>
          </div>
        </div>

        {/* portfolio */}
        <div className="flex justify-center  mb-6 p-6  bg-yellow-400 rounded-2xl">
          <div className="flex flex-col w-full mx-1 justify-center text-center items-center">
            <div className="flex justify-center items-center m-2 w-full h-full ">
              <i className="ri-time-line text-4xl text-[oklch(0.68_0.13_94.3)]"></i>
            </div>
            <h3 className="font-bold text-xl ">10.2</h3>
            <h5 className="font- text-xs font-medium text-[oklch(0.68_0.13_94.3)]">
              HOURS ONLINE
            </h5>
          </div>
          <div className="flex flex-col w-full mx-1 justify-center items-center">
            <div className="flex justify-center items-center m-2 w-full h-full ">
              <i className="ri-speed-up-line text-4xl  text-[oklch(0.68_0.13_94.3)]"></i>
            </div>
            <h3 className="font-bold text-xl">30KM</h3>
            <h5 className="font- text-xs font-medium text-[oklch(0.68_0.13_94.3)]">
              HOURS ONLINE
            </h5>
          </div>
          <div className="flex flex-col w-full mx-1 justify-center items-center">
            <div className="flex justify-center items-center m-2 w-full h-full ">
              <i className="ri-bill-line text-4xl text-[oklch(0.68_0.13_94.3)]"></i>
            </div>
            <h3 className="font-bold text-xl">20</h3>
            <h5 className="font- text-xs font-medium text-[oklch(0.68_0.13_94.3)]">
              TOTAL JOBS
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;

import React from "react";

const SuggesionLocation = ({ location }) => {
  return (
    <div className="flex items-center my-2 border-2 rounded-xl border-white active:border-black justify-start ">
      <div className="flex items-center justify-center w-[25%] ">
        <h2 className="bg-[#eee] text-center rounded-full w-[25px] h-[25px]">
          <i className="ri-map-pin-fill"></i>
        </h2>
      </div>
      <h4 className="font-medium">{location}</h4>
    </div>
  );
};

export default SuggesionLocation;

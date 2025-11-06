import React from "react";

const SuggesionLocation = ({ location }) => {
  return (
    <div
      className="flex items-center my-2 border-b-2  border-gray-200 
             hover:border-black transition-all duration-200 
             py-2 px-3 hover:rounded-lg cursor-pointer"
    >
      {/* Icon Section */}
      <div className="flex items-center justify-center w-[15%]">
        <h2 className="bg-gray-100 text-center rounded-full w-[30px] h-[30px] flex items-center justify-center">
          <i className="ri-map-pin-fill text-gray-700"></i>
        </h2>
      </div>

      {/* Location Text */}
      <h4
        className="font-medium text-gray-800 w-[85%] truncate"
        title={location}
      >
        {location.length > 40 ? location.slice(0, 50) + "..." : location}
      </h4>
    </div>
  );
};

export default SuggesionLocation;

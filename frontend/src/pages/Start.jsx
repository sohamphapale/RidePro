import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center  bg-[url(traffic_light.jpg)] h-screen flex justify-between flex-col w-full pt-8">
        <img className="w-16 ml-8" src="RideProwhite1.png" alt="RidePro Logo" />
        <div className="bg-white py-4 pb-7 px-4">
          <h2 className="text-2xl font-bold">Get Started with Ridepro </h2>
          <Link to="/login" className=" inline-block text-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};
export default Start;

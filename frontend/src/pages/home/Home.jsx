import React, { useEffect, useRef, useState } from "react";
import LocationSearchPanel from "./components/LocationSearchPanel";
import CarsPanel from "./components/CarsPanel";

const Home = () => {
  return (
    <div>
      <div className="h-screen relative">
        <img
          className="w-16 absolute top-5 left-5"
          src="ridepro_logo.png"
          alt="RidePro Logo"
        />

        <div className="h-screen w-screen">
          {/* image for temporary */}
          <img className="h-full w-full object-cover" src="mapimg.gif" />
        </div>
        <LocationSearchPanel />
      </div>
      <div>
        <CarsPanel />
      </div>
    </div>
  );
};

export default Home;

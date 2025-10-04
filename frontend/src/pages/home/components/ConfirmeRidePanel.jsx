import React, { useContext, useEffect, useRef } from "react";
import { PanelsDataContext } from "../../../context/PanelsContext";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ConfirmeRidePanel = () => {
  gsap.registerPlugin(useGSAP);
  const ConfirmeRideRef = useRef(null);
  const { ConfirmeRide } = useContext(PanelsDataContext);

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

  return (
    <div>
      <div className="h-full w-screen top-0">
        <div
          ref={ConfirmeRideRef}
          className="fixed z-10 translate-y-full justify-end bottom-0 bg-white w-screen p-3 py-5"
        >
          <h3 className="text-2xl font-semibold  mb-5">Choose a Vehicle</h3>
        </div>
      </div>
    </div>
  );
};

export default ConfirmeRidePanel;

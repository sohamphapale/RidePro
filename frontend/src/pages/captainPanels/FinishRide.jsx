import React, { useEffect, useContext, useRef } from "react";

import { PanelsDataContext } from "../../context/PanelsContext.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FinishRide = () => {
  const { finishRidePanel } = useContext(PanelsDataContext);
  gsap.registerPlugin(useGSAP);
  const finishRidePanelref = useRef(null);

  useEffect(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelref.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelref.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div
      ref={finishRidePanelref}
      className="translate-y-full fixed z-10 justify-end bottom-0 bg-white w-screen p-3 py-5"
    >
      this is the end
    </div>
  );
};

export default FinishRide;

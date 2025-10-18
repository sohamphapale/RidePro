import { useContext, useEffect, useRef } from "react";
import { PanelsDataContext } from "../../../context/PanelsContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ConfirmRidePopUp = () => {
  gsap.registerPlugin(useGSAP);
  const ConfirmRidePopUpRef = useRef(null);
  const { ConfirmRidePopUpPanel, setConfirmRidePopUpPanel } =
    useContext(PanelsDataContext);

  useEffect(() => {
    if (ConfirmRidePopUpPanel) {
      gsap.to(ConfirmRidePopUpRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ConfirmRidePopUpRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ConfirmRidePopUpPanel]);

  return (
    <div className="  h-full w-screen top-0">
      <div
        ref={ConfirmRidePopUpRef}
        className="translate-y-full fixed z-10 justify-end bottom-0 bg-white w-screen p-3 py-5"
      >
        thisis 
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;

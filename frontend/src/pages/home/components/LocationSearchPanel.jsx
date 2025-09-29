import React, { useEffect, useRef, useState, useContext } from "react";
import Locationsuggestions from "./Locationsuggestions";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PanelsDataContext } from "../../../context/PanelsContext";

const LocationSearchPanel = () => {
  const { panelOpen, setPanelOpen, setVehivlePanel, vehivlePanel } =
    useContext(PanelsDataContext);
  gsap.registerPlugin(useGSAP);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const panelRef = useRef();
  const searchRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "75%",
      });
      gsap.to(searchRef.current, {
        height: "25%",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
    }
  }, [panelOpen]);

  const onclick = () => {
    if(vehivlePanel) {
      setVehivlePanel(false);
    }
  };

  return (
    <div>
      <div
        onClick={onclick}
        className=" flex flex-col justify-end h-screen overflow-hidden absolute top-0 w-full "
      >
        <div ref={searchRef} className="h-[25%] p-4 bg-white relative ">
          {panelOpen ? (
            <h5
              onClick={() => setPanelOpen(false)}
              className=" leth-5 top-5 text-3xl "
            >
              <i className="ri-arrow-down-s-line"></i>
            </h5>
          ) : (
            <h4 className="text-3xl font-semibold">Find a trip</h4>
          )}

          <form
            onSubmit={submitHandler}
            className={`relative ${panelOpen ? "mt-1" : "mt-3"} `}
          >
            <div className="line absolute h-16 w-[3px] top-[16%] left-6 bg-gray-800 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full"
              type="text"
              placeholder="add a pick-up location"
            />

            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
              }}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter a your destination"
            />
          </form>
        </div>

        <div ref={panelRef} className="bg-white p-4 h-0">
          <Locationsuggestions />
        </div>
      </div>
    </div>
  );
};

export default LocationSearchPanel;

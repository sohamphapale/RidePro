import React, { useEffect, useRef, useState, useContext } from "react";
import Locationsuggestions from "./LocationSuggestions.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PanelsDataContext } from "../../../context/PanelsContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LocationSearchPanel = () => {
 

  const {
    panelOpen,
    setPanelOpen,
    setVehivlePanel,
    vehivlePanel,
    ConfirmeRide,
    setConfirmeRide,
    vehicleFound,
    setVehicleFound,
    pickup,
    setPickup,
    destination,
    setDestination,
    setFare,
    setPickLocation,
    setDestLocation,
  } = useContext(PanelsDataContext);
  gsap.registerPlugin(useGSAP);

  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [suggestions, setSuggestions] = useState([]);
  const panelRef = useRef();
  const searchRef = useRef();
  const typeRef = useRef("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "75%",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
      });
    }
  }, [panelOpen]);

  const fetchSuggestions = async (query, type) => {
    typeRef.current = type;

    try {
      if (query.length >= 3) {
        const response = await axios.get(
          `${baseUrl}/maps/get-suggestions?input=${encodeURIComponent(query)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuggestions(response.data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = async (suggestion, Location, type) => {
    if (type === "pickup") {
      await setPickup(suggestion);
      setPickLocation(Location);
    } else if (type === "destination") {
      await setDestination(suggestion);
      setDestLocation(Location);
      getRidefare(suggestion);
    }
    setSuggestions([]); // Clear suggestions after selection
  };

  const getRidefare = async (suggestion) => {
    try {
      const response = await axios.get(`${baseUrl}/ride/get-fare`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pickup: pickup,
          destination: suggestion,
        },
      });
      await setFare(response.data);
      setVehivlePanel(true);
      setPanelOpen(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const onclick = () => {
    if (vehivlePanel) {
      setVehivlePanel(false);
    }
    if (ConfirmeRide) {
      setConfirmeRide(false);
    }
    if (vehicleFound) {
      setVehicleFound(false);
    }
  };

  return (
    <div>
      <div
        onClick={onclick}
        className=" flex flex-col justify-end h-screen overflow-hidden absolute top-0 w-full "
      >
        <div ref={searchRef} className="h-[23%]  p-4 pb-0 bg-white relative ">
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
                fetchSuggestions(e.target.value, "pickup");
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
                fetchSuggestions(e.target.value, "destination");
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter a your destination"
            />
          </form>
        </div>

        <div ref={panelRef} className="bg-white p-4 pt-1 h-0">
          {panelOpen && (
            <>
              <Locationsuggestions
                handleSuggestionClick={handleSuggestionClick}
                suggestions={suggestions}
                typeRef={typeRef}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationSearchPanel;

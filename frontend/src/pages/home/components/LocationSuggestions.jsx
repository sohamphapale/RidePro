import React, { useContext } from "react";
import SuggesionLocation from "./SuggesionLocation";
import { PanelsDataContext } from "../../../context/PanelsContext";

const Locationsuggestions = () => {
  const { setPanelOpen, setVehivlePanel } = useContext(PanelsDataContext);

  const locations = [
    "SURVEY #712, 2A+2D/118,  College Rd, D'souzaColony, Nashik, Maharashtra 422005",
    "collage rode #712, 2A+2D/118,  College Rd, D'souzaColony, Nashik, Maharashtra 422005",
    "gangapur rode #712, 2A+2D/118, College Rd, D'souzaColony, Nashik, Maharashtra 422005",
    "Nashik SURVEY #712, 2A+2D/118,  College Rd, D'souzaColony, Nashik, Maharashtra 422005",
  ];

  return (
    <div>
      <div>
        {/* this is sample data */}
        {locations.map((elem) => {
          return (
            <div key={elem}
              onClick={() => {
                setVehivlePanel(true);
                setPanelOpen(false);
              }}
            >
              <SuggesionLocation location={elem} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Locationsuggestions;

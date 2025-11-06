import React, { useContext } from "react";
import SuggesionLocation from "./SuggesionLocation";
import { PanelsDataContext } from "../../../context/PanelsContext";

const Locationsuggestions = ({
  suggestions,
  typeRef,
  handleSuggestionClick,
}) => {
  return (
    <div>
      <div>
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.place_id}
            onClick={() => {
              handleSuggestionClick(suggestion.description,suggestion.terms[0].value, typeRef.current);
            }}
          >
            <SuggesionLocation
              location={suggestion.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locationsuggestions;

// terms[0].value;

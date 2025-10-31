import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CitySelector.css";

function CitySelector() {
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <h1>Whats the weather like today?</h1>
      <label className="dropdown-menu">
        {"Pick a location: "}

        <select
          className="dropdown-options"
          name="selectedCity"
          value={selectedCity}
          onChange={(e) => navigate(`/weather/${e.target.value}`)}
        >
          <option value="" disabled>
            Select a location...
          </option>
          <option value="Littleborough">Littleborough</option>
          <option value="Manchester">Manchester</option>
          <option value="London">London</option>
          <option value="Paris">Paris</option>
          <option value="Dallas">Dallas</option>
        </select>
      </label>
    </div>
  );
}
export default CitySelector;

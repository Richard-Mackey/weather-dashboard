import { useNavigate } from "react-router-dom";
import "./CitySelector.css";
import { useState, useEffect } from "react";

function CitySelector() {
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();
  const [gifKey, setGifKey] = useState(Date.now());
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    // set background animation to run just once
    const newKey = Date.now();
    setGifKey(newKey);

    document.body.style.backgroundImage = `url(/background.gif?key=${newKey})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.minHeight = "100vh";

    // Cleanup function
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Stops the browser's default action
    navigate(`/weather/${searchInput.trim()}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>What's the weather doing?</h1>
      <div className="search-form">
        <form onSubmit={handleSubmit}>
          <input
            className="form"
            placeholder="Enter a location"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="search-button"
            type="submit"
            disabled={!searchInput}
          >
            Search
          </button>
        </form>
      </div>
      <label className="dropdown-label">
        {"Check out past weather data from these locations: "}

        <select
          className="dropdown-options"
          name="selectedCity"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            navigate(`/charts/${e.target.value}`);
          }}
        >
          <option value="" disabled>
            Select...
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

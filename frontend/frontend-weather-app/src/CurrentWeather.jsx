import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./CurrentWeather.css";

function CurrentWeather() {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { city } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    fetch(`/api/weather/${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Weather information can't be found. Try another location."
          );
        }
        return response.json();
      })
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [city]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="back-to-search-button" onClick={() => navigate("/")}>
          Back to search
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="card">
        <h3>Currently in {city}</h3>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
          alt="weather icon"
        />
        {/* displays current weather information for location using API parameters */}
        <p>Temperature: {weatherData.temp?.toFixed(1)}°C</p>
        <p>Wind speed: {weatherData.windSpeed} m/s</p>
        <p>Pressure: {weatherData.pressure} mb</p>
        <p>Humidity: {weatherData.humidity}%</p>
        <div className="button-container">
          <button className="new-location-button" onClick={() => navigate(`/`)}>
            Search another location
          </button>

          <button
            className="forecast-button"
            onClick={() => navigate(`/forecast/${city}`)}
          >
            Forecast
          </button>
        </div>
      </div>
    </div>
  );
}
export default CurrentWeather;

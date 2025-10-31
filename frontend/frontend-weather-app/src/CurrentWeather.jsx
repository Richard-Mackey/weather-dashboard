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
          throw new Error("Weather information can't be found.");
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
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card">
      <h3>The current weather in {city}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
        alt="weather icon"
      />
      <p>Temperature: {weatherData.temp?.toFixed(1)}°C</p>
      <p>Wind speed: {weatherData.windSpeed} m/s</p>
      <p>Pressure: {weatherData.pressure} hPa</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <div className="button-container">
        <button
          className="chart-button"
          onClick={() => navigate(`/charts/${city}`)}
        >
          See recent weather charts
        </button>
        <button className="search-button" onClick={() => navigate(`/`)}>
          Search another location
        </button>
      </div>
    </div>
  );
}
export default CurrentWeather;

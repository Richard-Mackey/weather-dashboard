import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./WeatherForecast.css";

function WeatherForecast() {
  const { city } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [forecastData, setForecastData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null); // date string
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4); // responsive layout

  useEffect(() => {
    setError("");
    fetch(`/api/weather/forecast/${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Weather information can't be found.");
        }
        return response.json();
      })
      .then((data) => {
        setForecastData(data);
        const grouped = groupForecastsByDay(data);
        // Set the first day as default selected day
        const firstDay = Object.keys(grouped)[0];
        setSelectedDay(firstDay);
        setLoading(false);
      });
  }, [city]);

  // helper function to combine forecast information by day
  const groupForecastsByDay = (forecastData) => {
    const groupedData = {};

    forecastData.forEach((reading) => {
      const date = new Date(reading.forecastTime);
      const dateKey = date.toLocaleString("en-GB", {
        year: "numeric",
        day: "2-digit",
        month: "short",
      });

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = [];
      }
      groupedData[dateKey].push(reading);
    });
    return groupedData;
  };

  // extends grouped forecast to go through until 06:00 next morning
  // this allows a nightime forecast - last forecast for each day in API is at 21:00
  const grouped = groupForecastsByDay(forecastData);
  const currentDayForecasts = grouped[selectedDay] || [];
  const selectedDayIndex = Object.keys(grouped).indexOf(selectedDay);
  const nextDayIndex = selectedDayIndex + 1;
  const nextDayKey = Object.keys(grouped)[nextDayIndex];
  const nextDayForecasts = grouped[nextDayKey] || [];
  const filteredNextDayForecasts = nextDayForecasts.filter((forecast) => {
    const hour = new Date(forecast.forecastTime).getHours();
    return hour <= 6;
  });

  const combinedForecasts = [
    ...currentDayForecasts,
    ...filteredNextDayForecasts,
  ];

  // gives carousel pattern of 4 cards per display view
  const visibleCards = combinedForecasts.slice(
    currentIndex,
    currentIndex + cardsPerView
  );

  const today = new Date();
  const todayFormatted = today.toLocaleString("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "short",
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day
  const tomorrowFormatted = tomorrow.toLocaleString("en-GB", {
    year: "numeric",
    day: "2-digit",
    month: "short",
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="location-div">
        <h3>{city}</h3>

        <button
          className="select-another-location-button"
          onClick={() => navigate(`/`)}
        >
          Select another location
        </button>
      </div>
      {/* map dates to button labels */}
      <div className="button-group">
        {Object.keys(grouped).map((day) => {
          let buttonLabel;
          if (day === todayFormatted) {
            buttonLabel = "Today";
          } else if (day === tomorrowFormatted) {
            buttonLabel = "Tomorrow";
          } else {
            buttonLabel = day;
          }

          return (
            <button
              className="select-day-button"
              key={day}
              onClick={() => {
                setSelectedDay(day);
                // sets the start time to earliest forecast for that day
                setCurrentIndex(0);
              }}
            >
              {buttonLabel}
            </button>
          );
        })}
      </div>
      {/* dropdown menu for mobile display */}
      <div className="mobile-only-dropdown">
        <label className="mobile-only-dropdown-menu">
          {"Select a day: "}
          <select
            className="mobile-only-dropdown-options"
            name="label"
            value={selectedDay}
            onChange={(e) => {
              setSelectedDay(e.target.value);
              setCurrentIndex(0);
            }}
          >
            <option value="" disabled>
              {" "}
              Select a day...
            </option>
            {/* map dates to dropdown labels */}
            {Object.keys(grouped).map((day) => {
              let label;
              if (day === todayFormatted) {
                label = "Today";
              } else if (day === tomorrowFormatted) {
                label = "Tomorrow";
              } else {
                label = day;
              }
              return (
                <option key={day} value={day}>
                  {label}
                </option>
              );
            })}
          </select>
        </label>
      </div>

      <div className="card-container">
        {visibleCards.map((forecast, index) => (
          <div className="forecast-card" key={index}>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weatherIcon}@2x.png`}
              alt="weather icon"
            />
            <p>
              Time:{" "}
              {new Date(forecast.forecastTime).toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>Temperature: {forecast.temp?.toFixed(1)}°C</p>
            <p>Wind speed: {forecast.windSpeed} m/s</p>
            <p>Pressure: {forecast.pressure} mb</p>
            <p>Humidity: {forecast.humidity}%</p>
          </div>
        ))}
      </div>

      <button
        disabled={currentIndex === 0}
        className="previous-forecast-button"
        onClick={() => setCurrentIndex(currentIndex - 1)}
      >
        {/* arrow icon*/}
        {String.fromCharCode(8592)}
      </button>
      <button
        disabled={currentIndex >= combinedForecasts.length - cardsPerView}
        className="next-forecast-button"
        onClick={() => setCurrentIndex(currentIndex + 1)}
      >
        {String.fromCharCode(8594)}
      </button>
    </div>
  );
}

export default WeatherForecast;

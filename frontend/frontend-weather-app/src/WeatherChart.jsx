import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./WeatherChart.css";

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

function WeatherChart() {
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedHours, setSelectedHours] = useState("all");
  const { city } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    fetch(`/api/weather/history/${city}?hours=${selectedHours}`)
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
  }, [selectedHours, city]);

  const timestamps = weatherData.map((reading) => {
    const date = new Date(reading.time);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const temperatures = weatherData.map((reading) => reading.temp);
  const windSpeed = weatherData.map((reading) => reading.windSpeed);
  const pressure = weatherData.map((reading) => reading.pressure);
  const humidity = weatherData.map((reading) => reading.humidity);

  const tempChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Temperature",
        data: temperatures,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    ],
  };

  const tempOptions = {
    plugins: {
      title: {
        display: true,
        text: "Temperature",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Temperature (ºC)",
        },
      },
    },
  };

  const windChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Wind Speed",
        data: windSpeed,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    ],
  };

  const windOptions = {
    plugins: {
      title: {
        display: true,
        text: "Wind speed",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Wind speed (m/s)",
        },
        min: 0,
      },
    },
  };

  const pressureChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Pressure",
        data: pressure,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    ],
  };

  const pressureOptions = {
    plugins: {
      title: {
        display: true,
        text: "Pressure",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Pressure (mb)",
        },
        min: 980,
        max: 1040,
      },
    },
  };

  const humidityChartData = {
    labels: timestamps,
    datasets: [
      {
        label: "Humidity",
        data: humidity,
        borderColor: "rgb(0, 0, 0)",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    ],
  };

  const humidityOptions = {
    plugins: {
      title: {
        display: true,
        text: "Humidity",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Humidity (%)",
        },
        max: 100,
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="title-dropdown-container">
        <h3>Weather data for {city}</h3>
        <label className="time-label">
          {"Timescale: "}

          <select
            className="time-options"
            name="selectedHours"
            value={selectedHours}
            onChange={(e) => setSelectedHours(e.target.value)}
          >
            <option value="all">All data</option>
            <option value="24">Last 24 hours</option>
            <option value="48">Last 48 hours</option>
            <option value="168">Last 7 days</option>
          </select>
        </label>

        <label className="location-label">
          {"Location: "}

          <select
            className="location-options"
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
        <button
          className="find-a-forecast-button"
          onClick={() => navigate(`/`)}
        >
          Find a forecast
        </button>
      </div>
      <div className="temp-chart-container">
        <Line data={tempChartData} options={tempOptions} />
      </div>
      <div className="wind-chart-container">
        <Line data={windChartData} options={windOptions} />
      </div>
      <div className="pressure-chart-container">
        <Line data={pressureChartData} options={pressureOptions} />
      </div>
      <div className="humidity-chart-container">
        <Line data={humidityChartData} options={humidityOptions} />
      </div>
    </div>
  );
}
export default WeatherChart;

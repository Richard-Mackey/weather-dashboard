import React, { useEffect, useState } from "react";
import "./WeatherChart.css";
import { useNavigate, useParams } from "react-router-dom";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeatherChart() {
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
    scales: {
      y: {
        title: {
          display: true,
          text: "Temperature",
        },
        beginAtZero: true,
        max: 20,
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
    scales: {
      y: {
        title: {
          display: true,
          text: "Wind speed",
        },
        beginAtZero: true,
        max: 50,
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
    scales: {
      y: {
        title: {
          display: true,
          text: "Pressure",
        },
        min: 990,
        max: 1020,
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
    scales: {
      y: {
        title: {
          display: true,
          text: "Humidity",
        },
        min: 50,
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
        <label>
          {"Pick a timescale: "}

          <select
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
        <button className="new-location-button" onClick={() => navigate(`/`)}>
          Search another location
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

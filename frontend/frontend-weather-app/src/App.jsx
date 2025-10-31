import { useState } from "react";
import WeatherChart from "./WeatherChart";
import CurrentWeather from "./CurrentWeather";
import CitySelector from "./CitySelector";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CitySelector />} />
        <Route path="/weather/:city" element={<CurrentWeather />} />
        <Route path="/charts/:city" element={<WeatherChart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

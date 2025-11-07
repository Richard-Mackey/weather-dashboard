package com.rmackey.weather_dashboard.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.rmackey.weather_dashboard.model.WeatherReading;
import com.rmackey.weather_dashboard.service.WeatherService;
import org.springframework.web.bind.annotation.*;
import com.rmackey.weather_dashboard.model.WeatherForecast;
import java.util.List;

// Base path for all weather-related endpoints in this controller
@RequestMapping("/api/weather")
@RestController
public class WeatherController {
    private WeatherService weatherService;
   // Constructor for dependency injection of WeatherService
    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }
    // GET endpoint: /api/weather/{city} - fetches and saves weather for the specified city
    @GetMapping("/{city}")
    // Extracts city name from URL path and fetches weather data for it
    public WeatherReading weatherReading (@PathVariable String city) throws JsonProcessingException {
       // save the input and return the full URL for API get request
        WeatherReading savedWeatherReading = weatherService.fetchAndSaveWeather(city);
        return savedWeatherReading;
    }
    @GetMapping("/history/{city}")
    public List<WeatherReading> weatherHistory (
            @PathVariable String city,
            @RequestParam(required = false, defaultValue = "all") String hours
    )   {
        List<WeatherReading> weatherHistory = weatherService.getWeatherHistory(city, hours);
        return weatherHistory;
    }
    @GetMapping("/forecast/{city}")
    public List<WeatherForecast> fetchForecast(@PathVariable String city) throws JsonProcessingException {
        // save the input and return the full URL for API get request
        List<WeatherForecast> savedForecasts = weatherService.fetchWeatherForecast(city);
        return savedForecasts;
    }

}

package com.rmackey.weather_dashboard.scheduler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.rmackey.weather_dashboard.service.WeatherService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class WeatherScheduler {
    private final static Logger logger = LoggerFactory.getLogger(WeatherScheduler.class);
    private WeatherService weatherService;
    public WeatherScheduler(WeatherService weatherService) {
        this.weatherService = weatherService;
    }
    // cron expression to run at
    // zero seconds (at the top of the minute)
    // zero minutes (at the top of every hour)
    // every hour, every day of every month, every day of the week
    @Scheduled(cron = "0 0 * * * *")
    public void collectWeatherData(){
        String[] cities = {"Littleborough", "Manchester", "London", "Paris", "Dallas"};
        for (String city : cities) {
            try {
                weatherService.fetchAndSaveWeather(city);
                logger.info("Successfully collected data for " + city);
            } catch (Exception e) {
                logger.error("Failed to collect weather data for " + city, e);
            }
        }
        }
}

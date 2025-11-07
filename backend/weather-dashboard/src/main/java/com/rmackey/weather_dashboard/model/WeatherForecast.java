package com.rmackey.weather_dashboard.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class WeatherForecast {
    private Double temp;
    private Double tempMin;
    private Double tempMax;
    private Double pressure;
    private Double humidity;
    private String name;
    private LocalDateTime forecastTime;
    private String weatherDescription;
    private String weatherIcon;
    private Integer visibility;
    private Double windSpeed;

    public WeatherForecast(Double temp, Double tempMin, Double tempMax, Double pressure, Double humidity, String name, LocalDateTime forecastTime, String weatherDescription, String weatherIcon, Integer visibility, Double windSpeed){
        this.temp = temp;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.pressure = pressure;
        this.humidity = humidity;
        this.name = name;
        this.forecastTime = forecastTime;
        this.weatherDescription = weatherDescription;
        this.weatherIcon = weatherIcon;
        this.visibility = visibility;
        this.windSpeed = windSpeed;
    }
}
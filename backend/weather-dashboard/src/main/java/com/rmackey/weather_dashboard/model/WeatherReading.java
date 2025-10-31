package com.rmackey.weather_dashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;
// data does all getters/setters, toString()
@Data
@Entity
public class WeatherReading {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private Double temp;
    private Double tempMin;
    private Double tempMax;
    private Double pressure;
    private Double humidity;
    private String name;
    private LocalDateTime time;
    private String weatherDescription;
    private String weatherIcon;
    private Integer visibility;
    private Double windSpeed;

    protected WeatherReading(){}

    public WeatherReading(Double temp, Double tempMin, Double tempMax, Double pressure, Double humidity, String name, LocalDateTime time, String weatherDescription, String weatherIcon, Integer visibility, Double windSpeed){
        this.temp = temp;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.pressure = pressure;
        this.humidity = humidity;
        this.name = name;
        this.time = time;
        this.weatherDescription = weatherDescription;
        this.weatherIcon = weatherIcon;
        this.visibility = visibility;
        this.windSpeed = windSpeed;

    }
}

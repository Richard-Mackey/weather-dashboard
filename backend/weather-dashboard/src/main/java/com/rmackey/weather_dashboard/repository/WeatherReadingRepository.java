package com.rmackey.weather_dashboard.repository;

import com.rmackey.weather_dashboard.model.WeatherReading;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WeatherReadingRepository extends JpaRepository<WeatherReading, Long> {
    // method so that Spring data automatically implements SQL query
    public List<WeatherReading> findByNameOrderByTimeAsc(String name);
}

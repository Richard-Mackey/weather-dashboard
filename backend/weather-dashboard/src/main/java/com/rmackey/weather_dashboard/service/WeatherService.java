package com.rmackey.weather_dashboard.service;

import com.rmackey.weather_dashboard.model.WeatherReading;
import com.rmackey.weather_dashboard.repository.WeatherReadingRepository;
import org.springframework.beans.factory.annotation.Value;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class WeatherService {
    // Injection of RestTemplate into class
    private RestTemplate restTemplate;
@Value("${weather.api.key}")
    private String apiKey;
private WeatherReadingRepository weatherReadingRepository;
public WeatherService(WeatherReadingRepository weatherReadingRepository){
    this.weatherReadingRepository = weatherReadingRepository;

}
public WeatherReading fetchAndSaveWeather(String name) throws JsonProcessingException{

  String units = "metric";

  String result = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + apiKey + "&units=" + units;
  // declare a RestTemplate variable, assign it to name restTemplate and assign a new instance in the constructor
  RestTemplate restTemplate = new RestTemplate();
  // call API and get the response
  String JSON = restTemplate.getForObject(result, String.class);
  // captures the JSON output
  ObjectMapper objectMapper = new ObjectMapper();
 JsonNode output = objectMapper.readTree(JSON);

    Double temp = output.get("main").get("temp").asDouble();
    Double tempMin = output.get("main").get("temp_min").asDouble();
    Double tempMax = output.get("main").get("temp_max").asDouble();
    Double pressure = output.get("main").get("pressure").asDouble();
    Double humidity = output.get("main").get("humidity").asDouble();
    String cityName = output.get("name").asText();
  LocalDateTime timeStamp =  LocalDateTime.now();
  String description = output.get("weather").get(0).get("description").asText();
    String icon = output.get("weather").get(0).get("icon").asText();
   Integer visibility =  output.get("visibility").asInt();
    Double windSpeed = output.get("wind").get("speed").asDouble();

 WeatherReading weatherReading = new WeatherReading(temp, tempMin, tempMax, pressure, humidity, cityName, timeStamp, description, icon, visibility, windSpeed );
    weatherReading = weatherReadingRepository.save(weatherReading);
 return weatherReading;
}
// service method to retrieve historical data from database and retrieve it
   public List<WeatherReading> getWeatherHistory(String name, String hours){
    if (hours.equals("all")) {
      return weatherReadingRepository.findByNameOrderByTimeAsc(name);
    }
    else {
        int hoursInt = Integer.parseInt(hours);
        LocalDateTime filteredTime = LocalDateTime.now().minusHours(hoursInt);
       return weatherReadingRepository.findByNameOrderByTimeAsc(name)
                .stream()
                .filter(reading -> reading.getTime().isAfter(filteredTime))
                .collect(Collectors.toList());
    }
    }
   }


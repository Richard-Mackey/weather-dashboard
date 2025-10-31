FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
# Force rebuild 2025-10-31-v2
COPY backend/weather-dashboard/pom.xml ./pom.xml
COPY backend/weather-dashboard/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", \
  "-Dspring.datasource.url=${SPRING_DATASOURCE_URL}", \
  "-Dspring.datasource.username=${SPRING_DATASOURCE_USERNAME}", \
  "-Dspring.datasource.password=${SPRING_DATASOURCE_PASSWORD}", \
  "-Dweather.api.key=${WEATHER_API_KEY}", \
  "-jar", "app.jar"]
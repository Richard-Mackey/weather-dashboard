FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
# Force rebuild 2025-10-31
COPY backend/weather-dashboard/pom.xml ./pom.xml
COPY backend/weather-dashboard/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
# Weather Dashboard

A full-stack weather tracking application built with Spring Boot and React.

## Features

- Real-time weather data from OpenWeatherMap API
- Hourly automated data collection for multiple cities
- Historical weather data visualization
- Interactive charts for temperature, wind, pressure, and humidity

## Tech Stack

- **Backend:** Java, Spring Boot, PostgreSQL
- **Frontend:** React, Chart.js, React Router
- **Deployment:** Docker, CI/CD

## Setup

### Backend

1. Create PostgreSQL database
2. Set environment variable: `WEATHER_API_KEY=your_key_here`
3. Run Spring Boot application

### Frontend

1. `npm install`
2. `npm run dev`

## Environment Variables

- `WEATHER_API_KEY` - OpenWeatherMap API key
- `DATABASE_URL` - PostgreSQL connection string

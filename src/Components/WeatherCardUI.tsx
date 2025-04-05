import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import moment from "moment";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const kelvinToCelsius = (temp: number) => (temp - 273.15).toFixed(2);

const WeatherCardUI = ({ props: city }: { props: string }) => {
  console.log("City:", city);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city]);

  const fetchWeather = async (cityName: string) => {
    if (!API_KEY) {
      console.error("API key not found.");
      setError("API key missing.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message || "Error fetching weather");
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
          Loading weather...
        </Typography>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Card>
    );
  }

  if (!weatherData) return null;

  const { name, weather, main, wind, sys } = weatherData;
  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sys.country}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 100 }}
            image={weatherIcon}
            alt={weather[0].main}
          />
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6">{weather[0].main}</Typography>
            <Typography variant="body2" color="text.secondary">
              {weather[0].description}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" component="div" sx={{ mt: 2 }}>
          {kelvinToCelsius(main.temp)}°C
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Feels like: {kelvinToCelsius(main.feels_like)}°C
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Humidity: {main.humidity}%
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Wind: {wind.speed} m/s
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              Pressure: {main.pressure} hPa
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Sunrise: {moment.unix(sys.sunrise).format("hh:mm A")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sunset: {moment.unix(sys.sunset).format("hh:mm A")}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCardUI;

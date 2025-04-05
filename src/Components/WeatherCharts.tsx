import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Spinner from "./Spinner";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

// Interfaces
interface ForecastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface ForecastClouds {
  all: number;
}

interface ForecastWind {
  speed: number;
}

interface ForecastItem {
  dt_txt: string;
  main: ForecastMain;
  clouds: ForecastClouds;
  wind: ForecastWind;
  visibility: number;
}

interface ForecastResponse {
  list: ForecastItem[];
}

interface WeatherChartsProps {
  props: string;
}

const kelvinToCelsius = (k: number): number => +(k - 273.15).toFixed(2);

const WeatherCharts: React.FC<WeatherChartsProps> = ({ props: city }) => {
  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        const data: ForecastResponse & { cod: string; message?: string } = await response.json();

        if (data.cod !== "200") {
          console.error("API error:", data.message);
          setForecastData([]);
        } else {
          setForecastData(data.list || []);
        }
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setForecastData([]);
      } finally {
        setLoading(false);
      }
    };

    if (city) fetchForecast();
  }, [city]);

  if (loading) return <Spinner />;
  if (!forecastData || forecastData.length === 0) return <div>No data available</div>;

  const chartData = forecastData.map((item) => ({
    dt_txt: item.dt_txt,
    feels_like: kelvinToCelsius(item.main.feels_like),
    temperature: kelvinToCelsius(item.main.temp),
    temp_min: kelvinToCelsius(item.main.temp_min),
    temp_max: kelvinToCelsius(item.main.temp_max),
    pressure: item.main.pressure,
    humidity: item.main.humidity,
    cloud: item.clouds.all,
    wind: item.wind.speed,
    visibility: item.visibility / 100,
  }));

  const renderChart = (title: string, dataKey: string, strokeColor: string) => (
    <Grid item xs={12} key={dataKey}>
      <Paper elevation={3}>
        <Typography variant="h6" align="center" gutterBottom>{title}</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dt_txt" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke={strokeColor} name={title} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid>
  );

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Weather Forecast for {city}</Typography>
      <Grid container spacing={4}>
        {renderChart("Temperature", "temperature", "#8884d8")}
        {renderChart("Feels Like", "feels_like", "#82ca9d")}
        {renderChart("Min Temp", "temp_min", "#ffc658")}
        {renderChart("Max Temp", "temp_max", "#ff7300")}
        {renderChart("Humidity", "humidity", "#82ca9d")}
        {renderChart("Cloud Coverage", "cloud", "#ffc658")}
        {renderChart("Wind Speed", "wind", "#ff7300")}
        {renderChart("Visibility", "visibility", "#8884d8")}
        {renderChart("Pressure", "pressure", "#8884d8")}
      </Grid>
    </Container>
  );
};

export default WeatherCharts;

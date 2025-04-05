import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Spinner from "./Spinner";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // 🔁 Replace with your actual API key

const WeatherCharts = ({ props: city }: { props: string }) => {
  console.log("City Name:", city);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        console.log("Fetching forecast data for:", city);
        console.log("apiKey", API_KEY);

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        const data = await response.json();
        setForecastData(data.list || []);
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchForecast();
    }
  }, [city]);

  if (loading) return <Spinner />;
  if (!forecastData || forecastData.length === 0) return <div>No data available</div>;

  const chartData = forecastData.map((item) => ({
    dt_txt: item.dt_txt,
    feels_like: (item.main.feels_like - 273.15).toFixed(2),
    temperature: (item.main.temp - 273.15).toFixed(2),
    temp_min: (item.main.temp_min - 273.15).toFixed(2),
    temp_max: (item.main.temp_max - 273.15).toFixed(2),
    pressure: item.main.pressure,
    humidity: item.main.humidity,
    cloud: item.clouds.all,
    wind: item.wind.speed,
    visibility: item.visibility / 100,
  }));

  const renderChart = (title, dataKey, strokeColor) => (
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

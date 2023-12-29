import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Card, CardContent, CircularProgress } from '@mui/material';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const apiKey = '2207ae5158fc218adf958cef36082eb4';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(apiUrl);
      setWeather(response.data);
    } catch (error) {
      setError('Error fetching weather. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        overflow: 'auto', // Allow container to scroll if needed
      }}
    >
      <Card style={{ marginBottom: '2rem' }}>
        <CardContent>
          <Typography variant="h4" align="center" style={{ paddingBottom: '1rem', fontWeight: '500', color: '#0095E7' }} gutterBottom>
            Weather App
          </Typography>
          <TextField
            label="Enter city"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" color="primary" onClick={fetchWeather} disabled={loading}>
            Get Weather
          </Button>
        </CardContent>
      </Card>
      <Card style={{
        width: '200px',
        height: '150px',
      }}>
        <CardContent>
          {loading && <CircularProgress style={{ marginTop: '1rem' }} />}
          {error && (
            <Typography variant="body1" color="error" style={{ marginTop: '1rem' }}>
              {error}
            </Typography>
          )}
          {weather && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <Typography variant="h6">{weather.name}, {weather.sys.country}</Typography>
              <Typography variant="body1">{weather.weather[0].description}</Typography>
              <Typography variant="h4">{weather.main.temp}°C</Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Weather;

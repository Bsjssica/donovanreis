import React, { useEffect } from 'react';
import { Cloud, Loader2, AlertTriangle } from 'lucide-react';
import { useWeatherStore } from '../stores/weatherStore';
import CurrentWeather from './weather/CurrentWeather';
import WeatherForecast from './weather/WeatherForecast';

const Weather = () => {
  const { currentWeather, forecast, loading, error, setCurrentWeather, setForecast, setLoading, setError } = useWeatherStore();

  useEffect(() => {
    const fetchWeatherData = () => {
      setLoading(true);
      // Simulando dados em tempo real
      const mockCurrentWeather = {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        condition: 'Parcialmente Nublado',
        icon: 'https://openweathermap.org/img/wn/02d@2x.png',
        location: 'Rio de Janeiro, RJ',
        timestamp: new Date().toISOString()
      };

      const mockForecast = [
        {
          date: new Date(Date.now() + 86400000).toISOString(),
          maxTemp: 30,
          minTemp: 22,
          condition: 'Ensolarado',
          icon: 'https://openweathermap.org/img/wn/01d@2x.png',
          precipitation: 0
        },
        {
          date: new Date(Date.now() + 172800000).toISOString(),
          maxTemp: 27,
          minTemp: 21,
          condition: 'Chuva Leve',
          icon: 'https://openweathermap.org/img/wn/10d@2x.png',
          precipitation: 60
        },
        {
          date: new Date(Date.now() + 259200000).toISOString(),
          maxTemp: 25,
          minTemp: 20,
          condition: 'Chuva',
          icon: 'https://openweathermap.org/img/wn/09d@2x.png',
          precipitation: 80
        },
        {
          date: new Date(Date.now() + 345600000).toISOString(),
          maxTemp: 26,
          minTemp: 21,
          condition: 'Nublado',
          icon: 'https://openweathermap.org/img/wn/03d@2x.png',
          precipitation: 20
        }
      ];

      setCurrentWeather(mockCurrentWeather);
      setForecast(mockForecast);
      setLoading(false);
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Atualiza a cada 5 minutos

    return () => clearInterval(interval);
  }, [setCurrentWeather, setForecast, setLoading]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Cloud className="h-8 w-8 text-green-500" />
          <h2 className="text-3xl font-bold text-green-500">
            Meteorologia
          </h2>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Atualizando dados...</span>
          </div>
        )}
      </div>

      {error ? (
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {currentWeather && <CurrentWeather weather={currentWeather} />}
          {forecast.length > 0 && <WeatherForecast forecast={forecast} />}
        </div>
      )}
    </div>
  );
};

export default Weather;
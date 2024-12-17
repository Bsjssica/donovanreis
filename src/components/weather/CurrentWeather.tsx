import React from 'react';
import { Cloud, Droplets, Wind, MapPin, Clock } from 'lucide-react';
import { WeatherData } from '../../stores/weatherStore';

interface CurrentWeatherProps {
  weather: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <h3 className="text-xl font-semibold text-white">{weather.location}</h3>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{new Date(weather.timestamp).toLocaleString()}</span>
          </div>
        </div>
        <img
          src={weather.icon}
          alt={weather.condition}
          className="h-16 w-16"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="text-center p-4 bg-gray-700 rounded-lg">
          <div className="text-4xl font-bold text-white mb-2">
            {weather.temperature}°C
          </div>
          <div className="text-gray-300">{weather.condition}</div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <span className="text-gray-300">Umidade</span>
            </div>
            <span className="text-white">{weather.humidity}%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-green-500" />
              <span className="text-gray-300">Vento</span>
            </div>
            <span className="text-white">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
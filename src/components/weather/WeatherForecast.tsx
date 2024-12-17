import React from 'react';
import { Cloud, Sun, Droplets } from 'lucide-react';
import { Forecast } from '../../stores/weatherStore';

interface WeatherForecastProps {
  forecast: Forecast[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Previsão para os Próximos Dias</h3>
      
      <div className="grid gap-4">
        {forecast.map((day) => (
          <div key={day.date} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center gap-4">
              <img
                src={day.icon}
                alt={day.condition}
                className="h-10 w-10"
              />
              <div>
                <div className="font-medium text-white">
                  {new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'long' })}
                </div>
                <div className="text-sm text-gray-400">{day.condition}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-gray-300">{day.precipitation}%</span>
              </div>
              <div className="text-right">
                <span className="text-white">{day.maxTemp}°</span>
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-400">{day.minTemp}°</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
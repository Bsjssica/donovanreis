import { create } from 'zustand';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  location: string;
  timestamp: string;
}

export interface Forecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
  precipitation: number;
}

interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: Forecast[];
  loading: boolean;
  error: string | null;
  setCurrentWeather: (weather: WeatherData) => void;
  setForecast: (forecast: Forecast[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  setCurrentWeather: (weather) => set({ currentWeather: weather }),
  setForecast: (forecast) => set({ forecast }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));
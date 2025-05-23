import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WeatherData = any; // You can define a more specific type

interface WeatherContextProps {
  city: string;
  setCity: (city: string) => void;
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
  error: string;
  setError: (msg: string) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(
  undefined,
);

export const WeatherProvider = ({children}: {children: ReactNode}) => {
  const [city, setCityState] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load last searched city on mount
  useEffect(() => {
    const loadCity = async () => {
      try {
        const savedCity = await AsyncStorage.getItem('lastCity');
        if (savedCity) setCityState(savedCity);
      } catch (e) {
        console.error('Failed to load city from storage', e);
      }
    };
    loadCity();
  }, []);

  // Custom setter that also saves to AsyncStorage
  const setCity = async (newCity: string) => {
    try {
      setCityState(newCity);
      await AsyncStorage.setItem('lastCity', newCity);
    } catch (e) {
      console.error('Failed to save city to storage', e);
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        weatherData,
        setWeatherData,
        error,
        setError,
        loading,
        setLoading,
      }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextProps => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

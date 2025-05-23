import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import WeatherScreen from '../screens/WeatherScreen';
import {useWeather} from '../context/WeatherContext';
import {fetchWeather} from '../services/WeatherService';

// Mock the weather context and fetchWeather
jest.mock('../context/WeatherContext');
jest.mock('../services/WeatherService');

const mockUseWeather = useWeather as jest.Mock;

describe('WeatherScreen', () => {
  const setCity = jest.fn();
  const setWeatherData = jest.fn();
  const setError = jest.fn();
  const setLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWeather.mockReturnValue({
      city: 'London',
      setCity,
      weatherData: null,
      setWeatherData,
      error: '',
      setError,
      loading: false,
      setLoading,
    });
  });

  it('renders input and button', () => {
    const {getByPlaceholderText, getByText} = render(<WeatherScreen />);
    expect(getByPlaceholderText('Enter city')).toBeTruthy();
    expect(getByText('Get Weather')).toBeTruthy();
  });

  it('calls setCity on input change', () => {
    const {getByPlaceholderText} = render(<WeatherScreen />);
    fireEvent.changeText(getByPlaceholderText('Enter city'), 'Paris');
    expect(setCity).toHaveBeenCalledWith('Paris');
  });

  it('calls fetchWeather and updates state on success', async () => {
    const mockData = {
      name: 'London',
      main: {temp: 20},
      weather: [{main: 'Clear', icon: '01d'}],
    };
    (fetchWeather as jest.Mock).mockResolvedValueOnce(mockData);

    const {getByText} = render(<WeatherScreen />);
    fireEvent.press(getByText('Get Weather'));

    await waitFor(() => {
      expect(setLoading).toHaveBeenCalledWith(true);
      expect(setWeatherData).toHaveBeenCalledWith(mockData);
      expect(setLoading).toHaveBeenCalledWith(false);
    });
  });

  it('displays error on fetch failure', async () => {
    (fetchWeather as jest.Mock).mockRejectedValueOnce(
      new Error('City not found'),
    );

    const {getByText, findByText} = render(<WeatherScreen />);
    fireEvent.press(getByText('Get Weather'));

    expect(setLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(setError).toHaveBeenCalledWith('City not found');
      expect(setLoading).toHaveBeenCalledWith(false);
    });
  });
});

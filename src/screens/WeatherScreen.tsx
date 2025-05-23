import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useWeather} from '../context/WeatherContext';
import {fetchWeather} from '../services/WeatherService';
import WeatherCard from '../components/WeatherCard';

export default function WeatherScreen() {
  const {
    city,
    setCity,
    weatherData,
    setWeatherData,
    error,
    setError,
    loading,
    setLoading,
  } = useWeather();

  const handleFetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} testID="weather-screen">
        <Text style={styles.title}>Weather App</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#888"
          testID="city-input"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleFetchWeather}
          disabled={loading}
          testID="get-weather-button">
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#007BFF"
            style={styles.loader}
            testID="loading-indicator"
          />
        )}

        {error && (
          <Text style={styles.error} testID="error-text">
            {error}
          </Text>
        )}

        {weatherData && <WeatherCard data={weatherData} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 10,
  },
});

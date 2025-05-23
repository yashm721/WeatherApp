import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({data}) => {
  const {name} = data;
  const {temp} = data.main;
  const {main, icon} = data.weather[0];

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{name}</Text>
      <View style={styles.row}>
        <Image
          style={styles.icon}
          source={{
            uri: `https://openweathermap.org/img/wn/${icon}@4x.png`,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.temp}>{Math.round(temp)}°C</Text>
          <Text style={styles.condition}>{main}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
  },
  city: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  info: {
    justifyContent: 'center',
  },
  temp: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007BFF',
  },
  condition: {
    fontSize: 18,
    fontWeight: '500',
    color: '#555',
    marginTop: 4,
  },
});

export default WeatherCard;

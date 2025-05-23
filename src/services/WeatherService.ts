export const fetchWeather = async (city:string) => {
    const apiKey = '084338b9c658844a296d168891e6ace1';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    console.log('response',response)
    if (!response.ok) throw new Error('Error fetching weather');
    return response.json();
  };
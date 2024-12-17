import { useState , createContext } from "react";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import axios from "axios";

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export interface Location {
  city: string;
  country: string;
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location>({city: "", country: ""});
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const weatherContext = createContext(weatherData);
  const WEATHER_API_KEY = "e2265aa018c54adfbd2190538240812";

  const fetchWeather = async (selectedCity: string) => {
    try {
      console.log("Fetching weather data for", selectedCity);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`,
        {

          params: {
            key: WEATHER_API_KEY,
            q: selectedCity,
          },
        }
      );
      console.log("Weather data:", response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };

  const handleLocationSelect = (selectedCity: string, selectedCountry: string) => {
    setSelectedLocation({city: selectedCity, country: selectedCountry});
    fetchWeather(selectedCity);
  };

  return (
    <>
      <h1>Weather App</h1>
      <SearchBar setSelectedLocation={handleLocationSelect} selectedLocation={selectedLocation}/>
      <p>
        {selectedLocation.city && selectedLocation.country ? `Showing weather for ${selectedLocation.city}, ${selectedLocation.country}` : "No city selected"}
      </p>

      {weatherData && (
        <div>
          <h2>Weather in {weatherData.location.name}</h2>
          <p>
            <strong>Region:</strong> {weatherData.location.region}
          </p>
          <p>
            <strong>Country:</strong> {weatherData.location.country}
          </p>
          <p>
            <strong>Temperature:</strong> {weatherData.current.temp_c}°C
          </p>
          <p>
            <strong>Condition:</strong> {weatherData.current.condition.text}
          </p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
        </div>
      )}
    </>
  );
}

export default App;
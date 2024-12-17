import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import WeatherList from "./components/WeatherList";
import axios from "axios";

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      icon: string;
      text: string;
    };
  };
}

export interface Location {
  city: string;
  country: string;
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location>({
    city: "",
    country: "",
  });
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [favorites, setFavorites] = useState<Location[]>([]);
  const WEATHER_API_KEY = "e2265aa018c54adfbd2190538240812";

  const fetchWeather = async (selectedCity: string) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json`,
        {
          params: {
            key: WEATHER_API_KEY,
            q: selectedCity,
            days: 10, // Fetch 10-day forecast
          },
        }
      );
      setForecast(response.data.forecast.forecastday);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    fetchWeather(location.city);
  };

  const handleAddToFavorites = () => {
    if (
      selectedLocation.city &&
      !favorites.some(
        (fav) =>
          fav.city === selectedLocation.city &&
          fav.country === selectedLocation.country
      )
    ) {
      setFavorites((prevFavorites) => [...prevFavorites, selectedLocation]);
    }
  };

  return (
    <div className="app-container">
      <Sidebar favorites={favorites} onSelectFavorite={handleLocationSelect}  />
      <div className="main-content">
        <SearchBar
          setSelectedLocation={handleLocationSelect}
          selectedLocation={selectedLocation}
        />
        <h1>Weather App</h1>
        <p>
          {selectedLocation.city && selectedLocation.country
            ? `Showing 10-day forecast for ${selectedLocation.city}, ${selectedLocation.country}`
            : "No city selected"}
        </p>
        <WeatherList forecast={forecast} />
      </div>
    </div>
  );
}

export default App;
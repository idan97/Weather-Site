import React, { useState } from "react";
import styles from "../styles/SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Location } from "../App";

interface SearchBarProps {
  selectedLocation: Location;
  setSelectedLocation: (city: string, country: string) => void;
}

const WEATHER_API_KEY = "e2265aa018c54adfbd2190538240812";

const SearchBar: React.FC<SearchBarProps> = ({
  setSelectedLocation,
  selectedLocation,
}) => {
  const [suggestions, setSuggestions] = useState<
    { city: string; country: string }[]
  >([]);
  const [currSearch, setCurrSearch] = useState(selectedLocation.city);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=${WEATHER_API_KEY}&q=${value}`
      );

      const cityData = response.data.map((entry: any) => ({
        city: entry.name,
        country: entry.country,
      }));

      setSuggestions(cityData);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setCurrSearch(value);
    fetchSuggestions(value);
  };

  const handleCitySelect = (city: string, country: string) => {
    setCurrSearch(`${city}, ${country}`);
    setSelectedLocation(city, country);
    setShowSuggestions(false);
  };

  return (
    <div className={styles["search-bar-container"]}>
      <div className={styles["input-container"]}>
        <FontAwesomeIcon icon={faSearch} className={styles["search-icon"]} />
        <input
          className={styles["search-bar"]}
          type="text"
          placeholder="Search"
          value={currSearch}
          onChange={handleInputChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
        />
      </div>
      {showSuggestions && (
        <ul className={styles["suggestions-list"]}>
          {suggestions.map(({ city, country }, index) => (
            <li
              className={styles["suggestion-item"]}
              key={index}
              onClick={() => handleCitySelect(city, country)}
            >
              {city}, {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

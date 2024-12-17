import React from "react";
import "../styles/WeatherList.css"; 

interface WeatherItemProps {
  day: string;
  icon: string;
  minTemp: number;
  maxTemp: number;
}

const WeatherItem: React.FC<WeatherItemProps> = ({
  day,
  icon,
  minTemp,
  maxTemp,
}) => {
  return (
    <div className="weather-item">
      <div className="weather-day">{day}</div>
      <img src={icon} alt="Weather Icon" className="weather-icon" />
      <div className="weather-temp">
        <span>{minTemp}°</span>
        <div className="temp-bar"></div>
        <span>{maxTemp}°</span>
      </div>
    </div>
  );
};

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

interface WeatherListProps {
  forecast: ForecastDay[];
}

const WeatherList: React.FC<WeatherListProps> = ({ forecast }) => {
  return (
    <div className="weather-list">
      {forecast.map((day) => (
        <WeatherItem
          key={day.date}
          day={day.date}
          icon={day.day.condition.icon}
          minTemp={day.day.mintemp_c}
          maxTemp={day.day.maxtemp_c}
        />
      ))}
    </div>
  );
};

export default WeatherList;
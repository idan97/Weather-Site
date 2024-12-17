import React from "react";
import "../styles/Sidebar.css";
import { Location } from "../App";

interface FavoriteLocationProps {
  location: Location;
  onSelectFavorite: (location: Location) => void;
}

const FavoriteLocation: React.FC<FavoriteLocationProps> = ({
  location,
  onSelectFavorite,
}) => {
  return (
    <div
      className="favorite-location"
      onClick={() => onSelectFavorite(location)}
    >
      <p>
        {location.city}, {location.country}
      </p>
    </div>
  );
};
interface SidebarProps {
  favorites: Location[];
  onSelectFavorite: (location: Location) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ favorites, onSelectFavorite }) => {
  return (
    <div className="sidebar">
      {favorites.length === 0 ? (
        <p>No favorites selected</p>
      ) : (
        favorites.map((location: Location, index: number) => (
          <FavoriteLocation
            key={index}
            location={location}
            onSelectFavorite={onSelectFavorite}
          />
        ))
      )}
    </div>
  );
};

export default Sidebar;

import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('hotel_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading favorites from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('hotel_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (hotel) => {
    if (!favorites.some((fav) => fav.id === hotel.id)) {
      setFavorites((prev) => [...prev, hotel]);
      toast.success(`${hotel.name} added to favorites!`);
    }
  };

  const removeFromFavorites = (hotelId) => {
    const hotelToRemove = favorites.find((fav) => fav.id === hotelId);
    setFavorites((prev) => prev.filter((fav) => fav.id !== hotelId));
    if (hotelToRemove) {
      toast.success(`${hotelToRemove.name} removed from favorites.`);
    }
  };

  const isFavorite = (hotelId) => {
    return favorites.some((fav) => fav.id === hotelId);
  };

  const toggleFavorite = (hotel) => {
    if (isFavorite(hotel.id)) {
      removeFromFavorites(hotel.id);
    } else {
      addToFavorites(hotel);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

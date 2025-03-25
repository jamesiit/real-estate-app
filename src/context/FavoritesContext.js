import React, { createContext, useState, useEffect } from 'react';

// Create context
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // State to hold favorite properties
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Add a property to favorites
  const addToFavorites = (property) => {
    // Check if property is already in favorites
    if (!favorites.some(fav => fav.id === property.id)) {
      setFavorites(prevFavorites => [...prevFavorites, property]);
      return true;
    }
    return false;
  };

  // Remove a property from favorites
  const removeFromFavorites = (propertyId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(property => property.id !== propertyId)
    );
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  // Check if a property is in favorites
  const isInFavorites = (propertyId) => {
    return favorites.some(property => property.id === propertyId);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites, 
        removeFromFavorites, 
        clearFavorites, 
        isInFavorites 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider; 
import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FavoritesContext } from '../../context/FavoritesContext';
import useProperties from '../../hooks/useProperties';
import { filterProperties } from '../../utils/searchUtils';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import FavoritesList from '../Favorites/FavoritesList';
import Loading from '../UI/Loading';
import './SearchPage.css';

/**
 * SearchPage Component - Main page for property search
 * @param {Object} props - Component props
 * @param {boolean} props.favorites - Whether to show only favorites
 * @returns {JSX.Element} SearchPage component
 */
const SearchPage = ({ favorites = false }) => {
  const { properties, loading, error } = useProperties();
  const { favorites: favoritesList } = useContext(FavoritesContext);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (favorites && properties.length > 0 && favoritesList) {
      const favoriteProperties = properties.filter(property => 
        favoritesList.some(fav => fav.id === property.id)
      );
      setSearchResults(favoriteProperties);
      setHasSearched(true);
    }
  }, [favorites, properties, favoritesList]);

  // Handle search submission from form
  const handleSearch = (searchCriteria) => {
    let results = filterProperties(properties, searchCriteria);
    
    if (favorites && favoritesList) {
      results = results.filter(property => 
        favoritesList.some(fav => fav.id === property.id)
      );
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };

  // Toggle favorites sidebar on mobile
  const toggleFavorites = () => {
    setShowFavorites(prev => !prev);
  };

  if (loading) {
    return (
      <div className="search-page-loading">
        <Loading size="large" text="Loading properties..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-page-error">
        <p>Error: {error}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="search-page">
        <Helmet>
          <title>
            {favorites ? 'My Favorite Properties' : 'Search Properties'} | Viva Properties
          </title>
          <meta 
            name="description" 
            content={favorites 
              ? "View and manage your favorite properties" 
              : "Search for your perfect property - filter by type, price, bedrooms, location and more"
            } 
          />
          {/* Content Security Policy */}
          <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'" />
        </Helmet>
        
        {!favorites && (
          <button 
            className={`favorites-toggle ${showFavorites ? 'active' : ''}`} 
            onClick={toggleFavorites}
            aria-label={showFavorites ? 'Hide favorites' : 'Show favorites'}
          >
            {showFavorites ? '✕' : '♥'}
          </button>
        )}
        
        <div className="search-page-container">
          <main className="search-page-main">
            <header className="search-page-header">
              <h1>{favorites ? 'My Favorite Properties' : 'Find Your Dream Home'}</h1>
              <p>
                {favorites 
                  ? 'Manage your collection of saved properties' 
                  : 'Search from our collection of premium properties'
                }
              </p>
            </header>
            
            <SearchForm 
              properties={properties} 
              onSearch={handleSearch} 
            />
            
            {hasSearched ? (
              <SearchResults 
                properties={searchResults} 
                isLoading={loading}
                emptyMessage={favorites ? "You haven't saved any properties yet" : "No properties match your search criteria"}
              />
            ) : (
              <SearchResults 
                properties={favorites ? [] : properties} 
                isLoading={loading}
                emptyMessage={favorites ? "You haven't saved any properties yet" : "No properties available"}
              />
            )}
          </main>
          
          {!favorites && (
            <aside className={`search-page-sidebar ${showFavorites ? 'show' : ''}`}>
              <FavoritesList />
            </aside>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default SearchPage; 
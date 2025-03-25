import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';
import { formatPrice } from '../../utils/searchUtils';
import Button from '../UI/Button';
import './FavoritesList.css';

/**
 * FavoritesList Component
 * @returns {JSX.Element} FavoritesList component
 */
const FavoritesList = () => {
  const { favorites, removeFromFavorites, clearFavorites, addToFavorites } = useContext(FavoritesContext);

  // Set up drop functionality
  const [{ isOver }, drop] = useDrop({
    accept: 'PROPERTY',
    drop: (item) => {
      addToFavorites(item.property);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleRemoveFromFavorites = (e, propertyId) => {
    e.preventDefault();
    removeFromFavorites(propertyId);
  };

  return (
    <div 
      ref={drop} 
      className={`favorites-container ${isOver ? 'drag-over' : ''}`}
    >
      <div className="favorites-header">
        <h2>Favorites</h2>
        <span className="favorites-count">{favorites.length} {favorites.length === 1 ? 'property' : 'properties'}</span>
      </div>
      
      {favorites.length > 0 ? (
        <>
          <div className="favorites-list">
            {favorites.map(property => (
              <div 
                key={property.id} 
                className="favorite-item"
                draggable
                onDragStart={(e) => {
                  // Prevent default to ensure the card doesn't get dragged with the item
                  e.stopPropagation();
                }}
              >
                <Link to={`/property/${property.id}`} className="favorite-link">
                  <div className="favorite-image">
                    <img src={process.env.PUBLIC_URL + property.images[0]} alt={property.address} />
                  </div>
                  <div className="favorite-content">
                    <h4 className="favorite-title">{property.address}</h4>
                    <p className="favorite-price">{formatPrice(property.price)}</p>
                    <div className="favorite-details">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.postcodeArea}</span>
                    </div>
                  </div>
                  <button 
                    className="favorite-remove" 
                    onClick={(e) => handleRemoveFromFavorites(e, property.id)}
                    aria-label="Remove from favorites"
                  >
                    &times;
                  </button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="favorites-actions">
            <Button 
              type="danger" 
              onClick={clearFavorites}
              className="clear-favorites-btn"
            >
              Clear All
            </Button>
          </div>
        </>
      ) : (
        <div className="favorites-empty">
          <p>No favorites yet</p>
          <p className="favorites-hint">Drag properties here or click the favorite button</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesList; 
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { FavoritesContext } from '../../context/FavoritesContext';
import { formatPrice, formatDate } from '../../utils/searchUtils';
import Button from './Button';
import './PropertyCard.css';

/**
 * PropertyCard Component
 * @param {Object} props - Component props
 * @param {Object} props.property - Property data
 * @returns {JSX.Element} PropertyCard component
 */
const PropertyCard = ({ property }) => {
  const { addToFavorites, removeFromFavorites, isInFavorites } = useContext(FavoritesContext);
  
  const isFavorite = isInFavorites(property.id);
  
  // Set up drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: 'PROPERTY',
    item: { id: property.id, property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property);
    }
  };

  return (
    <div 
      ref={drag}
      className={`property-card ${isDragging ? 'is-dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="property-card-image">
        <img src={process.env.PUBLIC_URL + property.images[0]} alt={property.address} />
        <span className="property-type">{property.type}</span>
      </div>
      
      <div className="property-card-content">
        <h3 className="property-title">
          <Link to={`/property/${property.id}`}>{property.address}</Link>
        </h3>
        
        <p className="property-price">{formatPrice(property.price)}</p>
        
        <div className="property-details">
          <span className="property-detail">
            <i className="fa fa-bed"></i> {property.bedrooms} bedrooms
          </span>
          <span className="property-detail">
            <i className="fa fa-bath"></i> {property.bathrooms} bathrooms
          </span>
          <span className="property-detail">
            <i className="fa fa-map-marker"></i> {property.postcodeArea}
          </span>
        </div>
        
        <p className="property-description">{property.description}</p>
        
        <div className="property-footer">
          <span className="property-date">Added: {formatDate(property.dateAdded)}</span>
          
          <div className="property-actions">
            <Button
              type={isFavorite ? 'danger' : 'secondary'}
              onClick={handleFavoriteToggle}
              className="favorite-btn"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '♥ Remove' : '♡ Favorite'}
            </Button>
            
            <Link to={`/property/${property.id}`} className="btn btn-primary view-btn">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 
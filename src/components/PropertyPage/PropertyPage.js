import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import useProperties from '../../hooks/useProperties';
import { FavoritesContext } from '../../context/FavoritesContext';
import { formatPrice } from '../../utils/searchUtils';
import PropertyGallery from './PropertyGallery';
import PropertyTabs from './PropertyTabs';
import Button from '../UI/Button';
import Loading from '../UI/Loading';
import './PropertyPage.css';

/**
 * PropertyPage Component - Displays detailed property information
 * @returns {JSX.Element} PropertyPage component
 */
const PropertyPage = () => {
  const { id } = useParams();
  const { getPropertyById, loading, error } = useProperties();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useContext(FavoritesContext);
  
  const property = getPropertyById(Number(id));
  const isFavorite = property ? isInFavorites(property.id) : false;
  
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(property.id);
      toast.success('Removed from favorites');
    } else {
      const added = addToFavorites(property);
      if (added) {
        toast.success('Added to favorites');
      } else {
        toast.info('Already in favorites');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="property-page-loading">
        <Loading size="large" text="Loading property details..." />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="property-page-error">
        <p>Error: {error}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property Not Found</h2>
        <p>Sorry, the property you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="back-link">
          Back to Search
        </Link>
      </div>
    );
  }
  
  return (
    <div className="property-page">
      <Helmet>
        <title>{property.address} | Estate Agent</title>
        <meta name="description" content={property.description} />
        {/* Content Security Policy */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://maps.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.googleapis.com https://*.gstatic.com; font-src 'self'; connect-src 'self' https://*.googleapis.com" />
      </Helmet>
      
      <div className="property-page-container">
        <header className="property-header">
          <div className="property-header-content">
            <h1 className="property-title">{property.address}</h1>
            <p className="property-price">{formatPrice(property.price)}</p>
            
            <div className="property-meta">
              <span className="property-meta-item">
                <i className="fa fa-home"></i> {property.type}
              </span>
              <span className="property-meta-item">
                <i className="fa fa-bed"></i> {property.bedrooms} bedrooms
              </span>
              <span className="property-meta-item">
                <i className="fa fa-bath"></i> {property.bathrooms} bathrooms
              </span>
              <span className="property-meta-item">
                <i className="fa fa-map-marker"></i> {property.postcodeArea}
              </span>
            </div>
          </div>
          
          <div className="property-actions">
            <Button
              type={isFavorite ? 'danger' : 'secondary'}
              onClick={handleFavoriteToggle}
              className="favorite-btn"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
            
            <Link to="/" className="btn btn-primary back-btn">
              Back to Search
            </Link>
          </div>
        </header>
        
        <PropertyGallery images={property.images} />
        
        <PropertyTabs property={property} />
      </div>
    </div>
  );
};

export default PropertyPage; 
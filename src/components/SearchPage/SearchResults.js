import React from 'react';
import PropertyCard from '../UI/PropertyCard';
import './SearchResults.css';

/**
 * SearchResults Component
 * @param {Object} props - Component props
 * @param {Array} props.properties - Filtered properties to display
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.emptyMessage - Custom message to display when no properties are found
 * @returns {JSX.Element} SearchResults component
 */
const SearchResults = ({ 
  properties, 
  isLoading, 
  emptyMessage = "No properties found matching your criteria. Try adjusting your search filters to see more results."
}) => {
  if (isLoading) {
    return (
      <div className="search-results-loading">
        <div className="loading-spinner"></div>
        <p>Loading properties...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="search-results-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-results-header">
        <h2>Properties Found</h2>
        <span className="results-count">{properties.length} {properties.length === 1 ? 'property' : 'properties'}</span>
      </div>
      
      <div className="property-grid">
        {properties.map(property => (
          <div key={property.id} className="property-grid-item">
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults; 
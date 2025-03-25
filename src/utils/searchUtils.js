/**
 * Utility functions for property search
 */

/**
 * Filter properties based on search criteria
 * @param {Array} properties - All properties to filter
 * @param {Object} searchCriteria - Search criteria object
 * @returns {Array} - Filtered properties
 */
export const filterProperties = (properties, searchCriteria) => {
  // If no search criteria provided, return all properties
  if (!searchCriteria || Object.keys(searchCriteria).length === 0) {
    return properties;
  }

  return properties.filter(property => {
    // Filter by property type
    if (searchCriteria.type && searchCriteria.type !== 'any' && property.type !== searchCriteria.type) {
      return false;
    }

    // Filter by price range
    if (searchCriteria.minPrice && property.price < searchCriteria.minPrice) {
      return false;
    }
    if (searchCriteria.maxPrice && property.price > searchCriteria.maxPrice) {
      return false;
    }

    // Filter by bedrooms
    if (searchCriteria.minBedrooms && property.bedrooms < searchCriteria.minBedrooms) {
      return false;
    }
    if (searchCriteria.maxBedrooms && property.bedrooms > searchCriteria.maxBedrooms) {
      return false;
    }

    // Filter by date added
    if (searchCriteria.dateAddedAfter) {
      const propertyDate = new Date(property.dateAdded);
      const afterDate = new Date(searchCriteria.dateAddedAfter);
      if (propertyDate < afterDate) {
        return false;
      }
    }

    if (searchCriteria.dateAddedBefore) {
      const propertyDate = new Date(property.dateAdded);
      const beforeDate = new Date(searchCriteria.dateAddedBefore);
      if (propertyDate > beforeDate) {
        return false;
      }
    }

    // Filter by postcode area
    if (searchCriteria.postcodeArea && 
        property.postcodeArea !== searchCriteria.postcodeArea) {
      return false;
    }

    // All filters passed
    return true;
  });
};

/**
 * Format price as currency
 * @param {number} price - The price to format
 * @returns {string} - Formatted price
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(price);
};

/**
 * Format date to readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date
 */
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

/**
 * Get all unique postcode areas from properties
 * @param {Array} properties - All properties
 * @returns {Array} - Unique postcode areas
 */
export const getUniquePostcodeAreas = (properties) => {
  const areas = properties.map(property => property.postcodeArea);
  return [...new Set(areas)];
};

/**
 * Generate range array for bedrooms or price filters
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} step - Step between values
 * @returns {Array} - Range array
 */
export const generateRange = (min, max, step = 1) => {
  const range = [];
  for (let i = min; i <= max; i += step) {
    range.push(i);
  }
  return range;
}; 
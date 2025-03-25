/**
 * Utility functions for handling property images
 */

/**
 * Get the main image URL for a property
 * @param {string} propertyId - The ID of the property
 * @returns {string} The URL of the main property image
 */
export const getPropertyMainImage = (propertyId) => {
  return `/images/property${propertyId}/main.jpg`;
};

/**
 * Get all image URLs for a property
 * @param {string} propertyId - The ID of the property
 * @returns {string[]} Array of image URLs for the property
 */
export const getPropertyImages = (propertyId) => {
  // This is a placeholder. In a real application, you would:
  // 1. Either fetch this from an API
  // 2. Or maintain a mapping of property IDs to their available images
  return [
    `/images/property${propertyId}/main.jpg`,
    `/images/property${propertyId}/living-room.jpg`,
    `/images/property${propertyId}/kitchen.jpg`,
    `/images/property${propertyId}/bedroom.jpg`,
    `/images/property${propertyId}/bathroom.jpg`,
  ];
};

/**
 * Get the floor plan image URL for a property
 * @param {string} propertyId - The ID of the property
 * @returns {string} The URL of the floor plan image
 */
export const getPropertyFloorPlan = (propertyId) => {
  return `/images/property${propertyId}/floor-plan.jpg`;
};

/**
 * Handle missing images with a fallback
 * @param {Event} event - The error event from the img element
 */
export const handleImageError = (event) => {
  event.target.src = '/images/placeholder.jpg';
  event.target.alt = 'Image not available';
}; 
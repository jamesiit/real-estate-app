import { useState, useEffect } from 'react';
import propertiesData from '../data/properties.json';

/**
 * Custom hook to fetch and manage properties
 * @returns {Object} - Properties data and loading state
 */
const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate API fetch with setTimeout
    const fetchProperties = async () => {
      try {
        setLoading(true);
        
        // In a real app, this would be an API call
        // Here we're using the local JSON data with a setTimeout to simulate network request
        setTimeout(() => {
          setProperties(propertiesData.properties);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to fetch properties');
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);
  
  /**
   * Get a single property by ID
   * @param {number} id - Property ID
   * @returns {Object|null} - Property object or null if not found
   */
  const getPropertyById = (id) => {
    return properties.find(property => property.id === parseInt(id)) || null;
  };
  
  /**
   * Create a new property
   * @param {Object} propertyData - New property data
   * @returns {Object} - The created property
   */
  const createProperty = (propertyData) => {
    // Generate a new ID (in a real app, this would be done on the server)
    const newId = Math.max(...properties.map(p => p.id), 0) + 1;
    
    // Create the new property with the generated ID
    const newProperty = {
      ...propertyData,
      id: newId,
      dateAdded: new Date().toISOString().split('T')[0]
    };
    
    // Update the state
    setProperties(prevProperties => [...prevProperties, newProperty]);
    
    // In a real app, this would make an API call to save the data
    // localStorage.setItem('properties', JSON.stringify([...properties, newProperty]));
    
    return newProperty;
  };
  
  /**
   * Update an existing property
   * @param {number} id - Property ID to update
   * @param {Object} updates - Property data updates
   * @returns {Object|null} - The updated property or null if not found
   */
  const updateProperty = (id, updates) => {
    const propertyIndex = properties.findIndex(prop => prop.id === parseInt(id));
    
    if (propertyIndex === -1) {
      return null;
    }
    
    // Create the updated property
    const updatedProperty = {
      ...properties[propertyIndex],
      ...updates
    };
    
    // Update the state
    const updatedProperties = [...properties];
    updatedProperties[propertyIndex] = updatedProperty;
    setProperties(updatedProperties);
    
    // In a real app, this would make an API call to save the data
    // localStorage.setItem('properties', JSON.stringify(updatedProperties));
    
    return updatedProperty;
  };
  
  /**
   * Delete a property
   * @param {number} id - Property ID to delete
   * @returns {boolean} - Success status
   */
  const deleteProperty = (id) => {
    const propertyIndex = properties.findIndex(prop => prop.id === parseInt(id));
    
    if (propertyIndex === -1) {
      return false;
    }
    
    // Update the state
    const updatedProperties = properties.filter(prop => prop.id !== parseInt(id));
    setProperties(updatedProperties);
    
    // In a real app, this would make an API call to save the data
    // localStorage.setItem('properties', JSON.stringify(updatedProperties));
    
    return true;
  };
  
  return { 
    properties, 
    loading, 
    error, 
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
  };
};

export default useProperties; 
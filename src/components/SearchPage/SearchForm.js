import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { getUniquePostcodeAreas, generateRange } from '../../utils/searchUtils';
import Button from '../UI/Button';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchForm.css';

/**
 * SearchForm Component
 * @param {Object} props - Component props
 * @param {Array} props.properties - All properties data
 * @param {Function} props.onSearch - Function to handle search submission
 * @returns {JSX.Element} SearchForm component
 */
const SearchForm = ({ properties, onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAddedAfter: null,
    dateAddedBefore: null,
    postcodeArea: '',
  });

  const [postcodeAreas, setPostcodeAreas] = useState([]);
  
  // Get unique postcode areas for the dropdown
  useEffect(() => {
    if (properties.length > 0) {
      const areas = getUniquePostcodeAreas(properties);
      setPostcodeAreas(
        areas.map(area => ({ value: area, label: area }))
      );
    }
  }, [properties]);
  
  // Handle form input changes
  const handleInputChange = (field, value) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clean up empty values before submitting
    const cleanCriteria = Object.entries(searchCriteria)
      .reduce((acc, [key, value]) => {
        if (value !== '' && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {});
      
    onSearch(cleanCriteria);
  };
  
  // Clear all form fields
  const handleClear = () => {
    setSearchCriteria({
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateAddedAfter: null,
      dateAddedBefore: null,
      postcodeArea: '',
    });
    
    // Submit empty criteria to show all properties
    onSearch({});
  };
  
  // Generate options for dropdowns
  const typeOptions = [
    { value: '', label: 'Any' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' },
  ];
  
  const priceOptions = generateRange(100000, 2000000, 100000).map(price => ({
    value: price,
    label: `£${(price / 1000).toFixed(0)}k`
  }));
  
  const bedroomOptions = generateRange(1, 10).map(num => ({
    value: num,
    label: num.toString()
  }));
  
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Find Your Perfect Property</h2>
      
      <div className="search-form-grid">
        <div className="form-group">
          <label htmlFor="property-type">Property Type</label>
          <Select
            id="property-type"
            options={typeOptions}
            isClearable
            placeholder="Any"
            value={typeOptions.find(option => option.value === searchCriteria.type) || null}
            onChange={(option) => handleInputChange('type', option?.value || '')}
            aria-label="Property Type"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="min-price">Min Price</label>
          <Select
            id="min-price"
            options={priceOptions}
            isClearable
            placeholder="No min"
            value={priceOptions.find(option => option.value === searchCriteria.minPrice) || null}
            onChange={(option) => handleInputChange('minPrice', option?.value || '')}
            aria-label="Minimum Price"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="max-price">Max Price</label>
          <Select
            id="max-price"
            options={priceOptions}
            isClearable
            placeholder="No max"
            value={priceOptions.find(option => option.value === searchCriteria.maxPrice) || null}
            onChange={(option) => handleInputChange('maxPrice', option?.value || '')}
            aria-label="Maximum Price"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="min-bedrooms">Min Bedrooms</label>
          <Select
            id="min-bedrooms"
            options={bedroomOptions}
            isClearable
            placeholder="Any"
            value={bedroomOptions.find(option => option.value === searchCriteria.minBedrooms) || null}
            onChange={(option) => handleInputChange('minBedrooms', option?.value || '')}
            aria-label="Minimum Bedrooms"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="max-bedrooms">Max Bedrooms</label>
          <Select
            id="max-bedrooms"
            options={bedroomOptions}
            isClearable
            placeholder="Any"
            value={bedroomOptions.find(option => option.value === searchCriteria.maxBedrooms) || null}
            onChange={(option) => handleInputChange('maxBedrooms', option?.value || '')}
            aria-label="Maximum Bedrooms"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date-added-after">Added After</label>
          <DatePicker
            id="date-added-after"
            selected={searchCriteria.dateAddedAfter}
            onChange={(date) => handleInputChange('dateAddedAfter', date)}
            maxDate={new Date()}
            placeholderText="Any date"
            dateFormat="dd/MM/yyyy"
            className="date-picker"
            aria-label="Date Added After"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date-added-before">Added Before</label>
          <DatePicker
            id="date-added-before"
            selected={searchCriteria.dateAddedBefore}
            onChange={(date) => handleInputChange('dateAddedBefore', date)}
            maxDate={new Date()}
            placeholderText="Any date"
            dateFormat="dd/MM/yyyy"
            className="date-picker"
            aria-label="Date Added Before"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="postcode-area">Postcode Area</label>
          <Select
            id="postcode-area"
            options={[{ value: '', label: 'Any' }, ...postcodeAreas]}
            isClearable
            placeholder="Any"
            value={postcodeAreas.find(option => option.value === searchCriteria.postcodeArea) || null}
            onChange={(option) => handleInputChange('postcodeArea', option?.value || '')}
            aria-label="Postcode Area"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>
      
      <div className="search-form-actions">
        <Button type="secondary" onClick={handleClear}>
          Clear All
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          Search Properties
        </Button>
      </div>
    </form>
  );
};

export default SearchForm; 
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import 'react-tabs/style/react-tabs.css';
import './PropertyTabs.css';

/**
 * PropertyTabs Component
 * @param {Object} props - Component props
 * @param {Object} props.property - Property data
 * @returns {JSX.Element} PropertyTabs component
 */
const PropertyTabs = ({ property }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: property.location.lat,
    lng: property.location.lng,
  };

  return (
    <div className="property-tabs">
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div className="tab-content description-tab">
            <h3>Property Description</h3>
            <p>{property.longDescription}</p>
            
            <div className="property-features">
              <h4>Features</h4>
              <ul>
                {property.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </TabPanel>
        
        <TabPanel>
          <div className="tab-content floor-plan-tab">
            <h3>Floor Plan</h3>
            <div className="floor-plan-container">
              <img 
                src={process.env.PUBLIC_URL + property.floorPlan} 
                alt="Property floor plan" 
                className="floor-plan-image"
              />
            </div>
          </div>
        </TabPanel>
        
        <TabPanel>
          <div className="tab-content map-tab">
            <h3>Location</h3>
            <div className="map-container">
              {/* Replace YOUR_GOOGLE_MAPS_API_KEY with an actual API key in production */}
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
              <p className="map-address">
                <strong>Address: </strong> {property.address}, {property.postcode}
              </p>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyTabs; 
import React from 'react';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="admin-content">
        <div className="property-form-container">
          <h2>Add/Edit Property</h2>
          <div className="property-form">
            {/* Property form will be implemented here */}
            <p>Property management form coming soon...</p>
          </div>
        </div>
        <div className="property-list-container">
          <h2>Property List</h2>
          <div className="property-list">
            {/* Property list will be implemented here */}
            <p className="no-properties">No properties to display</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 
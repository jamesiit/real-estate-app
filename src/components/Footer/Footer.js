import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">Viva Properties</h3>
          <p className="footer-text">
            Find your dream property with our easy-to-use platform.
            Browse listings, save favorites, and contact agents all in one place.
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <address className="footer-contact">
            <p>123 Property Street</p>
            <p>New York, NY 10001</p>
            <p>Email: info@vivaproperties.com</p>
            <p>Phone: (123) 456-7890</p>
          </address>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; {currentYear} Viva Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
import React from 'react';
import { Helmet } from 'react-helmet';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Helmet>
        <title>About Us | Viva Properties</title>
        <meta name="description" content="Learn about Viva Properties - our mission, values, and commitment to helping you find your dream home" />
      </Helmet>
      
      <div className="container">
        <div className="about-header">
          <h1>About Viva Properties</h1>
          <p className="tagline">Your Trusted Partner in Property Search</p>
        </div>
        
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Viva Properties, we're dedicated to simplifying your property search experience. 
            Our mission is to connect people with their dream homes through an intuitive, 
            user-friendly platform that makes finding and comparing properties effortless.
          </p>
        </section>
        
        <section className="about-section">
          <h2>What Sets Us Apart</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Curated Listings</h3>
              <p>We carefully select and verify all properties to ensure quality and accuracy.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search</h3>
              <p>Our powerful search tools help you find exactly what you're looking for.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h3>Personalized Experience</h3>
              <p>Save your favorite properties and receive tailored recommendations.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Expert Support</h3>
              <p>Our team of real estate professionals is always ready to assist you.</p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, Viva Properties was born from a simple idea: property searching 
            should be enjoyable, not stressful. What started as a small project has grown into 
            a comprehensive platform that helps thousands of people find their perfect home.
          </p>
          <p>
            Our team combines expertise in real estate, technology, and customer service to 
            create an exceptional property search experience. We continuously improve our 
            platform based on user feedback to better serve your needs.
          </p>
        </section>
        
        <section className="about-section team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Jane Smith</h3>
              <p>Founder & CEO</p>
            </div>
            
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>John Davis</h3>
              <p>Chief Technology Officer</p>
            </div>
            
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Sarah Johnson</h3>
              <p>Head of Property Relations</p>
            </div>
            
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Michael Chen</h3>
              <p>Customer Experience Lead</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 
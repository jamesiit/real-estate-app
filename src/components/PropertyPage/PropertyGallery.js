import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './PropertyGallery.css';

/**
 * PropertyGallery Component
 * @param {Object} props - Component props
 * @param {Array} props.images - Array of image paths
 * @returns {JSX.Element} PropertyGallery component
 */
const PropertyGallery = ({ images }) => {
  // Format images for react-image-gallery
  const galleryImages = images.map(imagePath => ({
    original: process.env.PUBLIC_URL + imagePath,
    thumbnail: process.env.PUBLIC_URL + imagePath,
    originalAlt: 'Property image',
    thumbnailAlt: 'Property thumbnail',
  }));

  return (
    <div className="property-gallery">
      <ImageGallery
        items={galleryImages}
        showPlayButton={false}
        showFullscreenButton={true}
        showThumbnails={true}
        thumbnailPosition="bottom"
        slideInterval={3000}
        slideOnThumbnailOver={false}
        lazyLoad={true}
      />
    </div>
  );
};

export default PropertyGallery; 
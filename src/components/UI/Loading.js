import React from 'react';
import './Loading.css';

/**
 * Loading Component
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Size of the spinner: 'small', 'medium', 'large'
 * @param {string} [props.text='Loading...'] - Loading text
 * @returns {JSX.Element} Loading component
 */
const Loading = ({ size = 'medium', text = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className={`loading-spinner loading-${size}`}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading; 
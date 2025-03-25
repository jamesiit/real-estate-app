import React from 'react';
import './Button.css';

/**
 * Button Component
 * @param {Object} props - Component props
 * @param {string} props.type - Button type: 'primary', 'secondary', 'danger'
 * @param {Function} props.onClick - Click handler
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional classes
 * @returns {JSX.Element} Button component
 */
const Button = ({ 
  type = 'primary', 
  onClick, 
  children, 
  className = '',
  ...otherProps 
}) => {
  return (
    <button
      className={`btn btn-${type} ${className}`}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button; 
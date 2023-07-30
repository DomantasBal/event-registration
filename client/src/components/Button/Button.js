// Button.js
import React from 'react';
import './Button.css';

const Button = ({ className, text, type, onClick, width }) => {
  const buttonStyle = {
    width: width ? width : 'auto',
  };

  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={onClick}
      style={buttonStyle}
    >
      {text}
    </button>
  );
};

export default Button;

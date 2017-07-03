import React from 'react';

export default ({ label, ...props }) => (
  <button
    className="custom-button"
    {...props}
  >
    {label}
  </button>
);

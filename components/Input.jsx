import React from 'react';

const Input = ({ label, type = 'text', value, onChange, required = false, error = '', ...props }) => {
  return (
    <div className="input-container">
      <label className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`input-field ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;
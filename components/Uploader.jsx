import React, { useState } from 'react';

const Uploader = ({ label, onChange, required = false, error = '', accept = 'image/*' }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Check file type and size if needed
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the preview once the file is loaded
      };
      reader.readAsDataURL(file);

      // Pass the file to parent component via onChange
      onChange(file);
    }
  };

  return (
    <div className="uploader-container">
      <label className="uploader-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        required={required}
        className={`uploader-input ${error ? 'input-error' : ''}`}
      />
      {preview && (
        <div className="file-preview">
          <img src={preview} alt="File Preview" className="preview-image" />
        </div>
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Uploader;
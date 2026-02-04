'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const AboutManager = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  // Fetch the "About" data when the component mounts
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('/api/about');
        setAboutData(response.data.data);
        setFormData({
          title: response.data.data.title,
          description: response.data.data.description,
          imageUrl: response.data.data.imageUrl || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch About data.');
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Handle form submission for updating About data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/about', {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
      });
      alert('About section updated successfully!');
    } catch (err) {
      alert('Error updating About section.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="about-manager-container">
      <h1>Manage About Section</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>

      {aboutData && aboutData.imageUrl && (
        <div className="about-preview">
          <h2>Current Image:</h2>
          <img src={aboutData.imageUrl} alt="About Section" width="200" />
        </div>
      )}
    </div>
  );
};

export default AboutManager;
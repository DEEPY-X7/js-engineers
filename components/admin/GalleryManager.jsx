'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  // Fetch the gallery data when the component mounts
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get('/api/gallery');
        setGalleryItems(response.data.data); // Set the gallery data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gallery data.');
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Handle form submission for adding a new gallery item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/gallery', {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
      });
      alert('Gallery item added successfully!');
      setGalleryItems([...galleryItems, response.data.data]); // Add the new gallery item to the state
    } catch (err) {
      alert('Error adding gallery item.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="gallery-manager-container">
      <h1>Manage Gallery</h1>

      {/* Form to add new gallery item */}
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

        <button type="submit">Add Gallery Item</button>
      </form>

      {/* Display existing gallery items */}
      <h2>Existing Gallery</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {galleryItems.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.imageUrl && <img src={item.imageUrl} alt={item.title} width="100" />}</td>
              <td>
                <button onClick={() => window.location.href = `/admin/gallery/${item._id}/edit`}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GalleryManager;
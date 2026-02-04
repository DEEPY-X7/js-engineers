'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gallery data when component mounts
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get('/api/gallery');
        setGalleryItems(response.data.data); // Set the gallery items data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gallery data.');
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Handle deleting a gallery item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/gallery/${id}`);
      setGalleryItems(galleryItems.filter((item) => item._id !== id)); // Remove the deleted item from the UI
      alert('Gallery item deleted successfully!');
    } catch (err) {
      alert('Error deleting gallery item.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Gallery Items</h1>
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
              <td>
                {item.imageUrl && <img src={item.imageUrl} alt={item.title} width="100" />}
              </td>
              <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
                <button onClick={() => window.location.href = `/admin/gallery/${item._id}/edit`}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.location.href = '/admin/gallery/create'}>Add New Gallery Item</button>
    </div>
  );
};

export default GalleryPage;
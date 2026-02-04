'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditGalleryItemPage = ({ params }) => {
  const [galleryItem, setGalleryItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });

  const router = useRouter();

  // Fetch the gallery item data when the component mounts
  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const response = await axios.get(`/api/gallery/${params.id}`);
        setGalleryItem(response.data.data);
        setFormData({
          title: response.data.data.title,
          description: response.data.data.description,
          imageUrl: response.data.data.imageUrl || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch gallery item data.');
        setLoading(false);
      }
    };

    fetchGalleryItem();
  }, [params.id]);

  // Handle form submission for updating gallery item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/gallery/${params.id}`, {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
      });

      alert('Gallery item updated successfully!');
      router.push('/admin/gallery'); // Redirect to the gallery page after successful update
    } catch (err) {
      alert('Error updating gallery item.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Edit Gallery Item</h1>
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
    </div>
  );
};

export default EditGalleryItemPage;
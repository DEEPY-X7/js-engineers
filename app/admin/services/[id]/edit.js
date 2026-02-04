'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditServicePage = ({ params }) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const router = useRouter();

  // Fetch the service data when the component mounts
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(`/api/services/${params.id}`);
        setService(response.data.data);
        setFormData({
          title: response.data.data.title,
          description: response.data.data.description,
          price: response.data.data.price,
          imageUrl: response.data.data.imageUrl || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch service data.');
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [params.id]);

  // Handle form submission for updating service
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/services/${params.id}`, {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        imageUrl: formData.imageUrl,
      });

      alert('Service updated successfully!');
      router.push('/admin/services'); // Redirect to the services page after successful update
    } catch (err) {
      alert('Error updating service.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Edit Service</h1>
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
          <label>Price:</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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

export default EditServicePage;
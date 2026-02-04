'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  // Fetch the services data when the component mounts
  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data.data); // Set the services data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch services.');
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  // Handle form submission for adding a new service
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/services', {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        imageUrl: formData.imageUrl,
      });
      alert('Service added successfully!');
      setServices([...services, response.data.data]); // Add the new service to the state
    } catch (err) {
      alert('Error adding service.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="services-manager-container">
      <h1>Manage Services</h1>

      {/* Form to add new service */}
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

        <button type="submit">Add Service</button>
      </form>

      {/* Display existing services */}
      <h2>Existing Services</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service.title}</td>
              <td>{service.description}</td>
              <td>{service.price}</td>
              <td>
                <button onClick={() => window.location.href = `/admin/services/${service._id}/edit`}>Edit</button>
                <button onClick={() => handleDelete(service._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesManager;
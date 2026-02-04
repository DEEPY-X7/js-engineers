'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch service data when component mounts
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data.data); // Set the services data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch services.');
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  // Handle deleting a service
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/services/${id}`);
      setServices(services.filter((service) => service._id !== id)); // Remove the deleted service from the UI
      alert('Service deleted successfully!');
    } catch (err) {
      alert('Error deleting service.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Services</h1>
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
              <td>${service.price}</td>
              <td>
                <button onClick={() => handleDelete(service._id)}>Delete</button>
                <button onClick={() => window.location.href = `/admin/services/${service._id}/edit`}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.location.href = '/admin/services/create'}>Add New Service</button>
    </div>
  );
};

export default ServicesPage;
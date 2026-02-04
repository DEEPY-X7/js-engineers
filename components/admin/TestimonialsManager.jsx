'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: '',
    imageUrl: '',
  });

  // Fetch the testimonials data when the component mounts
  useEffect(() => {
    const fetchTestimonialsData = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        setTestimonials(response.data.data); // Set the testimonials data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch testimonials.');
        setLoading(false);
      }
    };

    fetchTestimonialsData();
  }, []);

  // Handle form submission for adding a new testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/testimonials', {
        name: formData.name,
        message: formData.message,
        rating: formData.rating,
        imageUrl: formData.imageUrl,
      });
      alert('Testimonial added successfully!');
      setTestimonials([...testimonials, response.data.data]); // Add the new testimonial to the state
    } catch (err) {
      alert('Error adding testimonial.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="testimonials-manager-container">
      <h1>Manage Testimonials</h1>

      {/* Form to add new testimonial */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Message:</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Rating:</label>
          <input
            type="number"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            required
            min="1"
            max="5"
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

        <button type="submit">Add Testimonial</button>
      </form>

      {/* Display existing testimonials */}
      <h2>Existing Testimonials</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial) => (
            <tr key={testimonial._id}>
              <td>{testimonial.name}</td>
              <td>{testimonial.message}</td>
              <td>{testimonial.rating}</td>
              <td>
                <button onClick={() => window.location.href = `/admin/testimonials/${testimonial._id}/edit`}>Edit</button>
                <button onClick={() => handleDelete(testimonial._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialsManager;
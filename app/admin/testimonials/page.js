'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch testimonial data when component mounts
  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const response = await axios.get('/api/testimonials');
        setTestimonials(response.data.data); // Set the testimonials data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch testimonials.');
        setLoading(false);
      }
    };

    fetchTestimonialData();
  }, []);

  // Handle deleting a testimonial
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/testimonials/${id}`);
      setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id)); // Remove the deleted testimonial from the UI
      alert('Testimonial deleted successfully!');
    } catch (err) {
      alert('Error deleting testimonial.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Testimonials</h1>
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
                <button onClick={() => handleDelete(testimonial._id)}>Delete</button>
                <button onClick={() => window.location.href = `/admin/testimonials/${testimonial._id}/edit`}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.location.href = '/admin/testimonials/create'}>Add New Testimonial</button>
    </div>
  );
};

export default TestimonialsPage;
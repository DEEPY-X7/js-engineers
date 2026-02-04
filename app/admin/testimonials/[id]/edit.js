'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const EditTestimonialPage = ({ params }) => {
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: '',
    imageUrl: '',
  });

  const router = useRouter();

  // Fetch the testimonial data when the component mounts
  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const response = await axios.get(`/api/testimonials/${params.id}`);
        setTestimonial(response.data.data);
        setFormData({
          name: response.data.data.name,
          message: response.data.data.message,
          rating: response.data.data.rating,
          imageUrl: response.data.data.imageUrl || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch testimonial data.');
        setLoading(false);
      }
    };

    fetchTestimonialData();
  }, [params.id]);

  // Handle form submission for updating testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/testimonials/${params.id}`, {
        name: formData.name,
        message: formData.message,
        rating: formData.rating,
        imageUrl: formData.imageUrl,
      });

      alert('Testimonial updated successfully!');
      router.push('/admin/testimonials'); // Redirect to the testimonials page after successful update
    } catch (err) {
      alert('Error updating testimonial.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Edit Testimonial</h1>
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

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditTestimonialPage;
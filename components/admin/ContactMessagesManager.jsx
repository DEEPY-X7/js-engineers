'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ContactMessagesManager = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contact message data when component mounts
  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const response = await axios.get('/api/contact-massages');
        setContactMessages(response.data.data); // Set the contact message data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch contact messages.');
        setLoading(false);
      }
    };

    fetchContactMessages();
  }, []);

  // Handle marking a contact message as read
  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`/api/contact-massages/${id}`, { status: 'read' });
      setContactMessages(contactMessages.map((message) =>
        message._id === id ? { ...message, status: 'read' } : message
      ));
      alert('Contact message marked as read!');
    } catch (err) {
      alert('Error marking contact message as read.');
    }
  };

  // Handle deleting a contact message
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contact-massages/${id}`);
      setContactMessages(contactMessages.filter((message) => message._id !== id)); // Remove the deleted message
      alert('Contact message deleted successfully!');
    } catch (err) {
      alert('Error deleting contact message.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="contact-messages-manager-container">
      <h1>Contact Messages</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactMessages.map((message) => (
            <tr key={message._id}>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.message}</td>
              <td>{message.status}</td>
              <td>
                <button onClick={() => handleMarkAsRead(message._id)}>Mark as Read</button>
                <button onClick={() => handleDelete(message._id)}>Delete</button>
                <button onClick={() => window.location.href = `/admin/contact-messages/${message._id}/edit`}>Respond</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.location.href = '/admin/contact-messages/create'}>Add New Contact Message</button>
    </div>
  );
};

export default ContactMessagesManager;
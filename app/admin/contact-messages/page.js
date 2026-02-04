'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ContactMessagesPage = () => {
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contact messages when component mounts
  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const response = await axios.get('/api/contact-messages');
        setContactMessages(response.data.data); // Set the contact messages data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch contact messages.');
        setLoading(false);
      }
    };

    fetchContactMessages();
  }, []);

  // Handle deleting a contact message
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/contact-messages/${id}`);
      setContactMessages(contactMessages.filter((message) => message._id !== id)); // Remove the deleted message from the UI
      alert('Contact message deleted successfully!');
    } catch (err) {
      alert('Error deleting contact message.');
    }
  };

  // Handle marking a contact message as read
  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`/api/contact-messages/${id}`, { status: 'read' });
      setContactMessages(contactMessages.map((message) => 
        message._id === id ? { ...message, status: 'read' } : message
      ));
      alert('Contact message marked as read!');
    } catch (err) {
      alert('Error marking contact message as read.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <button
          onClick={() => window.location.href = '/admin/contact-messages/create'}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Contact Message
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Message</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactMessages.map((message) => (
              <tr key={message._id} className="border-b last:border-0">
                <td className="p-3 font-medium">{message.name}</td>
                <td className="p-3">{message.email}</td>
                <td className="p-3">{message.phone || "-"}</td>
                <td className="p-3 capitalize">{message.service || "other"}</td>
                <td className="p-3">{message.message}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.status === "read"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {message.status || "unread"}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleDelete(message._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  {message.status !== "read" && (
                    <button
                      onClick={() => handleMarkAsRead(message._id)}
                      className="text-blue-600 hover:underline"
                    >
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactMessagesPage;

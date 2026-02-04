'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointment data when component mounts
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data.data); // Set the appointments data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments.');
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, []);

  // Handle deleting an appointment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/appointments/${id}`);
      setAppointments(appointments.filter((appointment) => appointment._id !== id)); // Remove the deleted appointment from the UI
      alert('Appointment deleted successfully!');
    } catch (err) {
      alert('Error deleting appointment.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Service</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.userId}</td>
              <td>{new Date(appointment.date).toLocaleDateString()}</td>
              <td>{appointment.service}</td>
              <td>{appointment.status}</td>
              <td>
                <button onClick={() => handleDelete(appointment._id)}>Delete</button>
                <button onClick={() => window.location.href = `/admin/appointments/${appointment._id}/edit`}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.location.href = '/admin/appointments/create'}>Add New Appointment</button>
    </div>
  );
};

export default AppointmentsPage;
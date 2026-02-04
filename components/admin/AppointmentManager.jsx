'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    date: '',
    service: '',
    status: 'pending',
  });

  // Fetch the appointment data when the component mounts
  useEffect(() => {
    const fetchAppointmentsData = async () => {
      try {
        const response = await axios.get('/api/appointments');
        setAppointments(response.data.data); // Set the appointments data
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch appointments.');
        setLoading(false);
      }
    };

    fetchAppointmentsData();
  }, []);

  // Handle form submission for adding a new appointment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/appointments', {
        userId: formData.userId,
        date: formData.date,
        service: formData.service,
        status: formData.status,
      });
      alert('Appointment added successfully!');
      setAppointments([...appointments, response.data.data]); // Add the new appointment to the state
    } catch (err) {
      alert('Error adding appointment.');
    }
  };

  // Handle changing the status of an appointment
  const handleChangeStatus = async (id, status) => {
    try {
      await axios.put(`/api/appointments/${id}`, { status });
      setAppointments(appointments.map((appointment) =>
        appointment._id === id ? { ...appointment, status } : appointment
      ));
      alert(`Appointment status updated to ${status}`);
    } catch (err) {
      alert('Error updating appointment status.');
    }
  };

  // Loading state
  if (loading) return <div>Loading...</div>;

  // Error state
  if (error) return <div>{error}</div>;

  return (
    <div className="appointment-manager-container">
      <h1>Manage Appointments</h1>

      {/* Form to add new appointment */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Service:</label>
          <input
            type="text"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            required
          />
        </div>

        <div>
          <label>Status:</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit">Add Appointment</button>
      </form>

      {/* Display existing appointments */}
      <h2>Existing Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
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
                <button onClick={() => handleChangeStatus(appointment._id, 'confirmed')}>Confirm</button>
                <button onClick={() => handleChangeStatus(appointment._id, 'completed')}>Complete</button>
                <button onClick={() => handleChangeStatus(appointment._id, 'cancelled')}>Cancel</button>
                <button onClick={() => window.location.href = `/admin/appointments/${appointment._id}/edit`}>Edit</button>
                <button onClick={() => handleDelete(appointment._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentManager;
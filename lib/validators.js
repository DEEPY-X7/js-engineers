// Appointment Validation
export function validateAppointment(data) {
  if (!data.userId || !data.date || !data.time || !data.service) {
    return {
      success: false,
      error: 'userId, date, time, and service are required',
    };
  }

  if (typeof data.service !== 'string' || data.service.length > 100) {
    return {
      success: false,
      error: 'Service name must be a string with max 100 characters',
    };
  }

  if (data.status && !['pending', 'confirmed', 'completed', 'cancelled'].includes(data.status)) {
    return {
      success: false,
      error: 'Invalid appointment status',
    };
  }

  return { success: true };
}

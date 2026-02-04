import mongoose from 'mongoose';

// Define the schema for the Appointment model
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (assuming a user exists)
      required: [true, 'User ID is required'],
    },
    date: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    time: {
      type: String,
      required: [true, 'Appointment time is required'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      maxlength: [100, 'Service name cannot exceed 100 characters'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Create and export the Appointment model
const Appointment =
  mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
export default Appointment;
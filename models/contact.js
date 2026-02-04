import mongoose from 'mongoose';

// Define the schema for the Contact model
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        'Please provide a valid email address',
      ],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters long'],
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Create and export the Contact model
const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Helper functions for contact operations
export async function createContactMessage(data) {
  return Contact.create(data);
}

export async function getAllContactMessages() {
  return Contact.find().sort({ createdAt: -1 });
}

export default Contact;
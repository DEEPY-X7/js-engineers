import mongoose from 'mongoose';

// Define the schema for the ContactSettings model
const contactSettingsSchema = new mongoose.Schema(
  {
    businessEmail: {
      type: String,
      required: [true, 'Business email is required'],
      match: [
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        'Please provide a valid email address',
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    businessHours: {
      type: String,
      required: [true, 'Business hours are required'],
      enum: ['9am-5pm', '10am-6pm', '24/7'], // Example business hours
    },
    contactMessageStatus: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled',
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Create and export the ContactSettings model
const ContactSettings =
  mongoose.models.ContactSettings || mongoose.model('ContactSettings', contactSettingsSchema);
export default ContactSettings;
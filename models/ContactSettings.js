import mongoose from 'mongoose';

// Define the schema for the ContactSettings model
const contactSettingsSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    mapLink: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Create and export the ContactSettings model
const ContactSettings =
  mongoose.models.ContactSettings || mongoose.model('ContactSettings', contactSettingsSchema);
export default ContactSettings;

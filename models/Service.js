import mongoose from 'mongoose';

// Define the schema for the Service model
const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description should be at least 10 characters long'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    imageUrl: {
      type: String,
      validate: {
        validator: (v) => {
          return /^https?:\/\/.+/i.test(v); // Basic URL validation
        },
        message: 'Invalid URL format',
      },
      required: false, // Image URL is optional
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Create and export the Service model
const Service =
  mongoose.models.Service || mongoose.model('Service', serviceSchema);
export default Service;
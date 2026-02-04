import mongoose from 'mongoose';

// Define the schema for the Gallery model
const gallerySchema = new mongoose.Schema(
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
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      validate: {
        validator: (v) => {
          return /^https?:\/\/.+/i.test(v); // Basic URL validation
        },
        message: 'Invalid URL format',
      },
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

// Create and export the Gallery model
const Gallery =
  mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
export default Gallery;
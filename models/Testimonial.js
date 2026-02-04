import mongoose from 'mongoose';

// Define the schema for the Testimonial model
const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters long'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5'],
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

// Create and export the Testimonial model
const Testimonial =
  mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
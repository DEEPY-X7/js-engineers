import { z } from 'zod';

// Define the validation schema for the Testimonials data
export const testimonialValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  imageUrl: z.string().url("Invalid URL format").optional(), // Image URL is optional but must be valid if provided
});

// Validate the incoming testimonial data
export const validateTestimonial = (data) => {
  try {
    testimonialValidationSchema.parse(data); // This will throw if validation fails
    return { success: true };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};
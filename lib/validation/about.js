import { z } from 'zod';

// Define the validation schema for the About data
export const aboutValidationSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(100, "Title is too long"),
  description: z.string().min(10, "Description should be at least 10 characters long"),
  imageUrl: z.string().url("Invalid URL format").optional(), // Image URL is optional but must be valid if provided
});

// Validate the incoming data
export const validateAbout = (data) => {
  try {
    aboutValidationSchema.parse(data); // This will throw if validation fails
    return { success: true };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};
import { z } from 'zod';

// Define the validation schema for the Gallery data
export const galleryValidationSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  imageUrl: z.string().url("Invalid URL format").min(1, "Image URL is required"), // Image URL must be a valid URL
});

// Validate the incoming gallery data
export const validateGallery = (data) => {
  try {
    galleryValidationSchema.parse(data); // This will throw if validation fails
    return { success: true };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};
import { z } from 'zod';

// Define the validation schema for the Services data
export const serviceValidationSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  price: z.number().positive("Price must be a positive number").optional(), // Price is optional
  imageUrl: z.string().url("Invalid URL format").optional(), // Image URL is optional but must be valid if provided
});

// Validate the incoming service data
export const validateService = (data) => {
  try {
    serviceValidationSchema.parse(data); // This will throw if validation fails
    return { success: true };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};
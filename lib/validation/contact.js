
import { z } from 'zod';

// Define the validation schema for the Contact form data
export const contactValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email format").max(255, "Email is too long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

// Validate the incoming contact form data
export const validateContact = (data) => {
  try {
    contactValidationSchema.parse(data); // This will throw if validation fails
    return { success: true };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};
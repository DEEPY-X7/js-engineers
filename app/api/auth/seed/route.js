import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { createRateLimiter } from '@/middleware/rate-limit'; // Rate limit middleware

const rateLimiter = createRateLimiter(2, 60 * 60); // Max 2 requests per hour

export async function POST(req) {
  try {
    // Rate limiting
    await rateLimiter(req);

    // Seeding data (admin user and default users)
    const seedData = {
      email: 'admin@example.com',
      password: 'admin123', // Don't use in production, this is just for seeding
    };

    // Hash password before saving to DB
    const hashedPassword = await bcrypt.hash(seedData.password, 10);

    await connectDB();

    // Check if the admin user already exists
    const userExists = await User.findOne({ email: seedData.email });
    if (userExists) {
      return NextResponse.json(
        { success: false, error: 'Admin user already exists.' },
        { status: 400 }
      );
    }

    // Create the admin user
    const newUser = new User({
      email: seedData.email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: 'Database seeded successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error during seed operation' },
      { status: 500 }
    );
  }
}
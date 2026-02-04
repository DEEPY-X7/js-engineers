import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: "Admin already exists. Seeding skipped.",
      });
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash("Admin@123", 12);

    const admin = await User.create({
      email: "admin@jsengineers.com",
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully!",
      credentials: {
        email: "admin@jsengineers.com",
        password: "Admin@123",
      },
      admin,
    });
  } catch (error) {
    console.error("Seed admin error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
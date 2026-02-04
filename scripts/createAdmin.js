import dbConnect from "../lib/db.js";
import User from "../models/User.js";

async function createAdmin() {
  await dbConnect();

  const admin = new User({
    email: "admin@example.com",
    password: "Admin@123",
    role: "admin",
  });

  await admin.save();

  console.log("Admin created:", admin.email);
  process.exit(0);
}

createAdmin();
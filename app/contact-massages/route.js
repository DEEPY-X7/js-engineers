import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {
  createContactMessage,
  getAllContactMessages,
} from "@/models/contact";
import { validateContact } from "@/utils/validation";


// --------------------------------------------
// GET: Fetch all contact messages (Admin)
// --------------------------------------------
export async function GET() {
  try {
    await connectDB();

    const messages = await getAllContactMessages();

    return NextResponse.json(
      { success: true, data: messages },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /contact-massages Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}


// --------------------------------------------
// POST: Save contact message (User side)
// --------------------------------------------
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // Validate form data
    const validation = validateContact(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const saved = await createContactMessage(body);

    return NextResponse.json(
      { success: true, data: saved },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /contact-massages Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { connectDB } from '@/lib/db';
import ContactMessage from "@/models/ContactMessage";

export async function GET() {
  try {
    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Contact messages fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to fetch contact messages" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and message are required",
        },
        { status: 400 }
      );
    }

    const msg = await ContactMessage.create({
      name,
      email,
      phone: phone || "",
      service: service || "other",
      message,
      status: "unread",
    });

    return NextResponse.json(
      { success: true, data: msg },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact message save error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to save message" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ContactSettings from "@/models/ContactSettings";

export async function GET() {
  try {
    await connectDB();
    const settings = await ContactSettings.findOne().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: settings || null }, { status: 200 });
  } catch (error) {
    console.error("Contact settings fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Server error fetching contact settings." },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const data = await req.json();

    const update = {
      phone: data.phone || "",
      email: data.email || "",
      address: data.address || "",
      whatsapp: data.whatsapp || "",
      mapLink: data.mapLink || "",
    };

    const saved = await ContactSettings.findOneAndUpdate({}, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return NextResponse.json({ success: true, data: saved }, { status: 200 });
  } catch (error) {
    console.error("Contact settings update error:", error);
    return NextResponse.json(
      { success: false, error: "Server error saving contact settings." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import About from "@/models/About";
import { validateAbout } from "@/lib/validation/about"; // optional but recommended

// ------------------- GET ABOUT -------------------
export async function GET() {
  try {
    await connectDB();
    const about = await About.findOne();

    return NextResponse.json(
      { success: true, about: about || null },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch About", error: error.message },
      { status: 500 }
    );
  }
}

// ------------------- PUT (CREATE / UPDATE) -------------------
export async function PUT(request) {
  try {
    await connectDB();
    const data = await request.json();

    // ---------- VALIDATE ----------
    const validation = validateAbout(data);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // ---------- CREATE OR UPDATE ----------
    let about = await About.findOne();

    if (!about) {
      about = await About.create(data);
    } else {
      about.title = data.title;
      about.description = data.description;
      if (data.founderName) about.founderName = data.founderName;
      if (data.founderImage) about.founderImage = data.founderImage;

      await about.save();
    }

    return NextResponse.json(
      { success: true, message: "About updated successfully", about },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}
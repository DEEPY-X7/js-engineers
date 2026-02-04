import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import GalleryImage from "@/models/GalleryImage";
import { connectDB } from "@/lib/db";

// GET → Fetch all images
export async function GET() {
  try {
    await connectDB();
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch images", error: error.message },
      { status: 500 }
    );
  }
}

// POST → Upload image to Cloudinary
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload_stream(
      { folder: "gallery" },
      async (error, result) => {
        if (error) {
          return NextResponse.json(
            { success: false, message: "Upload failed" },
            { status: 500 }
          );
        }

        // Save to DB
        const newImage = await GalleryImage.create({
          image: result.secure_url,
          public_id: result.public_id,
        });

        return NextResponse.json({ success: true, image: newImage });
      }
    );

    // Stream write
    uploadRes.end(buffer);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE → Delete image from Cloudinary + DB
export async function DELETE(request) {
  try {
    await connectDB();
    const { public_id } = await request.json();

    if (!public_id) {
      return NextResponse.json(
        { success: false, message: "public_id required" },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(public_id);

    // Remove from DB
    await GalleryImage.findOneAndDelete({ public_id });

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Delete failed", error: error.message },
      { status: 500 }
    );
  }
}
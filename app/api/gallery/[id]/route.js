import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Gallery from '../../../../models/Gallery';
import { validateGallery } from '../../../../lib/validation/gallery'; // Import validation function

export async function GET({ params }) {
  try {
    await connectDB();
    const galleryItem = await Gallery.findById(params.id); // Fetch gallery item by ID
    if (!galleryItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: galleryItem }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error fetching gallery item.' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();

    // Validate the incoming data using the validation function
    const validation = validateGallery(data);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Proceed to update gallery item if validation passes
    await connectDB();
    const updatedGalleryItem = await Gallery.findByIdAndUpdate(params.id, data, {
      new: true, // Return the updated document
    });

    if (!updatedGalleryItem) {
      return NextResponse.json(
        { success: false, error: 'Failed to update gallery item.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Gallery item updated successfully', data: updatedGalleryItem },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error updating gallery item.' },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }) {
  try {
    await connectDB();
    const deletedGalleryItem = await Gallery.findByIdAndDelete(params.id); // Delete gallery item by ID
    if (!deletedGalleryItem) {
      return NextResponse.json(
        { success: false, error: 'Gallery item not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Gallery item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error deleting gallery item.' },
      { status: 500 }
    );
  }
}
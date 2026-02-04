import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Testimonial from '../../../../models/Testimonial';
import { validateTestimonial } from '../../../../lib/validation/testimonials'; // Import validation function

export async function GET({ params }) {
  try {
    await connectDB();
    const testimonial = await Testimonial.findById(params.id); // Fetch testimonial by ID
    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error fetching testimonial.' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();

    // Validate the incoming data using the validation function
    const validation = validateTestimonial(data);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Proceed to update testimonial data if validation passes
    await connectDB();
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(params.id, data, {
      new: true, // Return the updated document
    });

    if (!updatedTestimonial) {
      return NextResponse.json(
        { success: false, error: 'Failed to update testimonial.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Testimonial updated successfully', data: updatedTestimonial },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error updating testimonial.' },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }) {
  try {
    await connectDB();
    const deletedTestimonial = await Testimonial.findByIdAndDelete(params.id); // Delete testimonial by ID
    if (!deletedTestimonial) {
      return NextResponse.json(
        { success: false, error: 'Testimonial not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Testimonial deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error deleting testimonial.' },
      { status: 500 }
    );
  }
}
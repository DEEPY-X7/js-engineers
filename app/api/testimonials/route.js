import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Testimonial from '../../../models/Testimonial';
import { validateTestimonial } from '../../../lib/validation/testimonials'; // Import validation function

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find(); // Fetch all testimonials from the DB
    if (!testimonials || testimonials.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No testimonials found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonials }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error fetching testimonials.' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
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

    // Proceed to save testimonial data if validation passes
    await connectDB();
    const testimonial = new Testimonial(data);
    await testimonial.save();

    return NextResponse.json(
      { success: true, message: 'Testimonial created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error saving testimonial.' },
      { status: 500 }
    );
  }
}
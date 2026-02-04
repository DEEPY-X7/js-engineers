import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Contact from '@/models/contact';
import { validateContact } from '../../../lib/validation/contact'; // Import validation function

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find(); // Fetch all contact submissions
    if (!contacts || contacts.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No contact submissions found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: contacts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error fetching contact data.' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    // Validate the incoming data using the validation function
    const validation = validateContact(data);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Proceed to save contact data if validation passes
    await connectDB();
    const contact = new Contact(data);
    await contact.save();

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error saving contact form.' },
      { status: 500 }
    );
  }
}
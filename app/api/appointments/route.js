import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Appointment from '../../../models/Appointment';
import { validateAppointment } from '../../../lib/validators'; // Assuming we have appointment validation

export async function GET() {
  try {
    await connectDB();
    const appointments = await Appointment.find(); // Fetch all appointments from the DB
    if (!appointments || appointments.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No appointments found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: appointments }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error fetching appointments.' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();

    // Validate the incoming data using the validation function
    const validation = validateAppointment(data);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Proceed to save appointment data if validation passes
    await connectDB();
    const appointment = new Appointment(data);
    await appointment.save();

    return NextResponse.json(
      { success: true, message: 'Appointment created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error saving appointment.' },
      { status: 500 }
    );
  }
}
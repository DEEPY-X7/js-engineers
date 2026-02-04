import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Service from '../../../../models/Service';
import { validateService } from '../../../../lib/validation/services'; // Import validation function

export async function GET({ params }) {
  try {
    await connectDB();
    const service = await Service.findById(params.id); // Fetch service by ID
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Service not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: service }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error fetching service.' },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();

    // Validate the incoming data using the validation function
    const validation = validateService(data);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Proceed to update service data if validation passes
    await connectDB();
    const updatedService = await Service.findByIdAndUpdate(params.id, data, {
      new: true, // Return the updated document
    });

    if (!updatedService) {
      return NextResponse.json(
        { success: false, error: 'Failed to update service.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Service updated successfully', data: updatedService },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error updating service.' },
      { status: 500 }
    );
  }
}

export async function DELETE({ params }) {
  try {
    await connectDB();
    const deletedService = await Service.findByIdAndDelete(params.id); // Delete service by ID
    if (!deletedService) {
      return NextResponse.json(
        { success: false, error: 'Service not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Service deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error deleting service.' },
      { status: 500 }
    );
  }
}
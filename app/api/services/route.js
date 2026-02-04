import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Service from '../../../models/Service';
import { validateService } from '../../../lib/validation/services';
import { sendResponse } from '@/lib/apiResponse';
import logger from '../../../lib/logger'; // Import logger

export async function GET() {
  try {
    logger.info('GET /api/services request received');

    await connectDB();
    const services = await Service.find();
    if (!services || services.length === 0) {
      logger.warn('No services found');
      return NextResponse.json(
        sendResponse(false, 'No services found', null, 404),
        { status: 404 }
      );
    }

    logger.info('Services fetched successfully');
    return NextResponse.json(sendResponse(true, 'Services fetched successfully', services), {
      status: 200,
    });
  } catch (error) {
    logger.error('Error fetching services', error); // Log the error details
    return NextResponse.json(
      sendResponse(false, 'Error fetching services', error.message, 500),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    logger.info('POST /api/services request received');

    const data = await req.json();

    // Validate the incoming data using the validation function
    const validation = validateService(data);
    if (!validation.success) {
      logger.warn('Validation failed for service', validation.error);
      return NextResponse.json(
        sendResponse(false, 'Validation failed', validation.error, 400),
        { status: 400 }
      );
    }

    // Proceed to save service data if validation passes
    await connectDB();
    const service = new Service(data);
    await service.save();

    logger.info('Service created successfully');
    return NextResponse.json(
      sendResponse(true, 'Service created successfully', service, 201),
      { status: 201 }
    );
  } catch (error) {
    logger.error('Error saving service', error); // Log the error details
    return NextResponse.json(
      sendResponse(false, 'Error saving service', error.message, 500),
      { status: 500 }
    );
  }
}
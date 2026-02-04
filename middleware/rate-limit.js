import { NextResponse } from 'next/server';

// In-memory store for rate limiting (You can use Redis for production environments)
const rateLimitStore = new Map();

// Create a rate limiter function
export function createRateLimiter(maxRequests, windowMs) {
  return async (req) => {
    const ip = req.ip || req.headers.get('x-forwarded-for') || req.connection.remoteAddress; // Get client IP

    const currentTime = Date.now();
    const windowStart = currentTime - windowMs;

    // Get or initialize the rate limit record for the IP
    let rateLimitRecord = rateLimitStore.get(ip);
    if (!rateLimitRecord) {
      rateLimitRecord = { count: 0, firstRequestTime: currentTime };
    }

    // If the window has expired, reset the count
    if (rateLimitRecord.firstRequestTime < windowStart) {
      rateLimitRecord = { count: 0, firstRequestTime: currentTime };
    }

    // Check if the user has exceeded the max requests within the window
    if (rateLimitRecord.count >= maxRequests) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Increment the request count
    rateLimitRecord.count += 1;

    // Update the rate limit store
    rateLimitStore.set(ip, rateLimitRecord);

    // Allow the request to continue
    return NextResponse.next();
  };
}
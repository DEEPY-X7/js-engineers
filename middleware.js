import { NextResponse } from 'next/server';
import { createRateLimiter } from './middleware/rate-limit.js'; // import rate-limiting middleware

// Rate Limiting Middleware (Global for certain routes)
const rateLimiter = createRateLimiter(10, 60 * 60); // Limit to 10 requests per hour for certain routes

export function middleware(req) {
  try {
    // Apply rate limit to routes like login or signup
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
      rateLimiter(req);
    }

    // Check if user is authorized to access protected routes
    if (req.nextUrl.pathname.startsWith('/api/protected')) {
      const token = req.cookies.get('auth_token');
      if (!token) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized. Please log in.' },
          { status: 401 }
        );
      }
      // Token validation (you can use JWT verification here if required)
      // const user = verifyToken(token);
      // if (!user) {
      //   return NextResponse.json({ success: false, error: 'Invalid token.' }, { status: 403 });
      // }
    }

    return NextResponse.next(); // Continue to the next middleware or route
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error in middleware' },
      { status: 500 }
    );
  }
}

// Matcher (optional, applies middleware only to specific routes)
export const config = {
  matcher: ['/api/:path*', '/protected/:path*'],
};
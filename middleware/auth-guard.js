import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // if you're using JWT for authentication

// Secret key for JWT (you should keep this secure, in .env)
const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req) {
  try {
    // Check if the user is trying to access protected routes
    if (req.nextUrl.pathname.startsWith('/api/protected')) {
      const token = req.cookies.get('auth_token'); // assuming token is stored in cookies
      
      // If there's no token, deny access
      if (!token) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized. Please log in.' },
          { status: 401 }
        );
      }

      // Verify the token
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to the request (if needed in other parts of the app)
      } catch (error) {
        return NextResponse.json(
          { success: false, error: 'Invalid or expired token.' },
          { status: 403 }
        );
      }
    }

    // Continue if no issues
    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Server error during authorization check.' },
      { status: 500 }
    );
  }
}

// Matcher: Apply this middleware to routes requiring authentication
export const config = {
  matcher: ['/api/protected/*'], // adjust this based on the protected routes
};
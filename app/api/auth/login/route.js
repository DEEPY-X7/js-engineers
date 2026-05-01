import { NextResponse } from 'next/server';

// Simple hardcoded credentials — change in .env.local for production
const ADMIN_USER = process.env.ADMIN_USERNAME || 'jsadmin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'js@2024';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const response = NextResponse.json({ success: true, message: 'Login successful' });

      // Set session cookie — httpOnly for security
      response.cookies.set('jse_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, error: 'Galat username ya password' },
        { status: 401 }
      );
    }
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

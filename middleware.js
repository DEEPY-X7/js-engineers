import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('jse_session')?.value;
  const isAuth = session === 'authenticated';

  // Protect /admin page
  if (pathname.startsWith('/admin') && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect logged-in users away from /login
  if (pathname === '/login' && isAuth) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};

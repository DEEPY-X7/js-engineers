import { NextResponse } from 'next/server';

export async function GET(request) {
  const session = request.cookies.get('jse_session')?.value;
  const isLoggedIn = session === 'authenticated';
  return NextResponse.json({ loggedIn: isLoggedIn });
}

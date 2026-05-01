import { NextResponse } from 'next/server';
import { readGallery, addGalleryItem } from '@/lib/db';

// GET — return all gallery items (newest first)
export async function GET() {
  try {
    const items = readGallery();
    const sorted = [...items].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    return NextResponse.json({ success: true, data: sorted });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to load gallery' }, { status: 500 });
  }
}

// POST — add new gallery item (admin only)
export async function POST(request) {
  try {
    // Check session cookie
    const session = request.cookies.get('jse_session')?.value;
    if (session !== 'authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, location, date, description, img } = body;

    if (!title?.trim()) {
      return NextResponse.json({ success: false, error: 'Title required' }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ success: false, error: 'Category required' }, { status: 400 });
    }

    const newItem = addGalleryItem({
      title: title.trim(),
      category,
      location: location?.trim() || '',
      date: date || '',
      description: description?.trim() || '',
      img: img || '',
    });

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (err) {
    console.error('POST /api/gallery error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

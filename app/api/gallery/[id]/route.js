import { NextResponse } from 'next/server';
import { deleteGalleryItem } from '@/lib/db';

// DELETE — remove a gallery item by ID (admin only)
export async function DELETE(request, { params }) {
  try {
    // Check session cookie
    const session = request.cookies.get('jse_session')?.value;
    if (session !== 'authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    }

    const deleted = deleteGalleryItem(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('DELETE /api/gallery/[id] error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

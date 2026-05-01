import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONTACTS_FILE = path.join(process.cwd(), 'data', 'contacts.json');

function readContacts() {
  try { return JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8')); }
  catch { return []; }
}
function saveContacts(data) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2));
}

// PATCH — mark as read/unread
export async function PATCH(request, { params }) {
  const session = request.cookies.get('jse_session')?.value;
  if (session !== 'authenticated') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { id } = params;
  const { status } = await request.json();
  const all = readContacts();
  const idx = all.findIndex(c => c.id === id);
  if (idx === -1) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  all[idx].status = status;
  saveContacts(all);
  return NextResponse.json({ success: true, data: all[idx] });
}

// DELETE — remove inquiry
export async function DELETE(request, { params }) {
  const session = request.cookies.get('jse_session')?.value;
  if (session !== 'authenticated') return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  const { id } = params;
  const all = readContacts();
  const filtered = all.filter(c => c.id !== id);
  if (filtered.length === all.length) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  saveContacts(filtered);
  return NextResponse.json({ success: true });
}

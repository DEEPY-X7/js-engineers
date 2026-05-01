import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

function readContacts() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]');
  try { return JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8')); }
  catch { return []; }
}

function saveContacts(data) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2));
}

// POST — save a new contact inquiry
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    if (!name?.trim()) return NextResponse.json({ success: false, error: 'Name required' }, { status: 400 });
    if (!phone?.trim()) return NextResponse.json({ success: false, error: 'Phone required' }, { status: 400 });
    if (!message?.trim()) return NextResponse.json({ success: false, error: 'Message required' }, { status: 400 });

    const entry = {
      id: 'c-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || '',
      service: service || '',
      message: message.trim(),
      status: 'unread', // unread | read
      submittedAt: new Date().toISOString(),
    };

    const all = readContacts();
    all.push(entry);
    saveContacts(all);

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' }, { status: 201 });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

// GET — return all contacts (admin only)
export async function GET(request) {
  try {
    const session = request.cookies.get('jse_session')?.value;
    if (session !== 'authenticated') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const contacts = readContacts();
    const sorted = [...contacts].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    return NextResponse.json({ success: true, data: sorted });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

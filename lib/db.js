import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const GALLERY_FILE = path.join(DATA_DIR, 'gallery.json');

// Ensure data directory and file exist
function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(GALLERY_FILE)) {
    fs.writeFileSync(GALLERY_FILE, JSON.stringify([], null, 2));
  }
}

export function readGallery() {
  ensureFile();
  try {
    const raw = fs.readFileSync(GALLERY_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function writeGallery(items) {
  ensureFile();
  fs.writeFileSync(GALLERY_FILE, JSON.stringify(items, null, 2));
}

export function addGalleryItem(item) {
  const items = readGallery();
  const newItem = {
    id: 'p-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    ...item,
    addedAt: new Date().toISOString(),
  };
  items.push(newItem);
  writeGallery(items);
  return newItem;
}

export function deleteGalleryItem(id) {
  const items = readGallery();
  const filtered = items.filter(item => item.id !== id);
  if (filtered.length === items.length) return false; // not found
  writeGallery(filtered);
  return true;
}

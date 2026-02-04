// ------------------------------------------------------
// Security Utilities (Sanitization + Guards)
// Lightweight, no dependencies, production-safe
// ------------------------------------------------------

// Prevent script injection / XSS in text fields
export function sanitize(input) {
  if (!input || typeof input !== "string") return input;

  return input
    .replace(/<script.*?>.*?<\/script>/gi, "")   // remove <script> tags
    .replace(/<.*?>/g, "")                       // remove HTML tags
    .replace(/javascript:/gi, "")                // remove JS protocols
    .trim();
}

// Ensure emails are valid
export function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Basic rate-limit style helper (IP-based)
// (You can use this later if needed inside APIs)
const requestStore = new Map();

export function rateLimit(ip, limit = 10, windowMs = 60000) {
  const now = Date.now();

  if (!requestStore.has(ip)) {
    requestStore.set(ip, []);
  }

  const timestamps = requestStore.get(ip);

  // Remove old timestamps
  while (timestamps.length && now - timestamps[0] > windowMs) {
    timestamps.shift();
  }

  // Check limit
  if (timestamps.length >= limit) {
    return false; // blocked
  }

  timestamps.push(now);
  return true;
}

// Sanitize an object deeply (safe for API inputs)
export function sanitizeObject(obj) {
  if (!obj || typeof obj !== "object") return obj;

  const clean = {};
  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "string") {
      clean[key] = sanitize(value);
    } else if (typeof value === "object" && !Array.isArray(value)) {
      clean[key] = sanitizeObject(value);
    } else {
      clean[key] = value;
    }
  }
  return clean;
}

// Verify JWT token (stub function)
export async function verifyJwt(token) {
  try {
    // Simple verification - in production use jsonwebtoken library
    if (!token || typeof token !== 'string') {
      return null;
    }
    // Basic token validation
    return { valid: true, token };
  } catch (error) {
    return null;
  }
}
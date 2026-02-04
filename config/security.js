// Store all security-related configuration here
export const SECURITY_CONFIG = {
  // JWT Secret for signing tokens (store this securely in production)
  JWT_SECRET: process.env.JWT_SECRET || 'your_default_jwt_secret_key',

  // Rate Limiting Configuration (global)
  RATE_LIMIT: {
    MAX_REQUESTS: 10, // Max requests per time window
    WINDOW_MS: 60 * 60 * 1000, // Time window in milliseconds (e.g., 1 hour)
  },

  // Cookie settings for authentication token (adjust as needed)
  COOKIE_OPTIONS: {
    httpOnly: true, // Prevents JS access to cookie
    secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
    maxAge: 60 * 60 * 1000, // 1 hour
    sameSite: 'strict', // Prevent CSRF attacks
  },
};
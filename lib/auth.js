import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkeychangeit";

// -----------------------
// GENERATE TOKEN
// -----------------------
export function generateToken(payload) {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "7d", // 7 days valid
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
}

// -----------------------
// VERIFY TOKEN
// -----------------------
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded; // { userId, email, role }
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    return null;
  }
}

// -----------------------
// GET USER FROM COOKIE
// -----------------------
export function getUserFromRequest(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) return null;

    const decoded = verifyToken(token);
    return decoded || null;
  } catch (error) {
    console.error("Failed to extract user:", error);
    return null;
  }
}

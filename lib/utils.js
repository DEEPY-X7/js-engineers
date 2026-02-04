// utility helpers used across frontend/backend
export function formatPhone(phone = "") {
  if (!phone) return "";
  const p = phone.toString().trim();
  // simple formatting for India numbers
  if (p.length === 10) return `${p.slice(0, 5)} ${p.slice(5)}`;
  return p;
}

export function truncate(text = "", n = 120) {
  if (!text) return "";
  return text.length > n ? text.slice(0, n).trim() + "…" : text;
}

export function safeUrl(path) {
  if (!path) return "/placeholder.png";
  return path;
}

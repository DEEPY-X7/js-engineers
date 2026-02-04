export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const routes = [
    "",
    "/about",
    "/services",
    "/gallery",
    "/testimonials",
    "/contact",
    "/appointment",
    "/faq",
  ];

  const now = new Date().toISOString();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}

export default function sitemap() {
  const base = 'https://jsengineers.in';
  const now = new Date().toISOString();

  return [
    { url: base,               lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/gallery`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/contact`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.8 },
  ];
}

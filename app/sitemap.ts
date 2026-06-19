import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://yendigital.co'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/video`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/photos`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/retainers`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]
}

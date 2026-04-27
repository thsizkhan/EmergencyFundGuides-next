import type { MetadataRoute } from 'next';
import { articles } from '@/data/articles';
import { absoluteUrl } from '@/lib/site';

// Generated at build time. Includes the homepage, /resources index,
// every article, and the static legal pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/resources'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: absoluteUrl('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: absoluteUrl('/disclosure'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: absoluteUrl(`/resources/${a.slug}`),
    lastModified: a.updated,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...articleEntries];
}

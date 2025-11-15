import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jpgtoword.best';
  const langs = ['en','zh','zh-Hant','es','ar','pt','ru','fr','de','ja','ko'] as const;
  const defaultLang = 'en';

  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  for (const lang of langs) {
    if (lang === defaultLang) continue;
    entries.push({
      url: `${siteUrl}/${lang}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  return entries;
}



import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdftopng.online';
  const langs = ['en','zh','zh-Hant','es','ar','pt','ru','fr','de','ja','ko'] as const;

  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  for (const lang of langs) {
    entries.push(
      {
        url: `${siteUrl}/${lang}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${siteUrl}/${lang}/privacy`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.4,
      },
      {
        url: `${siteUrl}/${lang}/terms`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.4,
      }
    );
  }

  return entries;
}



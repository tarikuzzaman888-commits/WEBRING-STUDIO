import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/'],
    },
    sitemap: 'https://webring-studio.vercel.app/sitemap.xml',
  };
}

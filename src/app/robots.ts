import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/proposals/',
      },
    ],
    sitemap: 'https://micahshu.com/sitemap.xml',
  }
}

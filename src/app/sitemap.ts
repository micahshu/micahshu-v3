import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/content'
import { projects } from '@/lib/data/projects'
import { services } from '@/lib/data/services'
import { alaCarteServices } from '@/lib/data/alacarte'

const BASE_URL = 'https://micahshu.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1 },
    { url: `${BASE_URL}/about`, priority: 0.8 },
    { url: `${BASE_URL}/projects`, priority: 0.8 },
    { url: `${BASE_URL}/services`, priority: 0.8 },
    { url: `${BASE_URL}/blog`, priority: 0.8 },
    { url: `${BASE_URL}/contact`, priority: 0.7 },
    { url: `${BASE_URL}/resume`, priority: 0.5 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    priority: 0.6,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = [
    ...services.map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      priority: 0.7,
    })),
    ...alaCarteServices.map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      priority: 0.6,
    })),
  ]

  const blogPosts = getBlogPosts()
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : undefined,
    priority: 0.6,
  }))

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...blogRoutes]
}

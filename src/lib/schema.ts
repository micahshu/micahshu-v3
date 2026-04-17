import type { Service as SiteService, AlaCarteService, BlogPost, Project } from '@/lib/types'

const BASE_URL = 'https://micahshu.com'

const PERSON = {
  '@type': 'Person',
  name: 'Micah Shu',
  url: BASE_URL,
  email: 'me@micahshu.com',
  jobTitle: 'Full Stack Developer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Berthoud',
    addressRegion: 'CO',
    addressCountry: 'US',
  },
  sameAs: [
    'https://github.com/micahshu',
    'https://linkedin.com/in/micahshu',
  ],
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Micah Shu',
    url: BASE_URL,
    description: 'Freelance web developer in Fort Collins and Northern Colorado. Custom websites for small businesses.',
  }
}

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    ...PERSON,
  }
}

export function buildProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Micah Shu — Web Developer',
    url: BASE_URL,
    email: 'me@micahshu.com',
    description: 'Freelance web developer in Fort Collins and Northern Colorado. Custom websites and web apps for small businesses — one developer, start to finish.',
    founder: PERSON,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berthoud',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'City', name: 'Fort Collins' },
      { '@type': 'AdministrativeArea', name: 'Northern Colorado' },
    ],
    sameAs: [
      'https://github.com/micahshu',
      'https://linkedin.com/in/micahshu',
    ],
  }
}

export function buildServiceSchema(service: SiteService) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    url: `${BASE_URL}/services/${service.slug}`,
    description: service.hook,
    provider: PERSON,
    areaServed: [
      { '@type': 'City', name: 'Fort Collins, CO' },
      { '@type': 'AdministrativeArea', name: 'Northern Colorado' },
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      description: `Starting at ${service.startingAt}`,
    },
  }
}

export function buildAlaCarteSchema(item: AlaCarteService) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: item.name,
    url: `${BASE_URL}/services/${item.slug}`,
    description: item.hook,
    provider: PERSON,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      description: `${item.price} ${item.billingCycle}`,
    },
  }
}

export function buildFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export function buildArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt,
    image: `${BASE_URL}/opengraph-image`,
    author: PERSON,
    publisher: PERSON,
  }
}

export function buildProjectSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    url: `${BASE_URL}/projects/${project.slug}`,
    description: project.description,
    creator: PERSON,
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
  }
}

export function buildBreadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.href}`,
    })),
  }
}

export function buildContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Micah Shu',
    url: `${BASE_URL}/contact`,
    description: 'Ready to build something? Reach out to Micah Shu, freelance web developer in Northern Colorado.',
  }
}

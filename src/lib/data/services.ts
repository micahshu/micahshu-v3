import type { Service } from '@/lib/types'

const PLACEHOLDER_OVERVIEW = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
]

const PLACEHOLDER_INCLUDES = [
  'Placeholder deliverable one',
  'Placeholder deliverable two',
  'Placeholder deliverable three',
  'Placeholder deliverable four',
  'Placeholder deliverable five',
  'Placeholder deliverable six',
]

const PLACEHOLDER_IDEAL_FOR = [
  'Placeholder ideal client type one',
  'Placeholder ideal client type two',
  'Placeholder ideal client type three',
  'Placeholder ideal client type four',
]

const PLACEHOLDER_FAQS = [
  { q: 'Placeholder question one?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { q: 'Placeholder question two?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { q: 'Placeholder question three?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { q: 'Placeholder question four?', a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
]

export const services: Service[] = [
  {
    name: 'Web Development',
    slug: 'web-development',
    hook: 'For businesses that need a fast, polished site that works.',
    timeframe: '2–4 weeks',
    startingAt: '$3,000',
    description: 'Marketing sites, landing pages, and content-driven builds. Fast by default, easy to manage, and built to last.',
    overview: PLACEHOLDER_OVERVIEW,
    includes: PLACEHOLDER_INCLUDES,
    idealFor: PLACEHOLDER_IDEAL_FOR,
    faqs: PLACEHOLDER_FAQS,
    relatedTags: ['Next.js', 'React', 'TypeScript'],
    relatedCategory: 'Front-End',
  },
  {
    name: 'App Development',
    slug: 'app-development',
    hook: 'For teams building a product that needs real infrastructure.',
    timeframe: '4–12 weeks',
    startingAt: '$8,000',
    description: 'Full-stack web applications with clean architecture throughout. Next.js, TypeScript, and the right database for the job.',
    overview: PLACEHOLDER_OVERVIEW,
    includes: PLACEHOLDER_INCLUDES,
    idealFor: PLACEHOLDER_IDEAL_FOR,
    faqs: PLACEHOLDER_FAQS,
    relatedTags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    relatedCategory: 'Full-Stack',
  },
  {
    name: 'Ecommerce',
    slug: 'ecommerce',
    hook: 'For brands ready to sell online with a store that converts.',
    timeframe: '3–6 weeks',
    startingAt: '$4,000',
    description: 'Custom storefronts and Shopify builds optimized for conversion. Inventory, checkout, and everything between.',
    overview: PLACEHOLDER_OVERVIEW,
    includes: PLACEHOLDER_INCLUDES,
    idealFor: PLACEHOLDER_IDEAL_FOR,
    faqs: PLACEHOLDER_FAQS,
    relatedTags: ['Shopify', 'React'],
    relatedCategory: 'E-Commerce',
  },
  {
    name: 'Tooling & Automation',
    slug: 'tooling-automation',
    hook: 'For teams spending time on work a script could handle.',
    timeframe: '1–3 weeks',
    startingAt: '$1,500',
    description: 'Internal tools, APIs, and automated workflows that cut out repetitive work. Built to fit the systems you already use.',
    overview: PLACEHOLDER_OVERVIEW,
    includes: PLACEHOLDER_INCLUDES,
    idealFor: PLACEHOLDER_IDEAL_FOR,
    faqs: PLACEHOLDER_FAQS,
    relatedTags: ['TypeScript', 'API'],
    relatedCategory: 'Full-Stack',
  },
  {
    name: 'Local SEO',
    slug: 'local-seo',
    hook: 'For local businesses that need to show up when it counts.',
    timeframe: 'Ongoing',
    startingAt: '$500/mo',
    description: 'Google Business Profile setup, local citation building, on-page optimization, and structured data — so customers in your area find you first.',
    overview: PLACEHOLDER_OVERVIEW,
    includes: PLACEHOLDER_INCLUDES,
    idealFor: PLACEHOLDER_IDEAL_FOR,
    faqs: PLACEHOLDER_FAQS,
    relatedTags: ['SEO'],
  },
  {
    name: 'Maintenance',
    slug: 'maintenance',
    hook: 'For sites that need to stay updated, secure, and running.',
    timeframe: 'Ongoing',
    startingAt: '$200/mo',
    description: 'Monthly retainer covering updates, security patches, content edits, and performance monitoring.',
    overview: PLACEHOLDER_OVERVIEW,
    includes: PLACEHOLDER_INCLUDES,
    idealFor: PLACEHOLDER_IDEAL_FOR,
    faqs: PLACEHOLDER_FAQS,
    relatedTags: ['WordPress'],
  },
]

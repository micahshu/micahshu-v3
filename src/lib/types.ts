export interface Project {
  title: string
  slug: string
  category: string
  description: string
  tags: string[]
  featured?: boolean
  liveUrl?: string
  image?: string
}

export interface ServiceFAQ {
  q: string
  a: string
}

export interface Service {
  name: string
  slug: string
  hook: string
  timeframe: string
  description: string
  overview: string[]
  includes: string[]
  idealFor: string[]
  startingAt: string
  faqs: ServiceFAQ[]
  relatedTags: string[]
  relatedCategory?: string
}

export interface BlogPost {
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  categories: string[]
  projectSlug?: string
}

export interface TechStackItem {
  name: string
  icon: string
}

export interface AlaCarteService {
  name: string
  slug: string
  price: string
  billingCycle: string
  hook: string
  description: string
  includes: string[]
  faqs: ServiceFAQ[]
  parentSlugs: string[]
}

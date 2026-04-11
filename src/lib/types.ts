export interface Project {
  title: string
  slug: string
  description: string
  tags: string[]
  techIcons: { name: string; icon: string }[]
  liveUrl?: string
  image?: string
}

export interface Service {
  name: string
  timeframe: string
  description: string
}

export interface BlogPost {
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  categories: string[]
}

export interface TechStackItem {
  name: string
  icon: string
}

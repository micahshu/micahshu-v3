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

export interface ServicePricingOption {
  label: string
  price: string
  detail?: string
}

export interface Service {
  name: string
  slug: string
  h1?: string
  seoTitle?: string
  hook: string
  timeframe: string
  description: string
  overview: string[]
  includes: string[]
  idealFor: string[]
  startingAt: string
  pricingOptions?: ServicePricingOption[]
  faqs: ServiceFAQ[]
  relatedTags: string[]
  relatedCategory?: string
  seeAlso?: { text: string; href: string; label?: string }
  hidden?: boolean
  subServices?: string[]
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

export interface ProposalLineItem {
  type: 'service' | 'alacarte'
  slug: string
  /** Stable identifier — required when other items reference this via peerOf */
  id?: string
  /** ID of the item this is an optional add-on for; renders as a linked checkbox below that item's group */
  peerOf?: string
  pricingOptionLabel?: string
  required?: boolean
  recommended?: boolean
  note?: string
  customPrice?: number
  customName?: string
  customDescription?: string
  /** Items sharing a group key are mutually exclusive (radio buttons) */
  group?: string
  /** If true, the user can deselect all options in the group (entire service is optional) */
  groupOptional?: boolean
  /** ID of another item this item includes — when this item is checked, that item is auto-checked and shown as "Included" */
  includesItem?: string
}

export interface ProposalLineItemResolved {
  key: string
  type: 'service' | 'alacarte'
  slug: string
  id?: string
  peerOf?: string
  includesItem?: string
  name: string
  description: string
  price: number
  priceDisplay: string
  isRecurring: boolean
  billingCycle?: string
  required: boolean
  recommended?: boolean
  defaultChecked: boolean
  note?: string
  group?: string
  groupOptional?: boolean
  groupLabel?: string
  groupDescription?: string
  tierLabel?: string
}

export interface Proposal {
  slug: string
  passphrase: string
  coverImage?: string
  coverImageUrl?: string
  previewUrl?: string
  clientName: string
  date: string
  expiresAt?: string
  status: 'draft' | 'sent' | 'accepted'
  coverNote: string
  title?: string
  items: ProposalLineItem[]
}

export interface AlaCarteService {
  name: string
  slug: string
  price: string
  billingCycle: string
  hook: string
  description: string
  includes: string[]
  idealFor: string[]
  faqs: ServiceFAQ[]
  parentSlugs: string[]
  seeAlso?: { text: string; href: string; label?: string }
}

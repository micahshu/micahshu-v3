import type { AlaCarteService } from '@/lib/types'

export const alaCarteServices: AlaCarteService[] = [
  {
    name: 'Web Hosting',
    slug: 'hosting',
    price: '$25',
    billingCycle: 'per month',
    hook: 'Reliable hosting for small sites, managed for you.',
    description: 'Managed hosting on fast, reliable infrastructure. Includes SSL, uptime monitoring, and basic support. Pairs naturally with a Maintenance plan.',
    includes: [
      'Managed server hosting',
      'SSL certificate',
      'Uptime monitoring',
      'DNS configuration',
      'Basic email support',
    ],
    faqs: [
      {
        q: 'What kind of sites does this cover?',
        a: 'Small to medium marketing sites and landing pages. Not suited for high-traffic applications or large e-commerce stores.',
      },
      {
        q: 'Is this different from the Maintenance plan?',
        a: 'Yes. Hosting covers the server infrastructure. Maintenance covers ongoing updates, edits, and security. They can be combined.',
      },
      {
        q: 'Can I migrate an existing site?',
        a: "Yes. Migration is included if you're moving from another host.",
      },
    ],
    parentSlugs: ['maintenance'],
  },
  {
    name: 'Hourly Work',
    slug: 'hourly',
    price: '$75',
    billingCycle: 'per hour',
    hook: "For one-off tasks, fixes, and work that doesn't fit a full project.",
    description: "No scope document, no retainer. Pay for the time you need. Good for small fixes, consults, integrations, and anything that'll take a few hours.",
    includes: [
      'Flexible scheduling',
      'No minimum commitment',
      'Development, debugging, or consult',
      'Summary of work delivered',
    ],
    faqs: [
      {
        q: 'What counts as hourly work?',
        a: "Small bug fixes, code reviews, brief consults, adding a feature to an existing site — anything that doesn't warrant a full project scope.",
      },
      {
        q: 'How do I book time?',
        a: "Reach out via the contact form with a description of the work. I'll confirm availability and send an invoice before we start.",
      },
      {
        q: 'Is there a minimum?',
        a: 'No. If it takes 30 minutes, you pay for 30 minutes.',
      },
    ],
    parentSlugs: ['web-development', 'app-development', 'tooling-automation'],
  },
]

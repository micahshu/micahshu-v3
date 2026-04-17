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
    idealFor: [
      'Small business sites that need reliable hosting without managing a server',
      'Clients who want hosting and maintenance handled in one place',
      'Sites migrating away from a slow or overpriced host',
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
    parentSlugs: ['web-development', 'ecommerce'],
    seeAlso: { text: 'Need updates, security patches, and content edits too? Maintenance covers hosting plus everything else — $200/mo.', href: '/services/maintenance' },
  },
  {
    name: 'CMS Integration',
    slug: 'cms-integration',
    price: '$400',
    billingCycle: 'one-time',
    hook: 'Add content management so you can edit your site without touching code.',
    description: 'WordPress or headless — your choice depending on the project. Either way, you get setup, training, and docs so you can manage your own content without touching code.',
    includes: [
      'CMS setup and configuration (WordPress or headless)',
      'Content entry for existing pages',
      'Training walkthrough — editing, adding pages, managing media',
      'Documentation for common tasks',
    ],
    idealFor: [
      'Business owners who need to update their own content regularly',
      'Teams handing the site off to a non-technical person after launch',
      'Anyone who wants editorial control without calling a developer',
    ],
    faqs: [
      {
        q: 'WordPress or headless — which should I pick?',
        a: 'WordPress if you want something familiar, widely documented, and easy to hand off. Headless if you need better performance, structured content, or a more modern editing experience. I\'ll make a recommendation based on your project.',
      },
      {
        q: 'Can I add this after the site is built?',
        a: 'Yes, though it\'s easier to plan for it upfront. Retrofitting a CMS is doable — just takes a bit more work.',
      },
      {
        q: 'Will I be able to manage it myself?',
        a: 'That\'s the whole point. The training walkthrough covers everything you\'ll actually need to do day-to-day.',
      },
    ],
    parentSlugs: ['web-development'],
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
    idealFor: [
      'Existing site owners with a specific fix or feature request',
      'Teams that need a second opinion or a quick consult',
      'Anyone with a small job that doesn\'t warrant a full project',
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

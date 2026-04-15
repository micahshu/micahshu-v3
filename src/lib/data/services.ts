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
    hook: 'Custom website design for small businesses in Fort Collins and Northern Colorado — built from scratch, not a template.',
    timeframe: '2–4 weeks',
    startingAt: '$3,000',
    pricingOptions: [
      { label: 'One-time', price: '$3,000', detail: 'Half up front' },
      { label: 'Monthly', price: '$200/mo', detail: '12-month contract' },
    ],
    description: 'Marketing sites, landing pages, and content-driven builds. Fast by default, easy to manage, and built to last.',
    overview: [
      'Most small business websites are templates with a logo swap and some copy. They load slow, look generic, and don\'t do much to help customers find you. This isn\'t that.',
      'Every site is built from scratch — designed around your business, optimized for search, and easy to manage without a developer on call. Some clients need WordPress; others are better served by a Next.js app with a headless CMS. The stack fits the project, not the other way around.',
    ],
    includes: [
      'Custom design — no templates, no theme shops',
      'Mobile-responsive layout across all screen sizes',
      'On-page SEO setup: titles, meta descriptions, and structured data',
      'Contact form with email delivery',
      'Performance optimization for Core Web Vitals',
      'Domain and hosting guidance',
      'Launch support and 30 days of post-launch fixes',
    ],
    idealFor: [
      'Small businesses without a website or with an outdated one',
      'Local businesses in Fort Collins and Northern Colorado',
      'Business owners who want to manage their own content',
      'Anyone who\'s been quoted $10k+ by an agency and wants an honest alternative',
    ],
    faqs: [
      {
        q: 'Do I need to know how to code to manage my site?',
        a: 'No. If you add a CMS, editing content is done from a browser — no code, no developer needed. That\'s an optional add-on depending on how much you need to self-manage.',
      },
      {
        q: 'What\'s the difference between a custom build and a template site?',
        a: 'Templates are designed for everyone, which means they\'re optimized for no one. A custom build is scoped around your business — your content, your goals, your users.',
      },
      {
        q: 'Do you handle hosting?',
        a: 'I\'ll help you set it up and point you to the right options, but you own the hosting account. No lock-in, no recurring fees to me.',
      },
      {
        q: 'How long does it take?',
        a: 'Most sites ship in 2–4 weeks. Timeline depends on how quickly content and feedback come in on your end.',
      },
    ],
    relatedTags: ['Next.js', 'React', 'TypeScript'],
    relatedCategory: 'Front-End',
  },
  {
    name: 'App Development',
    slug: 'app-development',
    hook: 'For founders and teams who need a real web application — not a website with some features bolted on.',
    timeframe: '4–12 weeks',
    startingAt: '$8,000',
    pricingOptions: [
      { label: 'One-time', price: '$8,000', detail: 'Half up front' },
      { label: 'Monthly', price: '$600/mo', detail: '12-month contract' },
    ],
    description: 'Full-stack web applications with clean architecture throughout. Next.js, TypeScript, and the right database for the job.',
    overview: [
      'A web app is a different problem than a marketing site. It needs a database, authentication, user roles, API integrations — the kind of infrastructure a website doesn\'t require and a template can\'t handle.',
      'Builds are scoped around the problem, not a pre-packaged tier. Next.js on the frontend, Node or serverless on the backend, PostgreSQL or whichever database fits the data model. Clean architecture from day one — not something you\'ll need to rewrite when you scale.',
    ],
    includes: [
      'Full-stack architecture scoped to your project',
      'Database design and setup',
      'Authentication and user management',
      'API design and third-party integrations',
      'Admin dashboard or internal tooling as needed',
      'Deployment to Vercel, Railway, or your preferred host',
      'Architecture and API documentation',
      'Post-launch support window',
    ],
    idealFor: [
      'Founders building an MVP who need real infrastructure, not a prototype',
      'Teams with an existing codebase that needs a dedicated developer',
      'Businesses that have outgrown their website and need a product',
      'Anyone who\'s been quoted $50k+ by an agency for something a solo developer can build',
    ],
    faqs: [
      {
        q: 'What\'s the difference between this and web development?',
        a: 'Web development is for marketing sites and content-driven builds. App development is for products that have users, data, and real business logic behind them.',
      },
      {
        q: 'Do you work with existing codebases?',
        a: 'Yes. If you\'ve already started and need someone to take it further, I can review the codebase and work from there.',
      },
      {
        q: 'What does the process look like for a longer project?',
        a: 'Same scope-build-launch structure, just longer cycles. You\'ll see working builds throughout — not one big reveal at the end of 12 weeks.',
      },
      {
        q: 'What if my needs change mid-project?',
        a: 'Scope changes happen. We\'ll re-evaluate together and adjust the timeline and cost before anything gets built.',
      },
    ],
    relatedTags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    relatedCategory: 'Full-Stack',
  },
  {
    name: 'Ecommerce',
    slug: 'ecommerce',
    hook: 'Custom storefronts built to sell — Shopify or headless, optimized for conversion from day one.',
    timeframe: '3–6 weeks',
    startingAt: '$4,000',
    pricingOptions: [
      { label: 'One-time', price: '$4,000', detail: 'Half up front' },
      { label: 'Monthly', price: '$300/mo', detail: '12-month contract' },
    ],
    description: 'Custom storefronts and Shopify builds optimized for conversion. Inventory, checkout, and everything between.',
    overview: [
      'Most ecommerce stores are set up once and never really optimized. They\'re slow, generic, and treat checkout like an afterthought. A store built right does the opposite — fast load times, clean UX, and a checkout that gets out of the customer\'s way.',
      'Shopify for most clients — it\'s the right tool for the majority of product-based businesses. Headless Shopify when you need full frontend control without giving up the commerce backend. Either way, the store is built around your products and your customers, not a theme.',
    ],
    includes: [
      'Shopify store setup and configuration',
      'Custom theme or headless storefront build',
      'Product catalog setup and organization',
      'Payment and checkout configuration',
      'Shipping and tax setup',
      'Mobile-optimized layout',
      'On-page SEO for product and collection pages',
      'Launch support and post-launch fixes',
    ],
    idealFor: [
      'Product-based businesses launching their first online store',
      'Existing stores on a generic theme that\'s hurting conversions',
      'Brands that need full design control without building a custom backend',
      'Anyone who wants a store that looks like the brand, not like everyone else\'s Shopify',
    ],
    faqs: [
      {
        q: 'Do you only work with Shopify?',
        a: 'Mostly. It\'s the right platform for the majority of product-based businesses. If your needs are unusual, I\'ll tell you upfront.',
      },
      {
        q: 'Can you work with my existing Shopify store?',
        a: 'Yes. If you\'re on a stock theme and want a custom build, I can migrate the store content and rebuild from there.',
      },
      {
        q: 'What about inventory management?',
        a: 'Shopify handles inventory natively. I\'ll set it up to match how your business actually tracks and fulfills orders.',
      },
      {
        q: 'Do I need a developer after launch?',
        a: 'No. Shopify is built for business owners to manage themselves. I\'ll walk you through everything before handoff.',
      },
    ],
    relatedTags: ['Shopify', 'React'],
    relatedCategory: 'E-Commerce',
  },
  {
    name: 'Tooling & Automation',
    slug: 'tooling-automation',
    hook: 'For teams wasting hours on work a script could handle in seconds.',
    timeframe: '1–3 weeks',
    startingAt: '$1,500',
    description: 'Internal tools, APIs, and automated workflows that cut out repetitive work. Built to fit the systems you already use.',
    overview: [
      'Every business has a version of this: a spreadsheet someone updates manually every Monday, a report that takes an hour to pull, a handoff process that involves copying data between three different tools. None of it needs to be that way.',
      'Custom scripts, internal dashboards, API integrations, and automated workflows — built to fit the systems you already use. The goal is simple: get time back and reduce the places where things break because a human forgot a step.',
    ],
    includes: [
      'Scoped automation or internal tool build',
      'API integrations with existing systems',
      'Scheduled tasks and workflow triggers',
      'Error handling and logging',
      'Documentation for setup and ongoing use',
      'Handoff walkthrough so your team can maintain it',
    ],
    idealFor: [
      'Teams with repetitive manual processes that eat up hours each week',
      'Businesses juggling multiple tools that don\'t talk to each other',
      'Anyone who\'s built a process in spreadsheets and needs it to scale',
      'Operators who know what they want automated but don\'t have a developer to build it',
    ],
    faqs: [
      {
        q: 'How do I know if something is worth automating?',
        a: 'If it takes more than 30 minutes a week and follows a consistent pattern, it\'s probably worth it. Reach out with a description and I\'ll give you a straight answer.',
      },
      {
        q: 'What systems can you integrate with?',
        a: 'Most platforms with a public API — CRMs, project management tools, accounting software, custom databases. If it has an API, it can be connected.',
      },
      {
        q: 'Do I need a developer to maintain it after?',
        a: 'Not usually. I\'ll document everything and build it so it runs without babysitting. If something breaks, the logs will tell you why.',
      },
      {
        q: 'What if the scope is small?',
        a: 'Small is fine. Some of the most useful work is a script that takes two hours to write and saves two hours every week.',
      },
    ],
    relatedTags: ['TypeScript', 'API'],
    relatedCategory: 'Full-Stack',
  },
  {
    name: 'Local SEO',
    slug: 'local-seo',
    hook: 'For local businesses that need to show up when customers in their area are searching.',
    timeframe: 'Ongoing',
    startingAt: '$500/mo',
    description: 'Google Business Profile setup, local citation building, on-page optimization, and structured data — so customers in your area find you first.',
    overview: [
      'Most local businesses have two problems: their Google Business Profile is incomplete, and their website doesn\'t have the signals Google needs to connect them with nearby customers. Both are fixable.',
      'Local SEO is a long game, not a one-time fix. The work compounds — citations build authority, on-page optimizations improve rankings, and a well-maintained GBP drives map pack visibility. The first 90 days establish the foundation. After that, consistent maintenance keeps you ahead of competitors who aren\'t doing it at all.',
    ],
    includes: [
      'Google Business Profile setup and full optimization',
      'Local citation building — directories, Chamber listings, and relevant aggregators',
      'On-page SEO: titles, meta descriptions, and LocalBusiness structured data',
      'Keyword targeting for your city and service area',
      'Monthly performance reporting',
      'Ongoing content and profile updates',
    ],
    idealFor: [
      'Local businesses with little or no online presence',
      'Businesses that show up on Google but not in the map pack',
      'Service-area businesses competing against agencies on local search terms',
      'Any business that gets customers from nearby searches — "near me" or city + service',
    ],
    faqs: [
      {
        q: 'How long until I see results?',
        a: 'Most clients see meaningful movement in the map pack within 60–90 days. Organic rankings take longer — 3–6 months is realistic for competitive terms.',
      },
      {
        q: 'Do I need a new website for this to work?',
        a: 'Not necessarily. Local SEO can improve results on an existing site. That said, if the site is slow or missing basic on-page signals, a rebuild will accelerate everything.',
      },
      {
        q: 'What\'s the difference between local SEO and regular SEO?',
        a: 'Local SEO targets searches with geographic intent — people looking for a service in a specific city or near their location. It centers on your Google Business Profile and local signals, not just your website.',
      },
      {
        q: 'Do you guarantee rankings?',
        a: 'No. No one can guarantee a specific ranking — Google\'s algorithm is outside anyone\'s control. What I can guarantee is that the work is done correctly and consistently, which is what actually moves results.',
      },
    ],
    relatedTags: ['SEO'],
  },
  {
    name: 'Maintenance',
    slug: 'maintenance',
    hook: 'For sites that need to stay updated, secure, and fast without becoming a second job.',
    timeframe: 'Ongoing',
    startingAt: '$200/mo',
    description: 'Monthly retainer covering updates, security patches, content edits, and performance monitoring.',
    overview: [
      'A website isn\'t a one-time project. Plugins go out of date, security vulnerabilities get patched, content needs to change, and something occasionally breaks. A maintenance plan covers all of it without you having to track it down.',
      'This is a monthly retainer — not a break-fix service. You\'re not waiting until something goes wrong to reach out. The work happens in the background, consistently, so the site stays healthy and you stay focused on your business.',
    ],
    includes: [
      'Monthly plugin, core, and dependency updates',
      'Security monitoring and patching',
      'Uptime monitoring with alert response',
      'Monthly performance check',
      'Up to 2 hours of web edits per month — content, copy, layout tweaks ($50/hr after)',
      'Web hosting included',
    ],
    idealFor: [
      'WordPress site owners who don\'t want to manage updates themselves',
      'Businesses whose sites are business-critical and can\'t afford downtime',
      'Clients who\'ve had a site built and want someone to keep it running',
      'Anyone who\'s ever ignored an update until something broke',
    ],
    faqs: [
      {
        q: 'Does this cover sites you didn\'t build?',
        a: 'Yes. I\'ll do a brief audit first to understand the setup, then take it on.',
      },
      {
        q: 'What counts as a content edit?',
        a: 'Text changes, image swaps, adding a page — anything that doesn\'t require new development work. The first 2 hours each month are included. Anything beyond that is billed at $50/hr.',
      },
      {
        q: 'What happens if something breaks?',
        a: 'I\'ll fix it. That\'s the point of a retainer — you\'re not starting from scratch trying to find someone available.',
      },
      {
        q: 'Can I cancel?',
        a: 'Yes, with 30 days notice. No long-term contracts required.',
      },
    ],
    relatedTags: ['WordPress'],
  },
]

import type { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    title: 'Zero Gravity Marketing',
    slug: 'zgm-rebuild',
    featured: true,
    category: 'Full-Stack',
    description:
      'Full migration of a 150+ page WordPress site to a headless Next.js architecture. Decoupled the CMS from the front end for full control over performance and the rendering pipeline.',
    tags: ['Headless', 'Next.js', 'React', 'Tailwind', 'WordPress'],
    liveUrl: 'https://zerogravitymarketing.com',
    image: '/images/zerogravitymarketing.png',
  },
  {
    title: 'Mancini Beverage',
    slug: 'mancini-beverage',
    featured: true,
    category: 'Front-End',
    description:
      'Custom designed company website for an alcohol beverage distribution brand. WordPress build with a custom age verification system gating site entry.',
    tags: ['PHP', 'WordPress'],
    image: '/images/mancini.webp',
  },
  {
    title: 'React Landing Page',
    slug: 'react-landing-page',
    featured: true,
    category: 'Front-End',
    description:
      'Conceptual landing page built with React and Framer Motion. Full-screen menu interaction and animated section transitions.',
    tags: ['React', 'Tailwind'],
    liveUrl: 'https://bloom.micahshu.com/',
  },
  {
    title: 'Maintenance Dashboard',
    slug: 'maintenance-dashboard',
    featured: true,
    category: 'Full-Stack',
    description:
      'Internal tool managing automated maintenance for 50+ WordPress sites. Updates plugins and core via WP CLI, then runs Sucuri malware scans and Ghost Inspector UI tests post-update. Failures route to Slack for alerts and Asana for follow-up task creation.',
    tags: ['Next.js', 'Express', 'Tailwind', 'WordPress'],
  },
  {
    title: 'Portfolio v2',
    slug: 'portfolio-v2',
    category: 'Full-Stack',
    description:
      'Custom WordPress portfolio built on the Timber framework. No page builder — Twig templates, AlpineJS filtering, Tailwind for styles.',
    tags: ['PHP', 'Tailwind', 'WordPress'],
    image: '/images/portfolioV2.webp',
  },
  {
    title: 'Portfolio Site v1',
    slug: 'portfolio-v1',
    category: 'Full-Stack',
    description:
      'First portfolio built in Next.js. Light/dark mode, clean layout, first real dive into modern framework development.',
    tags: ['Next.js', 'React', 'Tailwind'],
    liveUrl: 'https://micah-shu-micahshus-projects.vercel.app/',
    image: '/images/portfolioV1.png',
  },
  {
    title: 'stlpropertypros.com',
    slug: 'stlpropertypros-com',
    category: 'Front-End',
    description:
      'WordPress site for a St. Louis construction company. Portfolio section and lead-gen layout built with Divi.',
    tags: ['PHP', 'WordPress'],
    liveUrl: 'https://stlpropertypros.com',
    image: '/images/stlpropertypros.com_.webp',
  },
  {
    title: 'SEO Reporting Tool',
    slug: 'seo-reporting-tool',
    category: 'Full-Stack',
    description:
      'Internal tool for tracking keyword rankings across multiple sites. Scheduled reports, stored keywords, multi-site support.',
    tags: ['Next.js', 'React', 'Tailwind', 'Python'],
  },
  {
    title: 'petreefs.com',
    slug: 'petreefs',
    category: 'E-Commerce',
    description:
      'Single-page WooCommerce storefront for a specialty reef product. Divi build with product showcase and integrated checkout.',
    tags: ['PHP', 'WooCommerce', 'WordPress'],
    liveUrl: 'https://petreefs.com/',
  },
]

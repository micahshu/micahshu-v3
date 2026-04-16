import type { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    title: 'Portfolio v2',
    slug: 'portfolio-v2',
    featured: true,
    category: 'Full-Stack',
    description:
      'Custom WordPress portfolio built on the Timber framework. No page builder — Twig templates, AlpineJS filtering, Tailwind for styles.',
    tags: ['PHP', 'Tailwind', 'WordPress'],
    image: '/images/portfolioV2.webp',
  },
  {
    title: 'Zero Gravity Marketing',
    slug: 'zgm-rebuild',
    featured: true,
    category: 'Full-Stack',
    description:
      'Full migration of a 150+ page WordPress site to a headless Next.js architecture. Decoupled the CMS from the front end for full control over performance and the rendering pipeline.',
    tags: ['Headless', 'Next.js', 'React', 'Tailwind', 'WordPress'],
    liveUrl: 'https://zgmrebuild.wpenginepowered.com/',
    image: '/images/zerogravitymarketing.png',
  },
  {
    title: 'Portfolio Site v1',
    slug: 'portfolio-v1',
    featured: true,
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
    featured: true,
    category: 'Front-End',
    description:
      'WordPress site for a St. Louis construction company. Portfolio section and lead-gen layout built with Divi.',
    tags: ['PHP', 'WordPress'],
    liveUrl: 'https://stlpropertypros.com',
    image: '/images/stlpropertypros.com_.webp',
  },
  {
    title: 'React Landing Page',
    slug: 'react-landing-page',
    category: 'Front-End',
    description:
      'Conceptual landing page built with React and Framer Motion. Full-screen menu interaction and animated section transitions.',
    tags: ['React', 'Tailwind'],
    liveUrl: 'https://bloom-final-micahshus-projects.vercel.app/',
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

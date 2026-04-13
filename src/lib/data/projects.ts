import type { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    title: 'Portfolio v2',
    slug: 'portfolio-v2',
    category: 'Front-End + Back-End',
    description:
      'Built using WordPress and the Timber framework, this portfolio site leverages modern development practices by incorporating AlpineJS for interactive functionality and Tailwind CSS for utility-first styling. The project architecture separates concerns through Timber\'s Twig templating system, while AlpineJS handles dynamic features like the project filtering system without the overhead of larger JavaScript frameworks.',
    tags: ['Alpine.js', 'PHP', 'Tailwind', 'WordPress'],
    techIcons: [],
    image: '/images/portfolioV2.webp',
  },
  {
    title: 'ZGM Rebuild',
    slug: 'zgm-rebuild',
    category: 'Front-End',
    description:
      'A rebuilding of my company\'s current WordPress site using the Timber framework and Tailwind CSS.',
    tags: ['Alpine.js', 'PHP', 'Tailwind', 'WordPress'],
    techIcons: [],
    liveUrl: 'https://zgmrebuild.wpenginepowered.com/',
    image: '/images/zerogravitymarketing.png',
  },
  {
    title: 'Portfolio Site v1',
    slug: 'portfolio-v1',
    category: 'Front-End + Back-End',
    description:
      'My first professional portfolio site built using Next.js. This project features a dynamic light/dark mode theme system, allowing visitors to toggle their preferred viewing experience. While the design has some rough edges, it represents my first deep dive into modern framework web development and stands as a testament to learning through building.',
    tags: ['Next.js', 'React', 'Tailwind'],
    techIcons: [],
    liveUrl: 'https://micah-shu-micahshus-projects.vercel.app/',
    image: '/images/portfolioV1.png',
  },
  {
    title: 'stlpropertypros.com',
    slug: 'stlpropertypros-com',
    category: 'Front-End',
    description:
      'A custom WordPress website built with Divi Builder, featuring responsive design and streamlined user experience. The site showcases the client\'s construction portfolio while optimizing lead generation through strategic layout and clear calls-to-action.',
    tags: ['Divi', 'PHP', 'WordPress'],
    techIcons: [],
    liveUrl: 'https://stlpropertypros.com',
  },
  {
    title: 'React Landing Page',
    slug: 'react-landing-page',
    category: 'Front-End',
    description:
      'A landing page built using React, Tailwind CSS, and Framer Motion. Features a full-screen menu interaction element. Showcases responsive, interactive UI with modern tools while keeping performance and user experience in mind.',
    tags: ['React', 'Tailwind'],
    techIcons: [],
    liveUrl: 'https://bloom-final-micahshus-projects.vercel.app/',
  },
  {
    title: 'SEO Reporting Tool',
    slug: 'seo-reporting-tool',
    category: 'Front-End + Back-End',
    description:
      'A tool that lets you find and track the rankings of website keywords. Store keywords and run scheduled reports for multiple websites with key information about how your site is currently ranking.',
    tags: ['MongoDB', 'Next.js', 'React', 'Tailwind'],
    techIcons: [],
  },
  {
    title: 'petreefs.com',
    slug: 'petreefs',
    category: 'E-Commerce',
    description:
      'A custom landing page built with WordPress, combining Divi\'s design features with WooCommerce\'s shopping capabilities. The single-page design guides visitors through product offerings while maintaining a clean, engaging layout.',
    tags: ['PHP', 'WooCommerce', 'WordPress'],
    techIcons: [],
    liveUrl: 'https://petreefs.com/',
  },
]

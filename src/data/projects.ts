import type { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    title: 'Project One',
    slug: 'project-one',
    description: 'A short description of what this project does and why it matters.',
    tags: ['Web App', 'Design System'],
    techIcons: [
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
      { name: 'Next.js', icon: '/icons/nextjs.svg' },
    ],
    liveUrl: 'https://example.com',
  },
]

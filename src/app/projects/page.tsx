import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Projects — Micah Shu | Web Development Portfolio',
  description: 'Custom websites and web apps built for real businesses. Full-stack, front-end, and e-commerce projects by Micah Shu, freelance developer in Northern Colorado.',
}


import ProjectsGrid from '@/components/sections/ProjectsGrid'
import CTASection from '@/components/sections/CTASection'
import BlogSection from '@/components/sections/BlogSection'

export default function ProjectsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Work"
        title="Projects"
        subtitle="Custom websites and web apps. Built for real businesses, not portfolios."
        noBorderBottom
      />
      <ProjectsGrid />
      <CTASection />
      <BlogSection />
    </main>
  )
}

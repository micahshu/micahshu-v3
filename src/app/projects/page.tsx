import PageHero from '@/components/ui/PageHero'
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

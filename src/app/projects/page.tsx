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
        subtitle="Selected Website & App Work"
        noBorderBottom
      />
      <ProjectsGrid />
      <CTASection />
      <BlogSection />
    </main>
  )
}

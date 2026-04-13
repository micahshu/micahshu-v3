import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import CTASection from '@/components/sections/CTASection'
import BlogSection from '@/components/sections/BlogSection'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <CTASection />
      <BlogSection />
    </main>
  )
}

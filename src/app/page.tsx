import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'

export const metadata: Metadata = {
  title: 'Micah Shu — Web Developer in Fort Collins, CO',
  description: 'Freelance web developer in Fort Collins and Northern Colorado. Custom websites for small businesses — one developer, start to finish.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Micah Shu — Web Developer in Fort Collins, CO',
    description: 'Freelance web developer in Fort Collins and Northern Colorado. Custom websites for small businesses — one developer, start to finish.',
    url: 'https://micahshu.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Micah Shu — Web Developer in Fort Collins, CO',
    description: 'Freelance web developer in Fort Collins and Northern Colorado. Custom websites for small businesses — one developer, start to finish.',
  },
}
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

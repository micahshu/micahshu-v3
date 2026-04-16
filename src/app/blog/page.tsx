import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Blog — Micah Shu | Web Development',
  description: 'Case studies, process breakdowns, and engineering notes from a freelance web developer in Northern Colorado.',
}


import BlogList from '@/components/sections/BlogList'
import CTASection from '@/components/sections/CTASection'
import { getBlogPosts } from '@/lib/content'

export default function BlogPage() {
  const posts = getBlogPosts()

  const categories = Array.from(
    new Set(posts.flatMap((p) => p.categories)),
  ).sort()

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Blog"
        title="Writing"
        subtitle="Design, engineering, and the craft of building things that work well and look right."
        noBorderBottom
      />
      <BlogList posts={posts} categories={categories} />
      <CTASection />
    </main>
  )
}

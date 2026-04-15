import PageHero from '@/components/ui/PageHero'
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

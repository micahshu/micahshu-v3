import Link from 'next/link'
import { getBlogPosts } from '@/lib/content'

export default function BlogSection() {
  const posts = getBlogPosts().slice(0, 3)

  return (
    <section className="w-full">
      <div className="section-py" style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}>
        {/* Eyebrow */}
        <div className="container-px" style={{ marginBottom: 'var(--space-5)' }}>
          <h2
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
          >
            Recent Writing
          </h2>
        </div>

        {/* Post list */}
        <div style={{ borderTop: '1px solid var(--color-border-soft)' }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="service-row container-px flex items-baseline justify-between no-underline"
              style={{
                paddingBlock: 'var(--space-5)',
                borderBottom: '1px solid var(--color-border-soft)',
                gap: 'var(--space-6)',
              }}
            >
              {/* Title */}
              <h3
                className="font-display uppercase text-[color:var(--color-fg)] flex-1"
                style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
              >
                {post.title}
              </h3>

              {/* Meta: date + category */}
              <span
                className="service-row-label font-display uppercase text-[color:var(--color-muted)] shrink-0 hidden md:block"
                style={{
                  fontSize: 'var(--text-label)',
                  letterSpacing: '0.08em',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                {post.categories[0] ?? 'General'}&ensp;—&ensp;
                {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>

              {/* Arrow */}
              <span
                className="service-row-label shrink-0 font-body text-[color:var(--color-muted)]"
                style={{
                  fontSize: 'var(--text-body)',
                  transition: 'color var(--duration-fast) var(--ease-inout)',
                }}
              >
                ↗
              </span>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="container-px flex justify-end" style={{ marginTop: 'var(--space-5)' }}>
          <Link
            href="/blog"
            className="btn btn-ghost font-body no-underline"
            style={{ fontSize: 'var(--text-small)', padding: 'var(--space-2) var(--space-4)' }}
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}

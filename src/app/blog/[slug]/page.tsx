import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import { getBlogPosts, getBlogPostBySlug } from '@/lib/content'
import Link from 'next/link'

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

const mdComponents: Components = {
  h1: ({ children }) => (
    <h1
      className="font-body font-semibold text-[color:var(--color-fg)]"
      style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1.15, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}
    >
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className="font-body font-semibold text-[color:var(--color-fg)]"
      style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1.2, marginTop: 'var(--space-7)', marginBottom: 'var(--space-3)' }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      className="font-body font-semibold text-[color:var(--color-fg)]"
      style={{ fontSize: 'var(--text-h3)', letterSpacing: '-0.01em', lineHeight: 1.3, marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}
    >
      {children}
    </h3>
  ),
  p: ({ children, node }) => {
    const hasImage = node?.children.some(
      (child) => child.type === 'element' && child.tagName === 'img',
    )
    if (hasImage) return <>{children}</>
    return (
      <p
        className="font-body text-[color:var(--color-fg)]"
        style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, marginBottom: 'var(--space-5)' }}
      >
        {children}
      </p>
    )
  },
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-black decoration-black underline underline-offset-2 hover:opacity-70 dark:text-white dark:decoration-white"
      style={{ transition: 'opacity var(--duration-fast) var(--ease-inout)' }}
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul
      className="font-body text-[color:var(--color-fg)]"
      style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-5)', listStyleType: 'disc' }}
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol
      className="font-body text-[color:var(--color-fg)]"
      style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-5)', listStyleType: 'decimal' }}
    >
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li style={{ marginBottom: 'var(--space-2)' }}>{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="text-[color:var(--color-muted)] border-l-2 border-[color:var(--color-border)]"
      style={{ paddingLeft: 'var(--space-5)', marginBlock: 'var(--space-6)' }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <code
          className="font-mono block text-[color:var(--color-fg)] bg-[color:var(--color-surface)]"
          style={{ fontSize: 'var(--text-small)', lineHeight: 1.7, padding: 'var(--space-5)', overflowX: 'auto' }}
        >
          {children}
        </code>
      )
    }
    return (
      <code
        className="font-mono text-[color:var(--color-fg)] bg-[color:var(--color-surface)]"
        style={{ fontSize: '0.875em', paddingBlock: '2px', paddingInline: 'var(--space-2)' }}
      >
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre
      className="bg-[color:var(--color-surface)]"
      style={{ marginBlock: 'var(--space-6)', overflowX: 'auto' }}
    >
      {children}
    </pre>
  ),
  hr: () => (
    <hr
      className="border-t border-[color:var(--color-border-soft)]"
      style={{ marginBlock: 'var(--space-7)' }}
    />
  ),
  img: ({ src, alt }) => (
    <figure style={{ marginBlock: 'var(--space-7)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt ?? ''}
        className="w-full block"
        style={{ border: '1px solid var(--color-border-soft)' }}
      />
      {alt && (
        <figcaption
          className="font-body text-[color:var(--color-muted)]"
          style={{ fontSize: 'var(--text-caption)', marginTop: 'var(--space-2)' }}
        >
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[color:var(--color-fg)]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatCategory(cat: string) {
  return cat
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <main id="main-content">

      {/* ── Hero ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          className="container-px"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', paddingBlock: 'var(--space-9)' }}
        >
          {/* Meta */}
          <div className="flex items-center" style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
            {post.categories[0] && (
              <span
                className="font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
              >
                {formatCategory(post.categories[0])}
              </span>
            )}
            <span className="text-[color:var(--color-border-soft)]">—</span>
            <span
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-small)' }}
            >
              {formatDate(post.date)}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display uppercase text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 0.95, maxWidth: 'var(--container-tight)' }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, maxWidth: 'var(--container-prose)', marginTop: 'var(--space-6)' }}
            >
              {post.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* ── Body ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          className="container-px"
          style={{
            maxWidth: 'var(--container-prose)',
            marginInline: 'auto',
            paddingBlock: 'var(--space-9)',
          }}
        >
          <ReactMarkdown components={mdComponents}>
            {post.content}
          </ReactMarkdown>
        </div>
      </section>

      {/* ── Back nav ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          className="container-px flex items-center justify-between"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', paddingBlock: 'var(--space-5)' }}
        >
          <Link
            href="/blog"
            className="group flex items-center font-body no-underline text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-small)', gap: 'var(--space-2)', transition: 'color var(--duration-fast) var(--ease-inout)' }}
          >
            ← All Posts
          </Link>
        </div>
      </section>

    </main>
  )
}

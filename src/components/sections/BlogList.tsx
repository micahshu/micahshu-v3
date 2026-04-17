'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/types'

const pillBase =
  'inline-flex items-center font-body uppercase border cursor-pointer'
const pillInactive =
  'bg-[color:var(--color-surface)] text-[color:var(--color-fg)] border-[color:var(--color-border-soft)] hover:bg-[color:var(--color-fg)] hover:text-[color:var(--color-bg)] hover:border-[color:var(--color-border)]'
const pillActive =
  'bg-[color:var(--color-fg)] text-[color:var(--color-bg)] border-[color:var(--color-border)]'

const pillStyle = {
  fontSize: 'var(--text-caption)',
  letterSpacing: '0.08em',
  paddingBlock: 'var(--space-1)',
  paddingInline: 'var(--space-2)',
  transition:
    'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout), border-color var(--duration-fast) var(--ease-inout)',
}

const arrowBox = {
  width: 'var(--space-7)',
  height: 'var(--space-7)',
  fontSize: 'var(--text-small)',
  transition: 'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
} as const

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

interface BlogListProps {
  posts: Omit<BlogPost, 'content'>[]
  categories: string[]
}

export default function BlogList({ posts, categories }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      activeCategory
        ? posts.filter((p) => p.categories.includes(activeCategory))
        : posts,
    [posts, activeCategory],
  )

  const [hero, ...rest] = filtered
  const showFilter = categories.length > 1

  return (
    <>
      {/* ── Filter bar ── */}
      {showFilter && (
        <section className="w-full border-t border-b border-[color:var(--color-border)] animate-hero-3">
          <div
            className="container-px animate-hero-4"
            style={{
              maxWidth: 'var(--container-max)',
              marginInline: 'auto',
              paddingBlock: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
            }}
          >
            <button
              onClick={() => setActiveCategory(null)}
              aria-pressed={!activeCategory}
              className={`${pillBase} ${!activeCategory ? pillActive : pillInactive}`}
              style={pillStyle}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory((prev) => (prev === cat ? null : cat))}
                aria-pressed={activeCategory === cat}
                className={`${pillBase} ${activeCategory === cat ? pillActive : pillInactive}`}
                style={pillStyle}
              >
                {formatCategory(cat)}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Post list ── */}
      <section className={`w-full border-b border-[color:var(--color-border)] ${showFilter ? 'animate-hero-5' : 'border-t animate-hero-3'}`}>
        <div
          className="container-px"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}
        >
          {filtered.length === 0 ? (
            <p
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-body)', paddingBlock: 'var(--space-8)' }}
            >
              No posts in this category yet.
            </p>
          ) : (
            <>
              {/* ── Hero post ── */}
              <Link
                href={`/blog/${hero.slug}`}
                className={`group flex flex-col no-underline border-b border-[color:var(--color-border-soft)] hover:border-[color:var(--color-border)] ${showFilter ? '' : 'animate-hero-4'}`}
                style={{ paddingBlock: 'var(--space-8)', gap: 'var(--space-5)', transition: 'border-color var(--duration-fast) var(--ease-inout)' }}
              >
                {/* Meta row */}
                <div className="flex items-baseline" style={{ gap: 'var(--space-4)' }}>
                  {hero.categories[0] && (
                    <span
                      className="font-display uppercase text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                    >
                      {formatCategory(hero.categories[0])}
                    </span>
                  )}
                  <span
                    className="font-body text-[color:var(--color-muted)]"
                    style={{ fontSize: 'var(--text-small)' }}
                  >
                    {formatDate(hero.date)}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="font-display uppercase text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 0.95 }}
                >
                  {hero.title}
                </h2>

                {/* Excerpt + arrow row */}
                <div className="flex items-end justify-between" style={{ gap: 'var(--space-6)' }}>
                  {hero.excerpt && (
                    <p
                      className="font-body text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-body)', lineHeight: 1.6, maxWidth: 'var(--container-prose)' }}
                    >
                      {hero.excerpt}
                    </p>
                  )}
                  <span
                    className="shrink-0 flex items-center justify-center border border-[color:var(--color-border)] group-hover:bg-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
                    style={arrowBox}
                  >
                    ↗︎
                  </span>
                </div>
              </Link>

              {/* ── Remaining posts ── */}
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-[200px_1fr] no-underline border-b border-[color:var(--color-border-soft)] hover:border-[color:var(--color-border)] last:border-b-0"
                  style={{ paddingBlock: 'var(--space-6)', gap: 'var(--space-6)', transition: 'border-color var(--duration-fast) var(--ease-inout)' }}
                >
                  {/* Meta column */}
                  <div className="flex items-baseline md:flex-col md:items-start md:justify-start" style={{ gap: 'var(--space-2)' }}>
                    {post.categories[0] && (
                      <span
                        className="font-display uppercase text-[color:var(--color-muted)]"
                        style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                      >
                        {formatCategory(post.categories[0])}
                      </span>
                    )}
                    <span
                      className="font-body text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-small)' }}
                    >
                      {formatDate(post.date)}
                    </span>
                  </div>

                  {/* Content column */}
                  <div className="flex items-start justify-between" style={{ gap: 'var(--space-5)' }}>
                    <div className="flex flex-col flex-1" style={{ gap: 'var(--space-3)' }}>
                      <h3
                        className="font-display uppercase text-[color:var(--color-fg)]"
                        style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
                      >
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p
                          className="font-body text-[color:var(--color-muted)]"
                          style={{ fontSize: 'var(--text-body)', lineHeight: 1.6 }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <span
                      className="shrink-0 flex items-center justify-center border border-[color:var(--color-border)] group-hover:bg-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
                      style={arrowBox}
                    >
                      ↗︎
                    </span>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  )
}

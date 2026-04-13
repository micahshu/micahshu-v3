'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/lib/data/projects'
import { BrowserBar } from '@/components/ui/BrowserBar'
import type { CSSProperties } from 'react'

const featured = projects.filter((p) => p.featured)

export default function ProjectsSection() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  const isHovering = hoveredSlug !== null
  const hoveredProject = featured.find((p) => p.slug === hoveredSlug) ?? null

  return (
    <section className="w-full border-b border-[color:var(--color-border)]">
      <div
        style={{
          maxWidth: 'var(--container-max)',
          marginInline: 'auto',
          padding: 'var(--space-7) var(--space-7) var(--space-9)',
        }}
      >
        {/* Eyebrow */}
        <span
          className="block font-display uppercase text-[color:var(--color-muted)]"
          style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
        >
          Services
        </span>

        {/* Heading */}
        <h2
          className="font-display uppercase text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
        >
          My Work
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row" style={{ gap: 'var(--space-6)' }}>

          {/* ── Left: browser mockup panel — desktop only ── */}
          <div
            className="hidden md:flex shrink-0 flex-col border border-[color:var(--color-border-soft)]"
            style={{ width: '44%', aspectRatio: '16/10', alignSelf: 'flex-start' }}
          >
            <BrowserBar liveUrl={hoveredProject?.liveUrl} active={isHovering} />

            {/* Image area */}
            <div
              className="relative flex-1 overflow-hidden"
              style={{ background: 'var(--color-surface)' }}
            >
              {featured.map((project) =>
                project.image ? (
                  <Image
                    key={project.slug}
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="44vw"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      opacity: hoveredSlug === project.slug ? 1 : 0,
                      transition: 'opacity var(--duration-fast) var(--ease-inout)',
                    }}
                  />
                ) : null
              )}
            </div>
          </div>

          {/* ── Right: project list ── */}
          <div className="flex flex-col flex-1 justify-center">
            {featured.map((project, i) => {
              const isRowHovered = hoveredSlug === project.slug
              const firstRowStyle: CSSProperties = i === 0
                ? { borderTop: '1px solid var(--color-border-soft)' }
                : {}

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="flex items-center no-underline"
                  style={{
                    ...firstRowStyle,
                    gap: 'var(--space-4)',
                    paddingBlock: 'var(--space-4)',
                    borderBottomWidth: '1px',
                    borderBottomStyle: 'solid',
                    borderBottomColor: isRowHovered
                      ? 'var(--color-border)'
                      : 'var(--color-border-soft)',
                    transition: 'border-bottom-color var(--duration-fast) var(--ease-inout)',
                  }}
                  onMouseEnter={() => setHoveredSlug(project.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                >
                  {/* Index */}
                  <span
                    className="font-display shrink-0 text-[color:var(--color-muted)]"
                    style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', width: '28px' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <span
                    className="font-display uppercase text-[color:var(--color-fg)] flex-1"
                    style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1 }}
                  >
                    {project.title}
                  </span>

                  {/* Category */}
                  <span
                    className="font-display uppercase text-[color:var(--color-muted)] shrink-0"
                    style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                  >
                    {project.category}
                  </span>

                  {/* Arrow */}
                  <span
                    className="shrink-0 flex items-center justify-center border border-[color:var(--color-border)]"
                    style={{
                      width: 'var(--space-7)',
                      height: 'var(--space-7)',
                      fontSize: 'var(--text-small)',
                      borderRadius: 'var(--border-radius-md)',
                      background: isRowHovered ? 'var(--color-fg)' : 'transparent',
                      color: isRowHovered ? 'var(--color-bg)' : 'var(--color-fg)',
                      transition:
                        'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
                    }}
                  >
                    ↗
                  </span>
                </Link>
              )
            })}

            {/* View all CTA */}
            <div className="flex justify-end" style={{ marginTop: 'var(--space-5)' }}>
              <Link
                href="/projects"
                className="btn btn-ghost font-body no-underline"
                style={{ fontSize: 'var(--text-small)', padding: 'var(--space-2) var(--space-4)' }}
              >
                View All Work
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

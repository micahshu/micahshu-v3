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
          Projects
        </span>

        {/* Heading */}
        <h2
          className="font-display uppercase text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
        >
          My Work
        </h2>

        {/* Two-column layout */}
        <div className="flex flex-col min-[1000px]:flex-row" style={{ gap: 'var(--space-6)' }}>

          {/* ── Left: browser mockup panel — desktop only ── */}
          <div
            className="hidden min-[1000px]:flex shrink-0 flex-col border border-[color:var(--color-border-soft)]"
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
                  className="flex flex-col no-underline"
                  style={{
                    ...firstRowStyle,
                    paddingBlock: 'var(--space-4)',
                    gap: 'var(--space-3)',
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
                  {/* Info row */}
                  <div className="flex items-center" style={{ gap: 'var(--space-4)' }}>
                    {/* Index */}
                    <span
                      className="font-display shrink-0 text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', width: '28px' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <h3
                      className="font-display uppercase text-[color:var(--color-fg)] flex-1 text-center text-[length:var(--text-h2)] min-[1000px]:text-[length:var(--text-h1)] min-[1000px]:text-left"
                      style={{ letterSpacing: '-0.01em', lineHeight: 1 }}
                    >
                      {project.title}
                    </h3>

                    {/* Category — desktop only */}
                    <span
                      className="hidden min-[1000px]:block font-display uppercase text-[color:var(--color-muted)] shrink-0"
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
                        background: isRowHovered ? 'var(--color-fg)' : 'transparent',
                        color: isRowHovered ? 'var(--color-bg)' : 'var(--color-fg)',
                        transition:
                          'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
                      }}
                    >
                      ↗
                    </span>
                  </div>

                  {/* Image preview — mobile only */}
                  {project.image && (
                    <div
                      className="min-[1000px]:hidden flex flex-col overflow-hidden border border-[color:var(--color-border-soft)]"
                    >
                      <BrowserBar liveUrl={project.liveUrl} active={true} />
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/10' }}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(min-width: 1000px) 0px, 100vw"
                          style={{ objectFit: 'cover', objectPosition: 'top center' }}
                        />
                      </div>
                    </div>
                  )}
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

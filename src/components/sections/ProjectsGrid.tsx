'use client'

import { useState, useMemo } from 'react'
import { projects } from '@/lib/data/projects'
import { TAG_ICONS } from '@/lib/data/tags'
import { ProjectCard } from '@/components/ui/ProjectCard'

const FILTER_TAGS = ['React', 'Next.js', 'Tailwind', 'WordPress', 'WooCommerce', 'PHP', 'Headless']

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
  gap: 'var(--space-1)',
  transition:
    'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout), border-color var(--duration-fast) var(--ease-inout)',
}

export default function ProjectsGrid() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const availableTags = useMemo(
    () => FILTER_TAGS.filter((tag) => projects.some((p) => p.tags.includes(tag))),
    []
  )

  const isFiltered = activeTag !== null

  // Default view: featured cards + "More Work" small grid
  const defaultFeatured = isFiltered ? [] : projects.filter((p) => p.featured)
  const defaultRest = isFiltered ? [] : projects.filter((p) => !p.featured)

  // Filtered view: first 2 matches as featured cards, rest as small grid, non-matches as "Other Tech"
  const filterMatches = isFiltered ? projects.filter((p) => p.tags.includes(activeTag!)) : []
  const filterFeatured = filterMatches.slice(0, 2)
  const filterRest = filterMatches.slice(2)
  const filterOthers = isFiltered ? projects.filter((p) => !p.tags.includes(activeTag!)).slice(0, 3) : []

  return (
    <>
      {/* ── Filter bar ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          className="container-px"
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
            onClick={() => setActiveTag(null)}
            aria-pressed={!activeTag}
            className={`${pillBase} ${!activeTag ? pillActive : pillInactive}`}
            style={pillStyle}
          >
            All
          </button>
          {availableTags.map((tag) => {
            const Icon = TAG_ICONS[tag] ?? null
            return (
              <button
                key={tag}
                onClick={() => setActiveTag((prev) => (prev === tag ? null : tag))}
                aria-pressed={activeTag === tag}
                className={`${pillBase} ${activeTag === tag ? pillActive : pillInactive}`}
                style={pillStyle}
              >
                {Icon && <Icon size={10} style={{ flexShrink: 0 }} />}
                {tag}
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Project grid ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          className="container-px section-py"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}
        >
          {isFiltered ? (
            <>
              {filterMatches.length === 0 && (
                <p
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-body)' }}
                >
                  No projects match this filter.
                </p>
              )}

              {/* First 2 matches — featured horizontal cards */}
              {filterFeatured.length > 0 && (
                <div className="flex flex-col" style={{ gap: 'var(--space-6)' }}>
                  {filterFeatured.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      featured
                      layout="horizontal"
                    />
                  ))}
                </div>
              )}

              {/* Remaining matches — small grid */}
              {filterRest.length > 0 && (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  style={{ gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}
                >
                  {filterRest.map((project) => (
                    <ProjectCard key={project.slug} project={project} layout="vertical" />
                  ))}
                </div>
              )}

              {/* "Other Tech" divider + small grid */}
              {filterOthers.length > 0 && (
                <>
                  <div
                    style={{
                      paddingTop: 'var(--space-6)',
                      paddingBottom: 'var(--space-4)',
                      borderBottom: '1px solid var(--color-border-soft)',
                      marginBottom: 'var(--space-6)',
                    }}
                  >
                    <span
                      className="font-display uppercase text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                    >
                      Other Tech
                    </span>
                  </div>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    style={{ gap: 'var(--space-6)' }}
                  >
                    {filterOthers.map((project) => (
                      <ProjectCard key={project.slug} project={project} layout="vertical" />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {/* Default: Featured — full-width horizontal cards */}
              {defaultFeatured.length > 0 && (
                <div className="flex flex-col" style={{ gap: 'var(--space-6)' }}>
                  {defaultFeatured.map((project) => (
                    <ProjectCard
                      key={project.slug}
                      project={project}
                      featured
                      layout="horizontal"
                    />
                  ))}
                </div>
              )}

              {/* "More Work" divider */}
              {defaultFeatured.length > 0 && defaultRest.length > 0 && (
                <div
                  style={{
                    paddingTop: 'var(--space-6)',
                    paddingBottom: 'var(--space-4)',
                    borderBottom: '1px solid var(--color-border-soft)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  <span
                    className="font-display uppercase text-[color:var(--color-muted)]"
                    style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                  >
                    More Work
                  </span>
                </div>
              )}

              {/* Standard small grid */}
              {defaultRest.length > 0 && (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  style={{ gap: 'var(--space-6)' }}
                >
                  {defaultRest.map((project) => (
                    <ProjectCard key={project.slug} project={project} layout="vertical" />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}

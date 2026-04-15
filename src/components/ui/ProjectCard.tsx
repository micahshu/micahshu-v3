import Link from 'next/link'
import { Tag } from '@/components/ui/Tag'
import { RevealImage } from '@/components/ui/RevealImage'
import { BrowserBar } from '@/components/ui/BrowserBar'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  layout?: 'horizontal' | 'vertical'
  imageFirst?: boolean
  maxTags?: number
}

export function ProjectCard({
  project,
  featured = false,
  layout = 'horizontal',
  imageFirst = true,
  maxTags,
}: ProjectCardProps) {
  const visibleTags = maxTags ? project.tags.slice(0, maxTags) : project.tags
  const hiddenCount = maxTags ? Math.max(0, project.tags.length - maxTags) : 0
  const isVertical = layout === 'vertical'
  const showImageFirst = !isVertical || imageFirst

  const imageBorderClass = isVertical
    ? imageFirst
      ? 'border-b border-[color:var(--color-border-soft)] group-hover:border-[color:var(--color-border)]'
      : 'border-t border-[color:var(--color-border-soft)] group-hover:border-[color:var(--color-border)]'
    : 'border-b md:border-b-0 md:border-r border-[color:var(--color-border-soft)] group-hover:border-[color:var(--color-border)]'

  const browserBar = <BrowserBar liveUrl={project.liveUrl} />

  const imageWidthClass = isVertical ? 'w-full' : 'md:w-1/2'
  const imageVisibilityClass = 'hidden md:flex'
  const sizes = isVertical
    ? '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
    : '(min-width: 768px) 50vw, 100vw'

  const imageBlock = project.image ? (
    <div
      className={`flex-col shrink-0 ${imageVisibilityClass} ${imageWidthClass} ${imageBorderClass}`}
      style={{
        aspectRatio: '16/10',
        transition: 'border-color var(--duration-fast) var(--ease-inout)',
      }}
    >
      {browserBar}
      <div className="relative flex-1 overflow-hidden">
        <RevealImage
          src={project.image}
          alt={project.title}
          fill
          sizes={sizes}
          groupHover
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
        />
      </div>
    </div>
  ) : null

  const contentBlock = (
    <div
      className="flex flex-col flex-1"
      style={{ padding: featured ? 'var(--space-6)' : 'var(--space-5)' }}
    >
      {/* Eyebrow */}
      <span
        className="font-display uppercase text-[color:var(--color-muted)]"
        style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
      >
        {project.category}
      </span>

      {/* Title */}
      <h3
        className="font-display uppercase text-[color:var(--color-fg)]"
        style={{
          fontSize: featured ? 'var(--text-h1)' : 'var(--text-h2)',
          letterSpacing: '-0.01em',
          lineHeight: 1.0,
          marginTop: 'var(--space-2)',
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className={`font-body text-[color:var(--color-muted)] ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}
        style={{
          fontSize: featured ? 'var(--text-body)' : 'var(--text-small)',
          lineHeight: 1.6,
          marginTop: featured ? 'var(--space-4)' : 'var(--space-3)',
        }}
      >
        {project.description}
      </p>

      {featured ? (
        /* Featured — tags + full-width ghost button */
        <div className="flex flex-col mt-auto" style={{ gap: 'var(--space-5)', paddingTop: 'var(--space-5)' }}>
          <div className="flex items-center flex-wrap" style={{ gap: 'var(--space-2)' }}>
            {visibleTags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
            {hiddenCount > 0 && <Tag label={`+${hiddenCount}`} />}
          </div>
          <span
            className="font-body flex items-center justify-center border border-[color:var(--color-border)] text-[color:var(--color-fg)] group-hover:bg-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
            style={{
              fontSize: 'var(--text-body)',
              padding: 'var(--space-4)',
              transition: 'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
            }}
          >
            View Project
          </span>
        </div>
      ) : (
        /* Standard CTA — tags + square arrow button */
        <div
          className="flex items-end justify-between mt-auto"
          style={{ paddingTop: 'var(--space-4)', gap: 'var(--space-4)' }}
        >
          <div className="flex items-center flex-wrap" style={{ gap: 'var(--space-2)' }}>
            {visibleTags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
            {hiddenCount > 0 && <Tag label={`+${hiddenCount}`} />}
          </div>
          <span
            className="shrink-0 font-body flex items-center justify-center border border-[color:var(--color-border)] text-[color:var(--color-fg)] group-hover:bg-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
            style={{
              width: 'var(--space-7)',
              height: 'var(--space-7)',
              fontSize: 'var(--text-small)',
              transition: 'background-color var(--duration-fast) var(--ease-inout), color var(--duration-fast) var(--ease-inout)',
            }}
          >
            ↗
          </span>
        </div>
      )}
    </div>
  )

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex no-underline bg-[color:var(--color-paper-pure)] border border-[color:var(--color-border)] hover:[outline:1px_solid_var(--color-border)] hover:[outline-offset:-1px] ${isVertical ? 'flex-col' : 'flex-col md:flex-row'}`}
    >
      {showImageFirst ? imageBlock : contentBlock}
      {showImageFirst ? contentBlock : imageBlock}
    </Link>
  )
}

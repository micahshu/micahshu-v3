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
}

export function ProjectCard({
  project,
  featured = false,
  layout = 'horizontal',
  imageFirst = true,
}: ProjectCardProps) {
  const isVertical = layout === 'vertical'
  const showImageFirst = !isVertical || imageFirst

  const imageBorderClass = isVertical
    ? imageFirst
      ? 'border-b border-[color:var(--color-border-soft)] group-hover:border-[color:var(--color-border)]'
      : 'border-t border-[color:var(--color-border-soft)] group-hover:border-[color:var(--color-border)]'
    : 'border-r border-[color:var(--color-border-soft)] group-hover:border-[color:var(--color-border)]'

  const browserBar = <BrowserBar liveUrl={project.liveUrl} />

  const imageBlock = project.image ? (
    <div
      className={`flex flex-col shrink-0 ${imageBorderClass}`}
      style={{
        width: isVertical ? '100%' : '50%',
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
          sizes="(min-width: 768px) 50vw, 100vw"
          reveal
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
          marginTop: 'var(--space-3)',
        }}
      >
        {project.description}
      </p>

      {featured ? (
        /* Featured — tags + full-width ghost button */
        <div className="flex flex-col mt-auto" style={{ gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
          <div className="flex items-center flex-wrap" style={{ gap: 'var(--space-2)' }}>
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <span
            className="font-body flex items-center justify-center border border-[color:var(--color-border)] text-[color:var(--color-fg)] group-hover:bg-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
            style={{
              fontSize: 'var(--text-body)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--border-radius-md)',
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
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <span
            className="shrink-0 font-body flex items-center justify-center border border-[color:var(--color-border)] text-[color:var(--color-fg)] group-hover:bg-[color:var(--color-fg)] group-hover:text-[color:var(--color-bg)]"
            style={{
              width: 'var(--space-7)',
              height: 'var(--space-7)',
              fontSize: 'var(--text-small)',
              borderRadius: 'var(--border-radius-md)',
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
      className="group flex no-underline bg-[color:var(--color-paper-pure)] border border-[color:var(--color-border)] hover:border-2"
      style={{
        flexDirection: isVertical ? 'column' : 'row',
        transition: 'border-width var(--duration-fast) var(--ease-inout)',
      }}
    >
      {showImageFirst ? imageBlock : contentBlock}
      {showImageFirst ? contentBlock : imageBlock}
    </Link>
  )
}

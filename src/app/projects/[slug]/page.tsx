import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/data/projects'
import type { Project } from '@/lib/types'
import { Tag } from '@/components/ui/Tag'
import { BrowserBar } from '@/components/ui/BrowserBar'
import { RevealImage } from '@/components/ui/RevealImage'
import { ProjectCard } from '@/components/ui/ProjectCard'
import Container from '@/components/layout/Container'
import CTASection from '@/components/sections/CTASection'
import BlogSection from '@/components/sections/BlogSection'
import { getCaseStudy } from '@/lib/content'

function getRelatedProjects(current: Project, limit = 3): Project[] {
  return projects
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      project: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ project }) => project)
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Micah Shu`,
    description: project.description,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) notFound()

  const related = getRelatedProjects(project)
  const caseStudy = getCaseStudy(project.slug)

  return (
    <main id="main-content">
      {/* ── Hero ── */}
      <section className={`w-full ${!caseStudy ? 'border-b border-[color:var(--color-border)]' : ''}`}>
        <Container style={{ paddingTop: 'var(--space-9)', paddingBottom: caseStudy ? 0 : 'var(--space-9)' }}>

          {/* Eyebrow */}
          <span
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
          >
            {project.category}
          </span>

          {/* Title */}
          <h1
            className="font-display uppercase text-[color:var(--color-fg)]"
            style={{
              fontSize: 'var(--text-display)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              marginBottom: 'var(--space-6)',
            }}
          >
            {project.title}
          </h1>

          {/* Description */}
          <p
            className="font-body text-[color:var(--color-muted)]"
            style={{
              fontSize: 'var(--text-body)',
              lineHeight: 1.7,
              maxWidth: 'var(--container-prose)',
              marginBottom: 'var(--space-7)',
            }}
          >
            {project.description}
          </p>

          {/* Tags + live URL */}
          <div
            className="flex items-center justify-between flex-wrap"
            style={{
              gap: 'var(--space-4)',
              paddingTop: 'var(--space-5)',
              borderTop: '1px solid var(--color-border-soft)',
            }}
          >
            <div className="flex items-center flex-wrap" style={{ gap: 'var(--space-2)' }}>
              {project.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost font-body no-underline"
                style={{ fontSize: 'var(--text-small)', padding: 'var(--space-2) var(--space-4)' }}
              >
                Live Site ↗
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* ── Case study ── */}
      {caseStudy && (
        <section className="w-full border-b border-[color:var(--color-border)]">
          <Container style={{ paddingBlock: 'var(--space-6)' }}>
            <span
              className="block font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
            >
              Case Study
            </span>
            <Link
              href={`/blog/${caseStudy.slug}`}
              className="group flex items-baseline justify-between no-underline"
              style={{
                paddingBlock: 'var(--space-5)',
                borderTop: '1px solid var(--color-border-soft)',
                borderBottom: '1px solid var(--color-border-soft)',
                gap: 'var(--space-6)',
              }}
            >
              <h3
                className="font-display uppercase text-[color:var(--color-fg)] flex-1"
                style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
              >
                {caseStudy.title}
              </h3>
              <span
                className="font-display uppercase text-[color:var(--color-muted)] shrink-0 hidden md:block"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
              >
                Case Study&ensp;—&ensp;
                {new Date(caseStudy.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
              <span
                className="shrink-0 font-body text-[color:var(--color-muted)] group-hover:text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-body)', transition: 'color var(--duration-fast) var(--ease-inout)' }}
              >
                ↗
              </span>
            </Link>
          </Container>
        </section>
      )}

      {/* ── Image + related projects ── */}
      {(project.image || related.length > 0) && (
        <section
          className={`w-full border-b border-[color:var(--color-border)] flex flex-col ${project.image && related.length > 0 ? 'lg:grid' : ''}`}
          style={
            project.image && related.length > 0
              ? { gridTemplateColumns: '1fr min(340px, 35%)' }
              : undefined
          }
        >
          {/* Browser mockup */}
          {project.image && (
            <div
              className={`flex flex-col${related.length > 0 ? ' border-b border-[color:var(--color-border)] lg:border-b-0 lg:border-r' : ''}`}
              style={{ padding: 'var(--space-7)' }}
            >
              <div className="flex flex-col border border-[color:var(--color-border)] overflow-hidden">
                <BrowserBar liveUrl={project.liveUrl} active={true} />
                <div className="relative w-full aspect-[16/10]">
                  <RevealImage
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes={
                      related.length > 0
                        ? '(min-width: 1280px) 860px, (min-width: 768px) 65vw, calc(100vw - 96px)'
                        : '(min-width: 1280px) calc(100vw - 96px), 100vw'
                    }
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Related projects */}
          {related.length > 0 && (
            <div
              className="flex flex-col"
              style={{ gap: 'var(--space-4)', padding: 'var(--space-6) var(--space-5)' }}
            >
              <span
                className="font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
              >
                Similar Projects
              </span>
              {related.map((r) => (
                <ProjectCard
                  key={r.slug}
                  project={{ ...r, image: undefined }}
                  layout="vertical"
                  maxTags={2}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <CTASection />
      <BlogSection />
    </main>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { projects } from '@/lib/data/projects'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Resume — Micah Shu | Full-Stack Developer in Fort Collins, CO',
  description: 'Full-stack developer based in Berthoud, CO. Custom websites, web applications, WordPress builds, and workflow automation for small businesses in Northern Colorado.',
  alternates: { canonical: '/about/resume' },
  openGraph: {
    title: 'Resume — Micah Shu | Full-Stack Developer in Fort Collins, CO',
    description: 'Full-stack developer based in Berthoud, CO. Custom websites, web applications, WordPress builds, and workflow automation for small businesses in Northern Colorado.',
    url: 'https://micahshu.com/about/resume',
    type: 'website',
  },
}

const featuredProjects = projects.filter((p) => p.featured)

const STACK = [
  { label: 'Front End', items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Back End', items: ['Node.js', 'PostgreSQL', 'Serverless / Edge', 'REST APIs'] },
  { label: 'CMS & E-Commerce', items: ['WordPress', 'Headless CMS', 'Shopify', 'WooCommerce'] },
  { label: 'Tooling', items: ['Python', 'WP CLI', 'GitHub Actions', 'Vercel'] },
]

export default function ResumePage() {
  return (
    <main id="main-content">

      {/* ── Hero ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}>

          {/* Back link */}
          <div
            className="border-b border-[color:var(--color-border-soft)] animate-hero-1"
            style={{ paddingBlock: 'var(--space-3)', paddingInline: 'var(--space-7)' }}
          >
            <Link
              href="/about"
              className="font-display uppercase no-underline text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', transition: 'color var(--duration-fast) var(--ease-inout)' }}
            >
              ← About
            </Link>
          </div>

          <div
            className="flex flex-col md:flex-row md:items-end justify-between animate-hero-2"
            style={{ padding: 'var(--space-7) var(--space-7) var(--space-9)', gap: 'var(--space-7)' }}
          >
            <div className="flex flex-col" style={{ gap: 'var(--space-4)' }}>
              <span
                className="font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
              >
                Resume
              </span>
              <h1
                className="font-display uppercase text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                Micah Shu
              </h1>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, maxWidth: 'var(--container-prose)' }}
              >
                Full-stack developer based in Berthoud, CO. Agency-trained, freelance-focused. Building custom websites, web applications, and internal tools for small businesses in Fort Collins and Northern Colorado — one developer, start to finish.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end shrink-0 animate-hero-3" style={{ gap: 'var(--space-3)' }}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid no-underline"
                style={{ padding: '14px 20px', fontSize: 'var(--text-body)' }}
              >
                Download PDF ↗︎
              </a>
              <span
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-small)' }}
              >
                me@micahshu.com
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Background ── */}
      <section className="w-full border-b border-[color:var(--color-border)] animate-hero-3">
        <div
          className="flex flex-col md:flex-row"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}
        >
          <div
            className="shrink-0 md:border-r border-[color:var(--color-border)]"
            style={{ width: '280px', padding: 'var(--space-7)' }}
          >
            <span
              className="block font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
            >
              Background
            </span>
            <h2
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1 }}
            >
              The Story
            </h2>
          </div>
          <div className="flex-1 flex flex-col" style={{ padding: 'var(--space-7)', gap: 'var(--space-5)' }}>
            <p
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, maxWidth: 'var(--container-prose)' }}
            >
              Full-stack cert from the University of Denver. First job at a marketing agency in Fort Collins — the kind of place where you scope the project, build it, and present it yourself. That grew into a tech lead role managing a pipeline of client sites and internal tooling.
            </p>
            <p
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, maxWidth: 'var(--container-prose)' }}
            >
              Now I freelance for small businesses across Fort Collins and Northern Colorado. Same skills, no overhead. One developer who owns the whole thing — design through deployment.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7) var(--space-7) var(--space-9)' }}>
          <span
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
          >
            Stack
          </span>
          <h2
            className="font-display uppercase text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
          >
            Technologies
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ borderTop: '1px solid var(--color-border)', borderLeft: '1px solid var(--color-border)' }}
          >
            {STACK.map((group) => (
              <div
                key={group.label}
                className="flex flex-col"
                style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', gap: 'var(--space-4)' }}
              >
                <span
                  className="font-display uppercase text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                >
                  {group.label}
                </span>
                <div className="flex flex-wrap" style={{ gap: 'var(--space-2)' }}>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-body text-[color:var(--color-fg)] bg-[color:var(--color-surface)]"
                      style={{ fontSize: 'var(--text-small)', padding: '4px 10px', borderRadius: '2px' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Selected Projects ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7) var(--space-7) var(--space-9)' }}>
          <span
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
          >
            Work
          </span>
          <div className="flex items-baseline justify-between" style={{ marginBottom: 'var(--space-7)' }}>
            <h2
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              Selected Projects
            </h2>
            <Link
              href="/projects"
              className="btn btn-ghost no-underline shrink-0"
              style={{ fontSize: 'var(--text-small)', padding: 'var(--space-2) var(--space-4)' }}
            >
              View All ↗︎
            </Link>
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)' }}>
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="service-row flex items-start md:items-center no-underline text-[color:var(--color-fg)]"
                style={{
                  paddingBlock: 'var(--space-4)',
                  paddingInline: 'var(--space-5)',
                  gap: 'var(--space-4)',
                  borderBottom: '1px solid var(--color-border-soft)',
                }}
              >
                <h3
                  className="font-display uppercase shrink-0"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1, width: '260px' }}
                >
                  {project.title}
                </h3>
                <p
                  className="service-row-label hidden md:block font-body text-[color:var(--color-muted)] flex-1"
                  style={{ fontSize: 'var(--text-small)', lineHeight: 1.5, transition: 'color var(--duration-fast) var(--ease-inout)' }}
                >
                  {project.description}
                </p>
                <span
                  className="service-row-label shrink-0 font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-h3)', lineHeight: 1, marginLeft: 'auto', transition: 'color var(--duration-fast) var(--ease-inout)' }}
                >
                  ↗︎
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  )
}

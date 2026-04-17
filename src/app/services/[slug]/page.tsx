import { notFound } from 'next/navigation'
import Link from 'next/link'
import CTASection from '@/components/sections/CTASection'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import BlogSection from '@/components/sections/BlogSection'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { services as allServices } from '@/lib/data/services'

const services = allServices.filter((s) => !s.hidden)
import { alaCarteServices } from '@/lib/data/alacarte'
import { projects } from '@/lib/data/projects'

export function generateStaticParams() {
  return [
    ...allServices.map((s) => ({ slug: s.slug })),
    ...alaCarteServices.map((s) => ({ slug: s.slug })),
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = allServices.find((s) => s.slug === slug)
  if (service) return {
    title: `${service.name} — Micah Shu`,
    description: service.hook,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.name} — Micah Shu`,
      description: service.hook,
      url: `https://micahshu.com/services/${slug}`,
      type: 'website',
    },
  }
  const alacarte = alaCarteServices.find((s) => s.slug === slug)
  if (alacarte) return {
    title: `${alacarte.name} — Micah Shu`,
    description: alacarte.hook,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${alacarte.name} — Micah Shu`,
      description: alacarte.hook,
      url: `https://micahshu.com/services/${slug}`,
      type: 'website',
    },
  }
  return {}
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // ── À La Carte detail ──────────────────────────────────────────────────────
  const alacarte = alaCarteServices.find((s) => s.slug === slug)
  if (alacarte) {
    return (
      <main id="main-content">

        {/* ── Hero ── */}
        <section className="w-full">
          <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}>

            {/* Back link */}
            <div
              className="border-b border-[color:var(--color-border-soft)] animate-hero-1"
              style={{ paddingBlock: 'var(--space-3)', paddingInline: 'var(--space-7)' }}
            >
              <Link
                href="/services"
                className="font-display uppercase no-underline text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', transition: 'color var(--duration-fast) var(--ease-inout)' }}
              >
                ← Services
              </Link>
            </div>

            {/* Hero content */}
            <div
              className="flex flex-col md:flex-row md:items-end justify-between"
              style={{ padding: 'var(--space-7) var(--space-7) var(--space-9)', gap: 'var(--space-7)' }}
            >
              <div className="flex flex-col animate-hero-2" style={{ gap: 'var(--space-4)' }}>
                <span
                  className="font-display uppercase text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                >
                  À La Carte
                </span>
                <h1
                  className="font-display uppercase text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1 }}
                >
                  {alacarte.name}
                </h1>
                <p
                  className="font-body text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, maxWidth: 'var(--container-prose)' }}
                >
                  {alacarte.hook}
                </p>
              </div>

              {/* Price + CTA */}
              <div className="flex flex-col items-start md:items-end shrink-0 animate-hero-3" style={{ gap: 'var(--space-4)' }}>
                <div className="flex flex-col items-start md:items-end" style={{ gap: 'var(--space-1)' }}>
                  <span
                    className="font-display uppercase text-[color:var(--color-muted)]"
                    style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                  >
                    Rate
                  </span>
                  <div className="flex items-baseline" style={{ gap: 'var(--space-2)' }}>
                    <span
                      className="font-display uppercase text-[color:var(--color-fg)]"
                      style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1 }}
                    >
                      {alacarte.price}
                    </span>
                    <span
                      className="font-body text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-small)' }}
                    >
                      {alacarte.billingCycle}
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="btn btn-solid no-underline"
                  style={{ padding: '14px 20px', fontSize: 'var(--text-body)', marginTop: 'var(--space-2)' }}
                >
                  Get Started ↗︎
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Description ── */}
        <section className="w-full border-t border-b border-[color:var(--color-border)] animate-hero-3">
          <div
            className="flex flex-col md:flex-row"
            style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}
          >
            <div
              className="shrink-0 md:border-r border-[color:var(--color-border)] animate-hero-4"
              style={{ width: '280px', padding: 'var(--space-7)' }}
            >
              <span
                className="block font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
              >
                Overview
              </span>
              <h2
                className="font-display uppercase text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1 }}
              >
                What It Is
              </h2>
            </div>
            <div className="flex-1 animate-hero-5" style={{ padding: 'var(--space-7)' }}>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, maxWidth: 'var(--container-prose)' }}
              >
                {alacarte.description}
              </p>
            </div>
          </div>
        </section>

        {/* ── Includes + Who It's For ── */}
        <section className="w-full border-b border-[color:var(--color-border)] animate-hero-5">
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}
          >
            <div
              className="flex flex-col md:border-r border-[color:var(--color-border)]"
              style={{ padding: 'var(--space-7)' }}
            >
              <span
                className="block font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
              >
                Deliverables
              </span>
              <h2
                className="font-display uppercase text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 'var(--space-6)' }}
              >
                What's Included
              </h2>
              <ul className="flex flex-col list-none m-0 p-0" style={{ gap: 'var(--space-3)' }}>
                {alacarte.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start font-body text-[color:var(--color-fg)]"
                    style={{ fontSize: 'var(--text-body)', lineHeight: 1.5, borderTop: '1px solid var(--color-border-soft)', paddingTop: 'var(--space-3)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="flex flex-col border-t md:border-t-0 border-[color:var(--color-border)]"
              style={{ padding: 'var(--space-7)' }}
            >
              <span
                className="block font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
              >
                Fit
              </span>
              <h2
                className="font-display uppercase text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 'var(--space-6)' }}
              >
                Who It's For
              </h2>
              <ul className="flex flex-col list-none m-0 p-0" style={{ gap: 'var(--space-3)' }}>
                {alacarte.idealFor.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start font-body text-[color:var(--color-fg)]"
                    style={{ fontSize: 'var(--text-body)', lineHeight: 1.5, borderTop: '1px solid var(--color-border-soft)', paddingTop: 'var(--space-3)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="w-full border-b border-[color:var(--color-border)]">
          <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7)' }}>
            <span
              className="block font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
            >
              FAQ
            </span>
            <h2
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
            >
              Common Questions
            </h2>
            <ServiceFAQ faqs={alacarte.faqs} />
          </div>
        </section>

        {/* ── See Also ── */}
        {alacarte.seeAlso && (
          <section className="w-full border-b border-[color:var(--color-border)]">
            <div
              className="flex flex-col md:flex-row md:items-center justify-between"
              style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-6) var(--space-7)', gap: 'var(--space-5)' }}
            >
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.5 }}
              >
                {alacarte.seeAlso.text}
              </p>
              <Link
                href={alacarte.seeAlso.href}
                className="btn btn-ghost no-underline shrink-0"
                style={{ fontSize: 'var(--text-small)', padding: 'var(--space-2) var(--space-4)' }}
              >
                Maintenance ↗︎
              </Link>
            </div>
          </section>
        )}

        <CTASection />

        <div className="border-t border-[color:var(--color-border)]">
          <BlogSection />
        </div>
      </main>
    )
  }

  // ── Main service detail ────────────────────────────────────────────────────
  const service = allServices.find((s) => s.slug === slug)
  if (!service) notFound()

  const relatedProjects = service.relatedCategory
    ? projects.filter((p) => p.category === service.relatedCategory).slice(0, 2)
    : []

  const relatedAlaCarteItems = alaCarteServices.filter((a) =>
    a.parentSlugs.includes(service.slug)
  )

  return (
    <main id="main-content">

      {/* ── Hero ── */}
      <section className="w-full">
        <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}>

          {/* Back link */}
          <div
            className="border-b border-[color:var(--color-border-soft)] animate-hero-1"
            style={{ paddingBlock: 'var(--space-3)', paddingInline: 'var(--space-7)' }}
          >
            <Link
              href="/services"
              className="font-display uppercase no-underline text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', transition: 'color var(--duration-fast) var(--ease-inout)' }}
            >
              ← Services
            </Link>
          </div>

          {/* Hero content */}
          <div
            className="flex flex-col md:flex-row md:items-end justify-between"
            style={{ padding: 'var(--space-7) var(--space-7) var(--space-9)', gap: 'var(--space-7)' }}
          >
            <div className="flex flex-col animate-hero-2" style={{ gap: 'var(--space-4)' }}>
              <span
                className="font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
              >
                Service
              </span>
              <h1
                className="font-display uppercase text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                {service.name}
              </h1>
              <p
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, maxWidth: 'var(--container-prose)' }}
              >
                {service.hook}
              </p>
            </div>

            {/* Metadata + CTA */}
            <div className="flex flex-col items-start md:items-end shrink-0 animate-hero-3" style={{ gap: 'var(--space-4)' }}>
              <div className="flex flex-col items-start md:items-end" style={{ gap: 'var(--space-2)' }}>
                <span
                  className="font-display uppercase text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                >
                  Timeline
                </span>
                <span
                  className="font-display uppercase text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
                >
                  {service.timeframe}
                </span>
              </div>
              <div className="flex flex-col items-start md:items-end" style={{ gap: 'var(--space-2)' }}>
                <span
                  className="font-display uppercase text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                >
                  Starting At
                </span>
                <span
                  className="font-display uppercase text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
                >
                  {service.startingAt}
                </span>
              </div>
              <Link
                href="/contact"
                className="btn btn-solid no-underline"
                style={{ padding: '14px 20px', fontSize: 'var(--text-body)', marginTop: 'var(--space-2)' }}
              >
                Start a Project ↗︎
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="w-full border-t border-b border-[color:var(--color-border)] animate-hero-3">
        <div
          className="flex flex-col md:flex-row"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}
        >
          <div
            className="shrink-0 md:border-r border-[color:var(--color-border)] animate-hero-4"
            style={{ width: '280px', padding: 'var(--space-7)' }}
          >
            <span
              className="block font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
            >
              Overview
            </span>
            <h2
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1 }}
            >
              What It Is
            </h2>
          </div>

          <div
            className="flex-1 flex flex-col animate-hero-5"
            style={{ padding: 'var(--space-7)', gap: 'var(--space-5)' }}
          >
            {service.overview.map((para, i) => (
              <p
                key={i}
                className="font-body text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, maxWidth: 'var(--container-prose)' }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Includes + Who It's For ── */}
      <section className="w-full border-b border-[color:var(--color-border)] animate-hero-5">
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}
        >
          <div
            className="flex flex-col md:border-r border-[color:var(--color-border)]"
            style={{ padding: 'var(--space-7)' }}
          >
            <span
              className="block font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
            >
              Deliverables
            </span>
            <h2
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 'var(--space-6)' }}
            >
              What's Included
            </h2>
            <ul className="flex flex-col list-none m-0 p-0" style={{ gap: 'var(--space-3)' }}>
              {service.includes.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start font-body text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 1.5, borderTop: '1px solid var(--color-border-soft)', paddingTop: 'var(--space-3)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col border-t md:border-t-0 border-[color:var(--color-border)]"
            style={{ padding: 'var(--space-7)' }}
          >
            <span
              className="block font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
            >
              Fit
            </span>
            <h2
              className="font-display uppercase text-[color:var(--color-fg)]"
              style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 'var(--space-6)' }}
            >
              Who It's For
            </h2>
            <ul className="flex flex-col list-none m-0 p-0" style={{ gap: 'var(--space-3)' }}>
              {service.idealFor.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start font-body text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-body)', lineHeight: 1.5, borderTop: '1px solid var(--color-border-soft)', paddingTop: 'var(--space-3)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          className="flex flex-col md:flex-row md:items-center justify-between"
          style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7)', gap: 'var(--space-6)' }}
        >
          <div className="flex flex-col" style={{ gap: 'var(--space-3)' }}>
            <span
              className="block font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
            >
              Pricing
            </span>
            <p
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-body)', lineHeight: 1.65, maxWidth: '520px' }}
            >
              Every project is scoped individually. The starting price reflects a typical engagement — final cost depends on scope, complexity, and timeline.
            </p>
          </div>
          {service.pricingOptions ? (
            <div className="flex items-end shrink-0" style={{ gap: 'var(--space-5)' }}>
              {service.pricingOptions.map((option, i) => (
                <div
                  key={option.label}
                  className={`flex flex-col items-start md:items-end${i > 0 ? ' border-l border-[color:var(--color-border)]' : ''}`}
                  style={{ gap: 'var(--space-2)', ...(i > 0 ? { paddingLeft: 'var(--space-6)' } : {}) }}
                >
                  <span
                    className="font-display uppercase text-[color:var(--color-muted)]"
                    style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                  >
                    {option.label}
                  </span>
                  <span
                    className="font-display uppercase text-[color:var(--color-fg)]"
                    style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1 }}
                  >
                    {option.price}
                  </span>
                  {option.detail && (
                    <span
                      className="font-body text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-small)' }}
                    >
                      {option.detail}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start md:items-end shrink-0" style={{ gap: 'var(--space-2)' }}>
              <span
                className="font-display uppercase text-[color:var(--color-muted)]"
                style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
              >
                Starting At
              </span>
              <span
                className="font-display uppercase text-[color:var(--color-fg)]"
                style={{ fontSize: 'var(--text-display)', letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                {service.startingAt}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── See Also ── */}
      {service.seeAlso && (
        <section className="w-full border-b border-[color:var(--color-border)]">
          <div
            className="flex flex-col md:flex-row md:items-center justify-between"
            style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-6) var(--space-7)', gap: 'var(--space-5)' }}
          >
            <p
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-body)', lineHeight: 1.5 }}
            >
              {service.seeAlso.text}
            </p>
            <Link
              href={service.seeAlso.href}
              className="btn btn-ghost no-underline shrink-0"
              style={{ fontSize: 'var(--text-small)', padding: 'var(--space-2) var(--space-4)' }}
            >
              {service.seeAlso.label ?? 'Learn More'} ↗︎
            </Link>
          </div>
        </section>
      )}

      {/* ── Sub-services ── */}
      {service.subServices && service.subServices.length > 0 && (() => {
        const subServiceItems = service.subServices!.map((slug) => allServices.find((s) => s.slug === slug)).filter(Boolean) as typeof allServices
        return subServiceItems.length > 0 ? (
          <section className="w-full border-b border-[color:var(--color-border)]">
            <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto' }}>
              {subServiceItems.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/services/${sub.slug}`}
                  className="flex flex-col md:flex-row md:items-center justify-between no-underline group"
                  style={{
                    padding: 'var(--space-6) var(--space-7)',
                    gap: 'var(--space-5)',
                    borderBottom: '1px solid var(--color-border-soft)',
                    transition: 'background-color var(--duration-fast) var(--ease-inout)',
                  }}
                >
                  <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
                    <span
                      className="font-display uppercase text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                    >
                      Also Available
                    </span>
                    <span
                      className="font-display uppercase text-[color:var(--color-fg)]"
                      style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
                    >
                      {sub.name}
                    </span>
                    <p
                      className="font-body text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-small)', lineHeight: 1.5, maxWidth: '480px' }}
                    >
                      {sub.hook}
                    </p>
                  </div>
                  <span
                    className="font-display uppercase shrink-0 text-[color:var(--color-muted)] group-hover:text-[color:var(--color-fg)]"
                    style={{
                      fontSize: 'var(--text-label)',
                      letterSpacing: '0.08em',
                      transition: 'color var(--duration-fast) var(--ease-inout)',
                    }}
                  >
                    Learn More ↗︎
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null
      })()}

      {/* ── FAQ ── */}
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7)' }}>
          <span
            className="block font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-3)' }}
          >
            FAQ
          </span>
          <h2
            className="font-display uppercase text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 'var(--space-7)' }}
          >
            Common Questions
          </h2>
          <ServiceFAQ faqs={service.faqs} />
        </div>
      </section>

      {/* ── Also Available (À La Carte) ── */}
      {relatedAlaCarteItems.length > 0 && (
        <section className="w-full border-b border-[color:var(--color-border)]">
          <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7)' }}>
            <span
              className="block font-display uppercase text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-6)' }}
            >
              Also Available
            </span>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              {relatedAlaCarteItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group flex items-center justify-between no-underline border-b border-[color:var(--color-border)] md:odd:border-r"
                  style={{
                    padding: 'var(--space-5) var(--space-6)',
                    gap: 'var(--space-4)',
                    transition: 'background-color var(--duration-fast) var(--ease-inout)',
                  }}
                >
                  <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
                    <span
                      className="font-display uppercase text-[color:var(--color-fg)]"
                      style={{ fontSize: 'var(--text-h3)', letterSpacing: '-0.01em', lineHeight: 1 }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="font-body text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-small)', lineHeight: 1.5 }}
                    >
                      {item.hook}
                    </span>
                  </div>
                  <div className="flex items-baseline shrink-0" style={{ gap: 'var(--space-1)' }}>
                    <span
                      className="font-display uppercase text-[color:var(--color-fg)]"
                      style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1 }}
                    >
                      {item.price}
                    </span>
                    <span
                      className="font-body text-[color:var(--color-muted)]"
                      style={{ fontSize: 'var(--text-caption)' }}
                    >
                      {item.billingCycle}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related Projects ── */}
      {relatedProjects.length > 0 && (
        <section className="w-full border-b border-[color:var(--color-border)]">
          <div style={{ maxWidth: 'var(--container-max)', marginInline: 'auto', padding: 'var(--space-7)' }}>
            <div className="flex items-baseline justify-between" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="flex flex-col" style={{ gap: 'var(--space-3)' }}>
                <span
                  className="font-display uppercase text-[color:var(--color-muted)]"
                  style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em' }}
                >
                  Related Work
                </span>
                <h2
                  className="font-display uppercase text-[color:var(--color-fg)]"
                  style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1 }}
                >
                  Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="btn btn-ghost no-underline shrink-0"
                style={{ fontSize: 'var(--text-small)', padding: 'var(--space-2) var(--space-4)' }}
              >
                View All ↗︎
              </Link>
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 'var(--space-6)' }}
            >
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={{ ...project, image: undefined }} layout="vertical" maxTags={3} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />

      <div className="border-t border-[color:var(--color-border)]">
        <BlogSection />
      </div>
    </main>
  )
}

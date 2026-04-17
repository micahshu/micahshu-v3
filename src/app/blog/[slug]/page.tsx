import { notFound } from 'next/navigation'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { jsx, jsxs, Fragment } from 'react/jsx-runtime'
import type { Root } from 'hast'
import { getBlogPosts, getBlogPostBySlug } from '@/lib/content'
import Link from 'next/link'
import AuthorBio from '@/components/ui/AuthorBio'

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: 'github-light', dark: 'github-dark-dimmed' },
  keepBackground: false,
}

async function renderMarkdown(content: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, prettyCodeOptions)

  const mdastTree = processor.parse(content)
  const hastTree = await processor.run(mdastTree) as Root

  return toJsxRuntime(hastTree, {
    Fragment,
    development: false,
    jsx: jsx as Parameters<typeof toJsxRuntime>[1]['jsx'],
    jsxs: jsxs as Parameters<typeof toJsxRuntime>[1]['jsxs'],
    components: {
      h1: ({ children, ...props }) => (
        <h1
          className="font-body font-semibold text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-h1)', letterSpacing: '-0.01em', lineHeight: 1.15, marginTop: 'var(--space-8)', marginBottom: 'var(--space-4)' }}
          {...props}
        >
          {children}
        </h1>
      ),
      h2: ({ children, ...props }) => (
        <h2
          className="font-body font-semibold text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-h2)', letterSpacing: '-0.01em', lineHeight: 1.2, marginTop: 'var(--space-7)', marginBottom: 'var(--space-3)' }}
          {...props}
        >
          {children}
        </h2>
      ),
      h3: ({ children, ...props }) => (
        <h3
          className="font-body font-semibold text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-h3)', letterSpacing: '-0.01em', lineHeight: 1.3, marginTop: 'var(--space-6)', marginBottom: 'var(--space-3)' }}
          {...props}
        >
          {children}
        </h3>
      ),
      p: ({ children, ...props }) => (
        <p
          className="font-body text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, marginBottom: 'var(--space-5)' }}
          {...props}
        >
          {children}
        </p>
      ),
      a: ({ href, children, ...props }) => (
        <a
          href={href as string}
          className="text-black decoration-black underline underline-offset-2 hover:opacity-70 dark:text-white dark:decoration-white"
          style={{ transition: 'opacity var(--duration-fast) var(--ease-inout)' }}
          {...props}
        >
          {children}
        </a>
      ),
      ul: ({ children, ...props }) => (
        <ul
          className="font-body text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-5)', listStyleType: 'disc' }}
          {...props}
        >
          {children}
        </ul>
      ),
      ol: ({ children, ...props }) => (
        <ol
          className="font-body text-[color:var(--color-fg)]"
          style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, paddingLeft: 'var(--space-5)', marginBottom: 'var(--space-5)', listStyleType: 'decimal' }}
          {...props}
        >
          {children}
        </ol>
      ),
      li: ({ children, ...props }) => (
        <li style={{ marginBottom: 'var(--space-2)' }} {...props}>{children}</li>
      ),
      blockquote: ({ children, ...props }) => (
        <blockquote
          className="text-[color:var(--color-muted)] border-l-2 border-[color:var(--color-border)]"
          style={{ paddingLeft: 'var(--space-5)', marginBlock: 'var(--space-6)' }}
          {...props}
        >
          {children}
        </blockquote>
      ),
      // inline code only — block code is handled by rehype-pretty-code + CSS
      code: ({ children, className, ...props }) => {
        if (className || ('data-language' in props)) {
          return <code className={className} {...props}>{children}</code>
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
      pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
      hr: () => (
        <hr
          className="border-t border-[color:var(--color-border-soft)]"
          style={{ marginBlock: 'var(--space-7)' }}
        />
      ),
      img: ({ src, alt, ...props }) => (
        <figure style={{ marginBlock: 'var(--space-7)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src as string}
            alt={alt as string ?? ''}
            className="w-full block"
            style={{ border: '1px solid var(--color-border-soft)' }}
            {...props}
          />
          {alt && (
            <figcaption
              className="font-body text-[color:var(--color-muted)]"
              style={{ fontSize: 'var(--text-caption)', marginTop: 'var(--space-2)' }}
            >
              {alt as string}
            </figcaption>
          )}
        </figure>
      ),
      strong: ({ children, ...props }) => (
        <strong className="font-semibold text-[color:var(--color-fg)]" {...props}>{children}</strong>
      ),
      em: ({ children, ...props }) => (
        <em className="italic" {...props}>{children}</em>
      ),
    },
  })
}

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://micahshu.com/blog/${slug}`,
      type: 'article',
    },
  }
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

  const content = await renderMarkdown(post.content)

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
          {content}
        </div>
      </section>

      {/* ── Author bio ── */}
      <AuthorBio />

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

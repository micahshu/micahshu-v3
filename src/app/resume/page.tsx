import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { jsx, jsxs, Fragment } from 'react/jsx-runtime'
import type { Root } from 'hast'

export const metadata = {
  title: 'Resume — Micah Shu | Full-Stack Developer in Fort Collins, CO',
  description: 'Full-stack developer with 5 years of experience. Currently at Zero Gravity Marketing. Open to remote contract work and full-time opportunities.',
}

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
      a: ({ href, children, ...props }) => {
        if (typeof href === 'string' && href.endsWith('.pdf')) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid no-underline inline-block"
              style={{ marginBottom: 'var(--space-5)' }}
              {...props}
            >
              {children}
            </a>
          )
        }
        return (
          <a
            href={href as string}
            className="text-black decoration-black underline underline-offset-2 hover:opacity-70 dark:text-white dark:decoration-white"
            style={{ transition: 'opacity var(--duration-fast) var(--ease-inout)' }}
            {...props}
          >
            {children}
          </a>
        )
      },
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
      hr: () => (
        <hr
          className="border-t border-[color:var(--color-border-soft)]"
          style={{ marginBlock: 'var(--space-7)' }}
        />
      ),
      strong: ({ children, ...props }) => (
        <strong className="font-semibold text-[color:var(--color-fg)]" {...props}>{children}</strong>
      ),
      em: ({ children, ...props }) => (
        <em className="italic text-[color:var(--color-muted)]" {...props}>{children}</em>
      ),
      table: ({ children, ...props }) => (
        <div style={{ marginBottom: 'var(--space-5)', overflowX: 'auto' }}>
          <table
            className="w-full font-body text-[color:var(--color-fg)]"
            style={{ fontSize: 'var(--text-body)', lineHeight: 1.75, borderCollapse: 'collapse' }}
            {...props}
          >
            {children}
          </table>
        </div>
      ),
      thead: ({ children, ...props }) => (
        <thead className="border-b border-[color:var(--color-border)]" {...props}>{children}</thead>
      ),
      tbody: ({ children, ...props }) => (
        <tbody {...props}>{children}</tbody>
      ),
      tr: ({ children, ...props }) => (
        <tr className="border-b border-[color:var(--color-border-soft)]" {...props}>{children}</tr>
      ),
      th: ({ children, ...props }) => (
        <th
          className="font-semibold text-left text-[color:var(--color-fg)]"
          style={{ paddingBlock: 'var(--space-2)', paddingRight: 'var(--space-6)' }}
          {...props}
        >
          {children}
        </th>
      ),
      td: ({ children, ...props }) => (
        <td
          className="text-[color:var(--color-fg)]"
          style={{ paddingBlock: 'var(--space-2)', paddingRight: 'var(--space-6)' }}
          {...props}
        >
          {children}
        </td>
      ),
    },
  })
}

export default async function ResumePage() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'src/content/resume.md'), 'utf8')
  const { content } = matter(raw)
  const rendered = await renderMarkdown(content)

  return (
    <main id="main-content">
      <section className="w-full border-b border-[color:var(--color-border)]">
        <div
          className="container-px"
          style={{
            maxWidth: 'var(--container-prose)',
            marginInline: 'auto',
            paddingBlock: 'var(--space-9)',
          }}
        >
          {rendered}
        </div>
      </section>
    </main>
  )
}

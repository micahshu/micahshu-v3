import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from './types'

const blogDir = path.join(process.cwd(), 'src/content/blog')

function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
}

export function getBlogPosts(): Omit<BlogPost, 'content'>[] {
  const files = getMarkdownFiles(blogDir)

  return files
    .map((filename) => {
      const raw = fs.readFileSync(path.join(blogDir, filename), 'utf8')
      const { data } = matter(raw)
      return {
        title: data.title ?? '',
        slug: data.slug ?? filename.replace(/\.md$/, ''),
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        categories: data.categories ?? [],
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const files = getMarkdownFiles(blogDir)

  for (const filename of files) {
    const raw = fs.readFileSync(path.join(blogDir, filename), 'utf8')
    const { data, content } = matter(raw)
    const fileSlug = data.slug ?? filename.replace(/\.md$/, '')

    if (fileSlug === slug) {
      return {
        title: data.title ?? '',
        slug: fileSlug,
        date: data.date ?? '',
        excerpt: data.excerpt ?? '',
        content,
        categories: data.categories ?? [],
      }
    }
  }

  return null
}

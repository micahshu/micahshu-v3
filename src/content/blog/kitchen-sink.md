---
title: Kitchen Sink
slug: kitchen-sink
date: '2026-04-14'
excerpt: A test post covering every markdown element — headings, blockquotes, code, lists, and more.
categories:
  - engineering
---

This is a standard paragraph. Funnel Sans at body size, comfortable line height. **Bold text looks like this** and *italic text looks like this*. You can also combine them: ***bold and italic together***. Inline `code snippets` sit in a surface background.

## A Second-Level Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula eros vitae felis tincidunt, at dapibus nulla posuere. Cras malesuada urna nec lorem fermentum, a sodales nisi ultrices.

### A Third-Level Heading

Phasellus euismod nisl at risus facilisis, non gravida metus lacinia. Nullam congue turpis sit amet dolor lobortis, in hendrerit elit venenatis.

## Blockquotes

> Good design is as little design as possible.
> — Dieter Rams

> You can also write longer blockquotes. These are useful for pulling out a key idea from the surrounding text, or for quoting a source at length. The left border rule and muted color set it apart from the body without being loud about it.

## Lists

Unordered list:

- First item in the list
- Second item with a bit more text to show how wrapping looks at prose width
- Third item
- Fourth item — **with bold** and *italic* mixed in

Ordered list:

1. Set up the project structure
2. Define your content types in TypeScript
3. Build the data layer with `getBlogPosts()` and `getBlogPostBySlug()`
4. Wire up the page components
5. Ship it

## Inline Code and Code Blocks

You can reference a function like `getBlogPostBySlug(slug)` inline, or a token like `--color-fg`.

A fenced code block:

```
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
```

## Horizontal Rule

Content above the rule.

---

Content below the rule. Useful for separating major sections within a long post.

## A First-Level Heading in Body

Rarely used since the page title is already an h1, but it's here for completeness. Funnel Sans semibold at `--text-h1`.

## Links

You can link to [an external resource](https://developer.mozilla.org) or to [another page on the site](/blog). Links use an underline with a hover color shift.

## Images

![A placeholder image showing the layout at full prose width](https://placehold.co/720x400/E8E8E6/6B6B6B?text=Image)

The alt text renders as a caption below the image in `--text-caption` muted. Leave the alt blank if you don't want a caption — the image still renders, just without one.

## Wrapping Up

That covers the main elements you'll reach for while writing. Headings at three levels, blockquotes, unordered and ordered lists, inline code, fenced code blocks, horizontal rules, bold, italic, and links. Adjust the component styles in `src/app/blog/[slug]/page.tsx` until everything reads right.

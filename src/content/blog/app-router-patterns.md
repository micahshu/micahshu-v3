---
title: App Router Patterns Worth Keeping
slug: app-router-patterns
date: '2026-02-08'
excerpt: A few patterns from the Next.js App Router that quietly changed how I structure projects.
categories:
  - engineering
---

The App Router's mental model is different enough from Pages that the transition took a few projects to feel fluent. These are the patterns that stuck.

Layouts as shared context. Parallel routes for tabs without URL changes. Server components that read the database without an API layer in between.

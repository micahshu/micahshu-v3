---
title: Pushing Limits with React and Framer Motion
slug: react-landing-page
date: '2026-04-15'
excerpt: A conceptual landing page I built to see how far I could push React and Framer Motion. Lots of animation, lots of learning, and yes — still running on lorem ipsum.
categories:
  - case-study
  - process
projectSlug: react-landing-page
---

Not every project is for a client. This one was for me.

The [React Landing Page](/projects/react-landing-page) is a conceptual piece — no real brand, no real copy, lorem ipsum throughout. I'm not going to pretend otherwise. What it is, is a focused exercise in pushing React and Framer Motion as far as I could at the time, and I think it came out well for what it set out to be.

## The hover grid

The piece I'm most proud of is the background hover effect. The background is broken into a grid of tiny squares. Hover over it and they light up — not all at once, but in a ripple from wherever your cursor is. It's subtle enough that it doesn't get in the way, but noticeable enough that you feel it.

Getting that to feel right took a while. The challenge isn't making squares change color — that's straightforward. It's making the transition feel alive without being distracting. Playing with the timing, the easing, the falloff radius. That's the work that doesn't show up in the final product but determines whether something feels polished or cheap.

## The rest of it

The full-screen menu has a clean entrance animation — the kind where everything feels like it's arriving with intention rather than just appearing. Section transitions are scroll-triggered, which Framer Motion handles well once you understand how `useInView` and `variants` fit together. The slider is smooth, nothing flashy, just satisfying to use.

Framer Motion's variant system was the big unlock for me on this project. Instead of managing animation state manually, you define named states and let the library handle the transitions between them. Once that clicked, a lot of things got easier.

## What it actually is

It's a concept. The content is placeholder, the brand is made up, and it's a single page with no real information architecture behind it. I built it when I was earlier in my development career and some of that shows — not in the animations, but in the surrounding code quality and structure.

I still link to it because the interaction work is real, and it's a cleaner signal of what I can do with [front-end animation and component work](/services/web-development) than any description I could write. Just don't judge the lorem ipsum.

[See it live ↗](https://bloom.micahshu.com/)

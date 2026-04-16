---
title: Migrating Zero Gravity Marketing to Headless Next.js
slug: zgm-rebuild
date: '2026-04-15'
excerpt: A 150-page WordPress site built in 2012, Beaver Builder bolted on in 2017, and caching layers that broke more than they fixed — here's why I pushed for headless.
categories:
  - case-study
projectSlug: zgm-rebuild
---

The site had been running since 2012. That's not inherently a problem — a well-maintained site ages fine. This one wasn't well-maintained. Around 2017, Beaver Builder got layered on top of a custom theme to make it easier for non-technical staff to build pages. It made things easier, until it didn't.

By the time I got involved, the stack looked like this: a 12-year-old custom theme, a page builder that had accumulated years of broken shortcodes and layout fragments, and several layers of caching that were supposed to solve performance problems but mostly just broke things in harder-to-debug ways. Loading a page on the front end was slow. Opening a page in the editor was slow. Creating a new page meant fighting Beaver Builder for an hour before anything looked right.

## Why I pushed for headless

I could have rebuilt it as a [cleaner WordPress theme](/services/web-development). That would have been faster to ship and easier to hand back. But the performance problems weren't really the main issue — the main issue was that non-technical people had direct access to the front end, and they broke it. Regularly. We'd get a message about something looking wrong on the site and it almost always traced back to someone trying to edit a page in Beaver Builder and accidentally nuking a layout.

Headless solves that at the architecture level. The content editors stay in their CMS — Sanity, in this case — and they can't touch the front end. There's no template system to accidentally corrupt. The rendering is completely decoupled from the editing surface. For a marketing agency where multiple people touch the site, that's not a nice-to-have.

## The migration

150+ pages sounds like a lot to move. In practice, it came down to recognizing that most of the site was variations on the same 9 or 10 layouts — hero sections, team grids, service lists, case study pages, that kind of thing. I built those templates in Next.js and shifted content to fit rather than trying to preserve every pixel of every old layout.

For the blog, I built a [custom migration tool](/services/tooling-automation) to pull the existing posts out of WordPress and import them into Sanity. The tricky part was that the old posts weren't plain text — they had Beaver Builder blocks embedded throughout. FAQ sections, buttons, custom callouts, all mixed into the content. I wrote custom React components that matched the old Beaver Builder class names, so the migrated content would map directly to new components without having to manually rewrite every post. The class names became the contract between old and new.

I also had the agency's content team available to help rewrite or clean up copy where old pages didn't translate cleanly. On a migration this size, having that resource made a real difference.

## How it ended

Page Speed Insights went from hovering around 40 to consistently above 90. That's the difference between a site that feels fast and one that doesn't — and for a marketing agency that sells web services, that number matters.

The bigger win is flexibility. Any layout or design request is now a component in code rather than a configuration battle in a page builder. Requests that used to take hours — or weren't possible at all — are straightforward now. The content team can do their job without the ability to break anything.

It was a larger build than a typical project. But the architecture decision was the right one, and the results backed it up. You can see the full project detail on the [Zero Gravity Marketing project page](/projects/zgm-rebuild).

If you're running a WordPress site that's showing its age — slow, hard to edit, or held together by a page builder you've outgrown — [let's talk](/contact).

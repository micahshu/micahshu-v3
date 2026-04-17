---
title: How I Built a WordPress Maintenance Pipeline That Runs Itself
slug: maintenance-dashboard
date: '2026-04-16'
excerpt: Scaling WordPress maintenance across 50 clients meant building a system that could do most of the work without me.
categories:
  - case-study
projectSlug: maintenance-dashboard
---

WordPress plugin updates sound simple. Log in, click update, check the site, move on. Multiply that by 50 clients. Now do it every month. Now do it without missing anything, without breaking anything, and without spending your entire Thursday on it.

That's where this project started.

---

## The Before State

The agency I work at manages WordPress maintenance for 50+ clients. Before this tool, maintenance meant a developer sitting down for roughly an hour per client — logging into each site, running updates, spot-checking for visual regressions, hoping nothing broke. Once a month. Manually.

That's not sustainable. It's also not a good use of anyone's time.

WP Engine has a smart plugin updater. It's fine. But "fine" doesn't handle rollbacks, cross-check staging, file Asana tickets, or ping Slack when something goes wrong at 2am. I needed something that actually thought about what it was doing.

---

## The Pipeline

The full maintenance run looks like this:

```ts
type PipelineStep =
  | "slack_confirm"       // Request approval before anything runs
  | "wpe_backup"          // Snapshot production via WP Engine API
  | "staging_update"      // SSH into staging, run WP-CLI plugin updates
  | "staging_check"       // Scan for PHP errors, plugin conflicts
  | "production_update"   // If staging passes, update production
  | "production_check"    // Error check on production
  | "visual_regression"   // Ghost Inspector test suite
  | "restore_on_fail"     // Restore WPE backup if any check fails
  | "asana_ticket"        // File a ticket for manual review on failure
  | "slack_notify"        // Status update throughout

type PipelineResult = "pass" | "fail" | "restored";
```

The happy path: Slack confirmation → WP Engine backup → staging updates → staging passes → production updates → production passes → Ghost Inspector runs → done.

The failure path: anything flags an error → restore the WP Engine backup → file an Asana ticket for manual review → notify Slack. No silent failures. No "I think it worked."

This runs on a bi-weekly cycle, automatically.

---

## The Hard Parts

### Edge cases in plugin updates

Not all plugins update cleanly. Licensed plugins — ones that require a connected account or activation key — can fail in ways that look like success. WP-CLI doesn't always surface these. I had to build detection logic that caught license-related failures and handled them separately from standard update errors.

### Per-client pipeline configuration

Not every client runs the same steps. Multisite setups need different maintenance procedures than standard installs. Some clients have custom plugins that shouldn't be touched automatically.

Rather than hardcoding special cases, I built a pipeline selector system. Each client has a configured pipeline assigned to them in the dashboard. Most run the standard flow. Clients with multisite installs, staging restrictions, or plugin quirks get a pipeline built for their setup. Adding a new pipeline variant is a matter of defining the steps — not rewriting the core logic.

### Ghost Inspector at scale

Ghost Inspector was already in the toolkit. What wasn't there: any way to automatically create test suites when a new client got added to the dashboard. I built that into the onboarding flow. Add a client, a test suite spins up. No manual setup required.

---

## The Stack

- **Backend:** Node.js + TypeScript, Express, hosted on Render
- **Frontend:** Next.js + TypeScript, hosted on Vercel
- **Integrations:** WP Engine API, node-ssh + WP-CLI, Slack API, Asana API, Ghost Inspector
- **Scheduling:** Bi-weekly cron, pipeline runs triggered automatically

The dashboard gives the team visibility into run logs, client pipeline configs, and maintenance history. When something fails, you know exactly where and why before you open Asana.

---

## The After State

Maintenance for 50+ clients now runs automatically, twice a month. The team spends about 20 minutes a month reviewing results instead of executing updates.

That's not just time saved. It's a system that catches errors before they hit production, documents every run, and handles its own rollbacks. The manual version couldn't do any of that.

---

If you're building something similar — or want a tool like this for your own operation — [get in touch ↗︎](/contact).

You might also want to look at the [project page](/projects/maintenance-dashboard) or see what [custom app development](/services/app-development) looks like as a service.

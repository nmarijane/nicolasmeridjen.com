---
title: "Claude Code + SaaS: Building an AI-Native App in a Single Session"
description: "How to build a complete SaaS with Claude Code, saas-boilerplate and saas-forge. The concept of AI-native development and CLAUDE.md explained in practice."
pubDate: "2026-03-30"
heroImage: "../../../assets/2026-03-30-claude-code-saas-ia-natif.png"
tags: ["ai", "anthropic", "tools"]
---

**66% of developers** using AI agents hit the same wall: the AI produces something *roughly* right — but never completely. And fixing that last 20% takes more time than writing the code yourself. This is the "80% problem", documented in a 2026 study surveying thousands of devs.

There's a way to avoid this. It has nothing to do with better prompt wording. It's called **context engineering**.

---

## Claude Code Is #1 — But the Problem Is Context

Since its launch, Claude Code has established itself as the most popular code agent on the market. It consumes 5.5x fewer tokens than Cursor for equivalent tasks. It can read your entire codebase, modify dozens of files in parallel, run tests, and fix its own errors.

The problem isn't power. It's what happens when Claude starts coding without knowing *how* your project is organized, *why* you made certain architecture decisions, *which conventions* you follow.

It improvises. And when it improvises on a SaaS project — auth, multi-tenancy, Stripe, database — the mistakes are costly.

Martin Fowler gave a name to the discipline that solves this: **context engineering**. Not prompt engineering (choosing the right words). Context engineering — configuring the environment in which the agent works so it produces reproducible and predictable results.

The central file of this discipline? The `CLAUDE.md`.

## CLAUDE.md: The File That Changes Everything

A `CLAUDE.md` is a Markdown file that lives at the root of your project. Claude Code reads it automatically at every startup — it becomes part of the system prompt before you even write your first line.

Anthropic recommends treating it as infrastructure, not optional documentation. In 2026, it has become as essential as `.gitignore` in the Claude Code community.

So what goes in it?

- Bash commands that Claude can't guess (dev scripts, test scripts, migration scripts)
- Conventions that deviate from the standard (naming, folder structure, specific patterns)
- Architecture decisions and why you made them
- Gotchas: non-obvious behaviors, pitfalls to avoid
- Testing and review instructions

The golden rule: for each line, ask yourself "Would removing this cause Claude to make mistakes?" If not, cut it.

> A well-written `CLAUDE.md` transforms an agent that improvises into an agent that executes with precision.

But building a CLAUDE.md on a from-scratch codebase is work. And that's where the **AI-native** approach comes in.

## The AI-Native Approach: Start With Context, Don't Add It After

An **AI-native** codebase doesn't mean "coded with AI." It means it was *designed* so that AI agents understand its architecture from the very first interaction.

The practical difference: instead of building your SaaS and then writing a CLAUDE.md to document what you did, you *start* with a project where the context is already there.

That's exactly what `nmarijane/saas-boilerplate` does — an open-source Next.js 16 boilerplate with 20+ features (auth, Stripe, RBAC, API keys, webhooks, admin, onboarding...) that natively includes:

- A `CLAUDE.md` configured with the complete project architecture
- A `docs/SETUP.md` describing every feature, every environment variable, every technical decision
- PGlite for local dev — an in-memory PostgreSQL database, zero config, `npm install && npm run dev` and you're up

The project starts in under 5 minutes. And from the very first Claude Code session, the agent knows exactly where everything lives.

**Full stack:**
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Auth | Better Auth (self-hosted, orgs, RBAC) |
| Database | Drizzle ORM + PostgreSQL (PGlite local) |
| Payments | Stripe (checkout, portal, webhooks) |
| Email | React Email + Nodemailer |
| Jobs | Inngest (background tasks) |
| i18n | next-intl (en, fr) |
| Tests | Vitest + Playwright + Storybook |

## saas-forge: From Idea to Project in a Single Command

Having a good boilerplate is great. But there's still a problem: how do you adapt that boilerplate to *your* project? Which features to keep, which to remove? How to generate your business data models, your pages, your logic?

That's the problem `saas-forge` solves — a Claude Code plugin that handles all of this.

```bash
# Installation (one time only)
npx skills add nmarijane/saas-forge

# Create your SaaS
/saas-forge:saas A project management tool for freelancers
```

What saas-forge does under the hood, in 3 phases:

**Phase 1 — Interactive brainstorming**
It clarifies your idea with you: concept, target users, value proposition. It designs the data model (Drizzle schemas), maps user flows and pages, and presents the boilerplate features with a keep/remove recommendation tailored to your project.

**Phase 2 — Automatic scaffolding**
A builder agent dispatched as a sub-agent clones the boilerplate, cleanly removes unused features, generates your business models, queries, server actions, components, and routes. It verifies that TypeScript and lint pass before handing back control.

**Phase 3 — Handover**
It delivers a summary: what was created, what was kept, what was removed. The environment variables to configure. The recommended next steps.

Result: you don't spend 2 hours reading docs, deleting code you don't understand, and hoping you didn't break anything. You describe your app and jump straight into coding what makes it unique.

## Why This Is a Game-Changer for Solo Founders

The real impact isn't the speed of setup (though `npm run dev` in 5 minutes is nice). It's the **reproducibility**.

In an AI-native workflow with Claude Code:

1. You open a Claude Code session in the repo
2. Claude reads the CLAUDE.md — it immediately knows how the project is structured
3. You ask it to add a feature → it generates exactly in the right folders, with the right patterns, the right tests
4. You review, you push

No surprises. No improvising on the architecture. No files generated in the wrong place.

This is what the Everything Claude Code community (100k+ stars on GitHub) calls a "repeatable, auditable workflow" — the evolution of AI agents from ad hoc usage toward structured, predictable systems.

The difference between vibe coding and AI-native engineering is precisely this: vibe coding works for a prototype in 30 minutes. AI-native works for a product you'll maintain for years.

## Limitations to Be Aware Of

The AI-native approach with Claude Code isn't magic. A few things to keep in mind:

**Context fills up fast.** Claude Code works within a context window. An intense debugging session can saturate it, and performance degrades. You need to learn to open new sessions for distinct tasks, and to use `.claudeignore` to exclude node_modules and build artifacts.

**saas-forge is an opinionated tool.** The stack (Next.js, Better Auth, Drizzle, Stripe) is fixed. If your project requires a different stack, you use the boilerplate directly or build your own.

**The CLAUDE.md must be maintained.** Like all documentation, it degrades over time if you don't keep it up to date. Best practice: treat CLAUDE.md changes like code changes — they go through review, they're versioned, they document important decisions.

**The 80% problem persists for complex cases.** An AI-native agent with excellent context drastically reduces common errors. But for truly complex features — dynamic pricing algorithms, dense business logic, complex third-party API integrations — you're still the best dev in the session.

---

**Key takeaways:**

- **Context engineering > prompt engineering** — a good CLAUDE.md transforms an agent that improvises into one that executes predictably
- **AI-native means designing for agents from the start**, not documenting after the fact — it's the difference between a maintainable project and a throwaway prototype
- **saas-boilerplate + saas-forge** = the combo for launching a complete SaaS with Claude Code without manual setup, jumping straight into your business logic
- **Vibe coding is for prototypes, AI-native is for products** — choose your approach based on the project's time horizon

---

## Frequently Asked Questions About Claude Code and AI-Native SaaS

**Is CLAUDE.md enough for Claude Code to understand my project?**
CLAUDE.md is necessary but not sufficient on a large project. You need to complement it with modular documentation files (which CLAUDE.md can reference via `@docs/architecture.md`), and use `.claudeignore` to keep irrelevant files from polluting the context.

**Is saas-boilerplate suitable for a production project?**
Yes — the stack (Next.js 16, Better Auth, Drizzle, Stripe) is production-ready. The project includes GitHub Actions CI/CD, Dependabot, Playwright E2E tests, and automatic Claude Code Review on PRs. Dozens of teams are using it in production.

**What's the difference between Claude Code and Cursor for this type of workflow?**
Claude Code is an agent that works in the terminal and has access to the entire project (files, commands, git). Cursor is an editor with AI completion. For scaffolding and multi-file modifications, Claude Code is generally more efficient and consumes 5.5x fewer tokens. Cursor remains relevant for in-line editing and interactive exploration.

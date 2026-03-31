---
title: "Claude Code's source code just leaked — here's what's inside"
description: "512,000 lines of TypeScript exposed via an npm source map. Architecture, hidden features, and security lessons from the Anthropic leak."
pubDate: "2026-03-31"
heroImage: "../../../assets/2026-03-31-claude-code-source-leak-npm-anthropic.png"
tags: ["anthropic", "open-source", "cybersecurity"]
---

1,900 TypeScript files. 512,000 lines of code. 40 built-in tools. 50 slash commands. The **complete** source code of Claude Code — Anthropic's flagship AI development tool — just leaked publicly. Not because of a sophisticated hack. Because of a `.map` file left behind in an npm package.

On March 31, 2026, security researcher Chaofan Shou discovered that the Claude Code npm package contained a source map pointing to an R2 storage bucket holding the entire unobfuscated source code. Within hours, a GitHub repository archiving the code had surpassed 1,100 stars and 1,900 forks.

The irony is brutal: a tool designed to help developers write better code was betrayed by a build configuration mistake.

---

## How it happened: the packaging blunder

Source maps are debugging files. They link minified or bundled code back to the original source. They're essential during development — and have absolutely no business being in production.

Specifically, a `.map` file in the Claude Code npm package contained a reference to a Cloudflare R2 bucket where the original TypeScript source was stored. Anyone installing the package could follow that link and access the entire codebase.

The root cause is mundane: a misconfigured `.npmignore` or `files` field in `package.json`. One field. One oversight. And 512,000 lines of proprietary code go public.

Anthropic quickly pushed an update to remove the source maps and deleted prior versions from the npm registry. But the damage was done — the code had already been archived on GitHub.

## What's inside: Claude Code's architecture

Beyond the security incident, the contents of the leak are fascinating for anyone interested in AI tooling architecture. Here's what we find.

### A modular tool system (~40 tools)

Claude Code isn't a wrapper around an API. It's a plugin-architecture system. Each capability — file reading, bash execution, web fetching, LSP integration — is a discrete tool with its own permission system. The tool system's foundation alone accounts for **29,000 lines of TypeScript**.

```typescript
// Simplified tool system architecture
interface Tool {
  name: string;
  permissions: PermissionGate;
  execute(context: ToolContext): Promise<ToolResult>;
}

// ~40 tools: Read, Write, Edit, Bash, Grep,
// Glob, WebFetch, Agent, LSP, MCP...
```

### The query engine (46,000 lines)

This is the brain of the operation. It handles all LLM API calls, streaming, caching, and orchestration. It's the largest module in the codebase by far — 46,000 lines just for communication with the Claude models.

### Multi-agent orchestration

Claude Code can spawn **sub-agents** — internally called "swarms" — to handle complex, parallelizable tasks. Each agent runs in its own context with specific permissions. That's how Claude Code manages workflows on massive codebases: it delegates and coordinates.

### The bidirectional IDE bridge

A bidirectional communication system connects IDE extensions (VS Code, JetBrains) to the CLI through JWT-authenticated channels. This is what powers the "Claude in your editor" experience — the CLI and IDE extension share the same context in real time.

### Persistent memory

A file-based system where Claude stores context about you, your project, and your preferences across sessions. This is what allows Claude Code to "remember" your architecture, conventions, and code patterns.

### Hidden features

The code reveals undocumented features, including a mysterious **"Kairos mode"** that nobody knew existed. Internal feature flags, non-public endpoints, and hints about Anthropic's product roadmap are also visible in the code.

## Technical choices that raise eyebrows

Several architecture decisions stand out:

| Choice | Detail |
|---|---|
| **Bun instead of Node** | Faster startup, native dead code elimination for feature flags |
| **React for the terminal** | Uses Ink (React for CLI) — the terminal interface is component-based with state management |
| **Zod v4 everywhere** | Schema validation on every tool input, every API response, every config file |
| **Lazy-loading** | Heavy dependencies (OpenTelemetry, gRPC) are loaded on demand to keep startup fast |

Using React for a CLI interface is a bold choice. It means Claude Code's terminal UI works exactly like a web app: components, state, re-renders. It's sophisticated — and it explains why the experience feels so smooth.

## Context: second leak in five days

This isn't an isolated incident for Anthropic. On March 26 — five days earlier — a CMS misconfiguration had already exposed details about the unannounced **"Claude Mythos"** model (codename Capybara), blog post drafts, and roughly 3,000 unpublished assets.

Two major leaks in five days, both caused by configuration errors. Not sophisticated attacks. Human oversights.

For a company that builds tools requiring access to your filesystem, terminal, and codebases, these operational security failures raise legitimate trust concerns.

## Same day as axios: npm in crisis

The timing is striking. The Claude Code leak dropped **on the same day** as the supply chain attack on axios — the most downloaded npm package in the world, compromised via a hijacked maintainer account that deployed a cross-platform RAT.

Two major npm incidents on the same day. One accidental (Claude Code), one malicious (axios). Both expose the same reality: **the npm ecosystem is structurally fragile**. A misexcluded file, a poorly secured account — and the consequences potentially reach millions of developers.

In 2025, **454,000 malicious packages** were published to npm. The average project pulls in 79 transitive dependencies. Every `npm install` is an implicit act of trust in dozens of individual maintainers.

## Community reactions

On Hacker News, reactions are split:

The **pragmatists** put things in perspective: *"The slot machine's source code isn't relevant to the casino director"* — what matters is the model, not the client. Claude Code's source is interesting but doesn't give access to Anthropic's secret sauce (the model weights).

The **concerned** see a red flag: *"A company you trust with access to your code can't secure its own."* If Anthropic can't configure an `.npmignore`, how much confidence should you have in their internal security processes?

The **engineers** are thrilled: the code is a goldmine for understanding how to build production-grade AI tools. The plugin architecture, permission systems, multi-agent orchestration — it's all first-rate study material.

## What you should actually do

If you publish npm packages — or if you use Claude Code:

**For package maintainers:**
- `npm pack --dry-run` **before every publish** to verify what's included
- Use a **whitelist** approach in the `files` field of `package.json` rather than an `.npmignore`
- **Never** include `.map` files unless you have an explicit reason
- Automate the check in your CI/CD — one more check in the pipeline can prevent a disaster

**For Claude Code users:**
- Don't panic — this leak doesn't compromise your data or API keys
- The exposed code is the CLI client, not Anthropic's models or backend infrastructure
- Update to the latest version, which no longer includes the source maps

---

**Key takeaways:**

- **512,000 lines of Claude Code source leaked** via a forgotten source map in the npm package — a build configuration error
- **The revealed architecture is impressive** — 40 tools, multi-agent orchestration, bidirectional IDE bridge, persistent memory, all built on TypeScript/Bun/React
- **This is Anthropic's second leak in 5 days** — following the Claude Mythos leak, a concerning pattern of operational negligence
- **The npm ecosystem is in crisis** — on the same day, axios was compromised by a RAT, showing the JavaScript supply chain remains dangerously fragile

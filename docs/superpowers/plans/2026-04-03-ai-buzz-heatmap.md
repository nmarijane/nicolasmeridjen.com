# AI Buzz Heatmap Sidebar — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a daily "AI Buzz" sidebar widget to the blog homepage showing AI model mention rankings with source links.

**Architecture:** A new `AiBuzzSidebar.astro` component reads a static `ai-buzz.json` data file at build time. The homepage layout switches from single-column to 2-column (feed + sticky sidebar). The data file is maintained by the openclaw agent via regular commits.

**Tech Stack:** Astro 6, pure CSS (no chart library), existing i18n system.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/data/ai-buzz.json` | Create | Sample data file — will be overwritten by openclaw agent |
| `src/components/AiBuzzSidebar.astro` | Create | Sidebar widget: reads JSON, renders ranked bars with source links |
| `src/pages/[lang]/index.astro` | Modify | 2-column layout, import & render sidebar component |
| `src/styles/global.css` | Modify | Add `--max-width-wide` CSS variable for 2-column pages |
| `src/i18n/translations.ts` | Modify | Add `buzz.title` and `buzz.updated` keys (fr/en) |

---

### Task 1: Create the data file with sample data

**Files:**
- Create: `src/data/ai-buzz.json`

- [ ] **Step 1: Create `src/data/` directory and data file**

```json
{
  "date": "2026-04-03",
  "models": [
    {
      "name": "Claude Opus 4.6",
      "mentions": 142,
      "sources": [
        { "label": "@karpathy", "url": "https://x.com/karpathy/status/example1" },
        { "label": "TechCrunch", "url": "https://techcrunch.com/example1" },
        { "label": "r/MachineLearning", "url": "https://reddit.com/r/MachineLearning/example1" }
      ]
    },
    {
      "name": "GPT-5",
      "mentions": 98,
      "sources": [
        { "label": "@sama", "url": "https://x.com/sama/status/example2" },
        { "label": "r/LocalLLaMA", "url": "https://reddit.com/r/LocalLLaMA/example2" }
      ]
    },
    {
      "name": "Gemini 2.5 Pro",
      "mentions": 61,
      "sources": [
        { "label": "@JeffDean", "url": "https://x.com/JeffDean/status/example3" },
        { "label": "The Verge", "url": "https://theverge.com/example3" }
      ]
    },
    {
      "name": "Llama 4",
      "mentions": 34,
      "sources": [
        { "label": "Hacker News", "url": "https://news.ycombinator.com/item?id=example4" }
      ]
    },
    {
      "name": "Mistral Large 3",
      "mentions": 12,
      "sources": [
        { "label": "@arthurmensch", "url": "https://x.com/arthurmensch/status/example5" }
      ]
    }
  ]
}
```

- [ ] **Step 2: Verify the file is valid JSON**

Run: `cd /root/repos/nicolasmeridjen.com && node -e "JSON.parse(require('fs').readFileSync('src/data/ai-buzz.json','utf8')); console.log('Valid JSON')"`
Expected: `Valid JSON`

- [ ] **Step 3: Commit**

```bash
git add src/data/ai-buzz.json
git commit -m "feat: add sample ai-buzz.json data file"
```

---

### Task 2: Add i18n translation keys

**Files:**
- Modify: `src/i18n/translations.ts`

- [ ] **Step 1: Add French keys**

Add these entries to the `fr` object, after the `'home.empty'` line:

```typescript
'buzz.title': 'AI Buzz du jour',
'buzz.updated': 'Mis à jour le',
```

- [ ] **Step 2: Add English keys**

Add these entries to the `en` object, after the `'home.empty'` line:

```typescript
'buzz.title': "Today's AI Buzz",
'buzz.updated': 'Updated on',
```

- [ ] **Step 3: Verify build**

Run: `cd /root/repos/nicolasmeridjen.com && npx astro check 2>&1 | tail -5`
Expected: No TypeScript errors related to translations.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add i18n keys for AI Buzz sidebar"
```

---

### Task 3: Create the AiBuzzSidebar component

**Files:**
- Create: `src/components/AiBuzzSidebar.astro`

- [ ] **Step 1: Create the component**

```astro
---
import { t, type Lang } from '../i18n/translations';

interface Props {
  lang: Lang;
}

interface Source {
  label: string;
  url: string;
}

interface Model {
  name: string;
  mentions: number;
  sources: Source[];
}

interface BuzzData {
  date: string;
  models: Model[];
}

const { lang } = Astro.props;

let buzzData: BuzzData | null = null;
try {
  const raw = await import('../data/ai-buzz.json');
  buzzData = raw.default as BuzzData;
} catch {
  buzzData = null;
}

const MAX_MODELS = 8;
const MAX_SOURCES_SHOWN = 3;

const models = buzzData?.models?.slice(0, MAX_MODELS) ?? [];
const maxMentions = models[0]?.mentions ?? 1;
---

{models.length > 0 && (
  <aside class="buzz-sidebar">
    <div class="buzz-header">
      <span class="buzz-title">{t(lang, 'buzz.title')}</span>
      {buzzData?.date && (
        <span class="buzz-date">{buzzData.date}</span>
      )}
    </div>
    <div class="buzz-divider"></div>

    <div class="buzz-list">
      {models.map((model, i) => {
        const ratio = model.mentions / maxMentions;
        const widthPct = Math.max(ratio * 100, 4);
        // Interpolate green: dark (#1a8917) for top → light (#c8ecc7) for bottom
        const r = Math.round(26 + (200 - 26) * (1 - ratio));
        const g = Math.round(137 + (236 - 137) * (1 - ratio));
        const b = Math.round(23 + (199 - 23) * (1 - ratio));
        const barColor = `rgb(${r}, ${g}, ${b})`;
        const barColorDark = `rgb(${Math.round(r * 0.7)}, ${Math.round(g * 0.7)}, ${Math.round(b * 0.7)})`;
        const shownSources = model.sources.slice(0, MAX_SOURCES_SHOWN);
        const remainingCount = model.sources.length > MAX_SOURCES_SHOWN
          ? model.mentions - shownSources.length
          : model.mentions - model.sources.length;

        return (
          <div class="buzz-model">
            <div class="buzz-model-header">
              <span class="buzz-model-name">{model.name}</span>
              <span class="buzz-model-count" style={`color: ${barColor}`}>
                {model.mentions} mentions
              </span>
            </div>
            <div class="buzz-bar-track">
              <div
                class="buzz-bar-fill"
                style={`width: ${widthPct}%; background: linear-gradient(90deg, ${barColor}, ${barColorDark})`}
              ></div>
            </div>
            {shownSources.length > 0 && (
              <div class="buzz-sources">
                {shownSources.map((source) => (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" class="buzz-source-tag">
                    {source.label}
                  </a>
                ))}
                {remainingCount > 0 && (
                  <span class="buzz-source-more">+{remainingCount}</span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </aside>
)}

<style>
  .buzz-sidebar {
    padding: 1.5em;
    background: var(--color-surface);
    border-radius: 8px;
    position: sticky;
    top: 2em;
  }
  .buzz-header {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }
  .buzz-title {
    font-family: var(--font-sans);
    font-size: 0.7em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-secondary);
  }
  .buzz-date {
    font-family: var(--font-sans);
    font-size: 0.65em;
    color: #aaa;
  }
  .buzz-divider {
    height: 1px;
    background: var(--color-border);
    margin: 0.6em 0 1em;
  }
  .buzz-list {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .buzz-model-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.3em;
  }
  .buzz-model-name {
    font-family: var(--font-sans);
    font-size: 0.85em;
    font-weight: 600;
    color: var(--color-text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 60%;
  }
  .buzz-model-count {
    font-family: var(--font-sans);
    font-size: 0.7em;
    font-weight: 600;
    flex-shrink: 0;
  }
  .buzz-bar-track {
    height: 8px;
    background: var(--color-border);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.4em;
  }
  .buzz-bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  .buzz-sources {
    display: flex;
    gap: 0.4em;
    flex-wrap: wrap;
  }
  .buzz-source-tag {
    font-family: var(--font-sans);
    font-size: 0.65em;
    color: var(--color-accent);
    text-decoration: none;
    background: #e8f5e8;
    padding: 0.15em 0.5em;
    border-radius: 3px;
    transition: background 0.15s;
  }
  .buzz-source-tag:hover {
    background: #d0eed0;
  }
  .buzz-source-more {
    font-family: var(--font-sans);
    font-size: 0.65em;
    color: var(--color-text-secondary);
    background: #f0f0f0;
    padding: 0.15em 0.5em;
    border-radius: 3px;
  }
</style>
```

- [ ] **Step 2: Verify build compiles**

Run: `cd /root/repos/nicolasmeridjen.com && npx astro build 2>&1 | tail -10`
Expected: Build completes without errors (component isn't used yet, but should compile).

- [ ] **Step 3: Commit**

```bash
git add src/components/AiBuzzSidebar.astro
git commit -m "feat: create AiBuzzSidebar component"
```

---

### Task 4: Add `--max-width-wide` CSS variable

**Files:**
- Modify: `src/styles/global.css:1-12`

- [ ] **Step 1: Add the wide max-width variable**

In `src/styles/global.css`, add `--max-width-wide` to the `:root` block:

```css
--max-width: 780px;
--max-width-wide: 1080px;
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add --max-width-wide CSS variable"
```

---

### Task 5: Modify homepage to 2-column layout with sidebar

**Files:**
- Modify: `src/pages/[lang]/index.astro`

- [ ] **Step 1: Add the import**

At the top of the frontmatter block (after the other imports), add:

```astro
import AiBuzzSidebar from '../../components/AiBuzzSidebar.astro';
```

Also import the data to conditionally enable the 2-column layout:

```typescript
let hasBuzzData = false;
try {
  const raw = await import('../../data/ai-buzz.json');
  hasBuzzData = (raw.default as any)?.models?.length > 0;
} catch {
  hasBuzzData = false;
}
```

- [ ] **Step 2: Wrap the posts section in a 2-column layout**

Replace the `<section class="posts">...</section>` block with:

```astro
<div class:list={["homepage-content", { "has-sidebar": hasBuzzData }]}>
  <section class="posts">
    {posts.map((post) => {
      const slug = post.id.replace(`${lang}/`, '');
      return (
        <article class="post-card">
          <a href={`/${lang}/blog/${slug}/`}>
            <div class="post-content">
              <div class="post-meta">
                <FormattedDate date={post.data.pubDate} lang={lang} />
                {post.data.audioFile && <span class="audio-badge">{t(lang, 'audio.badge')}</span>}
              </div>
              <h2>{post.data.title}</h2>
              <p class="post-description">{post.data.description}</p>
            </div>
            {post.data.heroImage && (
              <div class="post-image">
                <Image width={280} height={180} src={post.data.heroImage} alt="" />
              </div>
            )}
          </a>
        </article>
      );
    })}
  </section>

  {hasBuzzData && (
    <aside class="sidebar">
      <AiBuzzSidebar lang={lang} />
    </aside>
  )}
</div>
```

- [ ] **Step 3: Add the 2-column CSS**

In the `<style>` block of `index.astro`, add these styles:

```css
.homepage-content {
  display: flex;
  flex-direction: column;
}
.homepage-content.has-sidebar {
  flex-direction: row;
  gap: 2em;
}
.homepage-content.has-sidebar .posts {
  flex: 1;
  min-width: 0;
}
.sidebar {
  width: 280px;
  flex-shrink: 0;
}
@media (max-width: 720px) {
  .homepage-content.has-sidebar {
    flex-direction: column-reverse;
  }
  .sidebar {
    width: 100%;
  }
}
```

- [ ] **Step 4: Override main max-width for this page**

Add a scoped style to widen `main` when the sidebar is present:

```css
:global(main):has(.has-sidebar) {
  max-width: var(--max-width-wide);
}
```

If `:has()` causes issues with Astro's scoped CSS, the alternative is to add a `<style is:global>` block:

```html
<style is:global>
  body:has(.has-sidebar) main {
    max-width: var(--max-width-wide);
  }
</style>
```

- [ ] **Step 5: Build and visually verify**

Run: `cd /root/repos/nicolasmeridjen.com && npx astro build 2>&1 | tail -10`
Expected: Build succeeds with no errors.

Run: `cd /root/repos/nicolasmeridjen.com && npx astro dev --port 4321 &`
Then open `http://localhost:4321/fr/` and verify:
- 2-column layout visible
- Sidebar shows 5 models with green gradient bars
- Source tags are displayed and clickable
- Resize to mobile: sidebar moves above feed

- [ ] **Step 6: Commit**

```bash
git add src/pages/\[lang\]/index.astro
git commit -m "feat: add AI Buzz sidebar to homepage with 2-column layout"
```

---

### Task 6: Final build verification and cleanup

- [ ] **Step 1: Full production build**

Run: `cd /root/repos/nicolasmeridjen.com && npx astro build 2>&1`
Expected: Build completes for both `/fr/` and `/en/` routes, no warnings.

- [ ] **Step 2: Verify fallback when data file is empty**

Temporarily rename the data file and rebuild:

```bash
cd /root/repos/nicolasmeridjen.com
mv src/data/ai-buzz.json src/data/ai-buzz.json.bak
npx astro build 2>&1 | tail -5
mv src/data/ai-buzz.json.bak src/data/ai-buzz.json
```

Expected: Build succeeds, homepage falls back to single-column layout (no sidebar).

- [ ] **Step 3: Commit any final adjustments**

If any fixes were needed, commit them:

```bash
git add -A
git commit -m "fix: final adjustments for AI Buzz sidebar"
```

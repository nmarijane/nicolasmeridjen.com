# Blog Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 6 features to the blog: i18n (FR/EN), reading progress bar, share buttons, related articles, SEO catchphrases, and reduced font size.

**Architecture:** Native Astro i18n with `/[lang]/` route prefix, vanilla JS for interactive features, no new dependencies. Content restructured into `content/blog/fr/` and `content/blog/en/` subdirectories.

**Tech Stack:** Astro 6, TypeScript, vanilla CSS/JS, Zod schemas.

---

## Task 1: Reduce font size

**Files:**
- Modify: `src/styles/global.css:24` and `src/styles/global.css:157`

- [ ] **Step 1: Update desktop font size**

In `src/styles/global.css`, change the body font-size from 20px to 18px:

```css
body {
	font-family: var(--font-serif);
	margin: 0;
	padding: 0;
	background: var(--color-bg);
	color: var(--color-text);
	font-size: 18px;
	line-height: 1.8;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 2: Update mobile font size**

In the `@media (max-width: 720px)` block, change body font-size from 18px to 16px:

```css
@media (max-width: 720px) {
	body {
		font-size: 16px;
	}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css
git commit -m "style: reduce body font size to 18px desktop / 16px mobile"
```

---

## Task 2: Update content schema (tags, catchStart, catchEnd)

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: Add new fields to the Zod schema**

In `src/content.config.ts`, add `tags`, `catchStart`, and `catchEnd` to the schema:

```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			audioFile: z.string().optional(),
			tags: z.array(z.string()).default([]),
			catchStart: z.string().optional(),
			catchEnd: z.string().optional(),
		}),
});

export const collections = { blog };
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Existing posts without tags/catchStart/catchEnd still compile (defaults apply).

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: add tags, catchStart, catchEnd fields to blog schema"
```

---

## Task 3: Create i18n translation system

**Files:**
- Create: `src/i18n/translations.ts`
- Create: `src/i18n/utils.ts`

- [ ] **Step 1: Create translations file**

Create `src/i18n/translations.ts`:

```typescript
export const languages = {
	fr: 'Français',
	en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const translations: Record<Lang, Record<string, string>> = {
	fr: {
		'site.title': 'Nicolas Meridjen',
		'site.description': "Articles sur l'intelligence artificielle, la recherche en IA et l'impact sur les métiers.",
		'nav.articles': 'Articles',
		'nav.about': 'À propos',
		'home.title': 'IA, recherche & impact sur les métiers',
		'home.subtitle': "Analyses accessibles sur l'intelligence artificielle, les dernières avancées et ce que ça change concrètement.",
		'home.empty': 'Les premiers articles arrivent bientôt.',
		'audio.badge': 'Audio',
		'audio.listen': 'Écouter cet article',
		'article.updated': 'Mis à jour le',
		'share.twitter': 'Partager',
		'share.linkedin': 'Partager',
		'share.copy': 'Copier le lien',
		'share.copied': 'Copié !',
		'related.title': 'Articles similaires',
		'about.title': 'À propos',
		'about.meta.title': 'À propos — Nicolas Meridjen',
		'about.meta.description': "Ingénieur logiciel et IA, passionné par l'intelligence artificielle et son impact sur nos métiers.",
		'about.bio.1': "Je suis Nicolas, ingénieur logiciel avec plus de 14 ans d'expérience, spécialisé dans les écosystèmes TypeScript modernes et l'ingénierie IA.",
		'about.bio.2': "Au quotidien, j'intègre des workflows de développement assistés par IA — du coding agentique à l'orchestration multi-agents — pour accélérer la livraison et résoudre des problèmes complexes plus rapidement.",
		'about.bio.3': "Ce blog est mon espace pour explorer et vulgariser l'intelligence artificielle : les dernières avancées, les outils qui changent la donne, et l'impact concret sur nos façons de travailler.",
	},
	en: {
		'site.title': 'Nicolas Meridjen',
		'site.description': 'Articles on artificial intelligence, AI research, and its impact on the industry.',
		'nav.articles': 'Articles',
		'nav.about': 'About',
		'home.title': 'AI, Research & Industry Impact',
		'home.subtitle': 'Accessible analyses on artificial intelligence, the latest advances, and what it concretely changes.',
		'home.empty': 'First articles coming soon.',
		'audio.badge': 'Audio',
		'audio.listen': 'Listen to this article',
		'article.updated': 'Updated on',
		'share.twitter': 'Share',
		'share.linkedin': 'Share',
		'share.copy': 'Copy link',
		'share.copied': 'Copied!',
		'related.title': 'Related articles',
		'about.title': 'About',
		'about.meta.title': 'About — Nicolas Meridjen',
		'about.meta.description': 'Software and AI engineer, passionate about artificial intelligence and its impact on the industry.',
		'about.bio.1': "I'm Nicolas, a software engineer with 14+ years of experience, specialized in modern TypeScript ecosystems and AI engineering.",
		'about.bio.2': 'I integrate AI-assisted development workflows daily — from agentic coding to multi-agent orchestration — to accelerate delivery and solve complex problems faster.',
		'about.bio.3': 'This blog is my space to explore and explain artificial intelligence: the latest advances, game-changing tools, and the concrete impact on how we work.',
	},
};

export function t(lang: Lang, key: string): string {
	return translations[lang]?.[key] ?? translations[defaultLang]?.[key] ?? key;
}
```

- [ ] **Step 2: Create i18n utilities**

Create `src/i18n/utils.ts`:

```typescript
import { languages, defaultLang, type Lang } from './translations';

export function getLangFromUrl(url: URL): Lang {
	const [, lang] = url.pathname.split('/');
	if (lang in languages) return lang as Lang;
	return defaultLang;
}

export function getLocaleDateFormat(lang: Lang): string {
	return lang === 'fr' ? 'fr-FR' : 'en-US';
}

export function getLangPrefix(lang: Lang): string {
	return `/${lang}`;
}

export function getAlternateLang(lang: Lang): Lang {
	return lang === 'fr' ? 'en' : 'fr';
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: Build succeeds (new files are not yet imported anywhere).

- [ ] **Step 4: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n translation system with FR/EN support"
```

---

## Task 4: Migrate content to language subdirectories

**Files:**
- Move: all files from `src/content/blog/*.md` → `src/content/blog/fr/*.md`

- [ ] **Step 1: Create fr subdirectory and move files**

```bash
mkdir -p src/content/blog/fr
mv src/content/blog/*.md src/content/blog/fr/
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds. The glob loader pattern `**/*.{md,mdx}` already picks up files in subdirectories. Post IDs will now be prefixed with `fr/` (e.g., `fr/2026-03-26-mars-2026-mois-ia-change-vitesse`).

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/
git commit -m "feat: move blog content into fr/ subdirectory for i18n"
```

---

## Task 5: Update FormattedDate to support lang prop

**Files:**
- Modify: `src/components/FormattedDate.astro`

- [ ] **Step 1: Add lang prop**

Replace the entire content of `src/components/FormattedDate.astro`:

```astro
---
import type { Lang } from '../i18n/translations';
import { getLocaleDateFormat } from '../i18n/utils';

interface Props {
	date: Date;
	lang?: Lang;
}

const { date, lang = 'fr' } = Astro.props;
const locale = getLocaleDateFormat(lang);
---

<time datetime={date.toISOString()}>
	{
		date.toLocaleDateString(locale, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}
</time>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Default lang='fr' maintains backward compatibility.

- [ ] **Step 3: Commit**

```bash
git add src/components/FormattedDate.astro
git commit -m "feat: add lang prop to FormattedDate component"
```

---

## Task 6: Update Header with lang prop and language toggle

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Rewrite Header with i18n support**

Replace the entire content of `src/components/Header.astro`:

```astro
---
import { type Lang, t } from '../i18n/translations';
import { getAlternateLang, getLangPrefix } from '../i18n/utils';

interface Props {
	lang?: Lang;
}

const { lang = 'fr' } = Astro.props;
const altLang = getAlternateLang(lang);
const prefix = getLangPrefix(lang);
---

<header>
	<nav>
		<a href={`${prefix}/`} class="site-title">{t(lang, 'site.title')}</a>
		<div class="nav-links">
			<a href={`${prefix}/`}>{t(lang, 'nav.articles')}</a>
			<a href={`${prefix}/about/`}>{t(lang, 'nav.about')}</a>
			<a href={`/${altLang}/`} class="lang-toggle">{altLang.toUpperCase()}</a>
		</div>
	</nav>
</header>
<style>
	header {
		border-bottom: 1px solid var(--color-border);
		background: var(--color-bg);
	}
	nav {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 1.2em 1em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.site-title {
		font-family: var(--font-sans);
		font-weight: 700;
		font-size: 1.1em;
		text-decoration: none;
		color: var(--color-text);
		letter-spacing: -0.02em;
	}
	.nav-links {
		display: flex;
		gap: 1.5em;
		align-items: center;
	}
	.nav-links a {
		font-family: var(--font-sans);
		font-size: 0.9em;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color 0.15s;
	}
	.nav-links a:hover {
		color: var(--color-text);
	}
	.lang-toggle {
		font-weight: 600;
		font-size: 0.8em !important;
		padding: 0.2em 0.5em;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		letter-spacing: 0.03em;
	}
	.lang-toggle:hover {
		border-color: var(--color-text-secondary);
	}
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add language toggle and i18n support to Header"
```

---

## Task 7: Update Footer with lang prop

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Rewrite Footer with i18n support**

Replace the entire content of `src/components/Footer.astro`:

```astro
---
import type { Lang } from '../i18n/translations';

interface Props {
	lang?: Lang;
}

const { lang = 'fr' } = Astro.props;
const today = new Date();
---

<footer>
	<div class="footer-content">
		<p>&copy; {today.getFullYear()} Nicolas Meridjen</p>
		<div class="footer-links">
			<a href="https://nicolasmeridjen.com" target="_blank">Portfolio</a>
			<a href="https://github.com/nmarijane" target="_blank">GitHub</a>
			<a href="/rss.xml">RSS</a>
		</div>
	</div>
</footer>
<style>
	footer {
		border-top: 1px solid var(--color-border);
		margin-top: 4em;
	}
	.footer-content {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 2em 1em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: var(--font-sans);
		font-size: 0.85em;
		color: var(--color-text-secondary);
	}
	.footer-content p {
		margin: 0;
	}
	.footer-links {
		display: flex;
		gap: 1.5em;
	}
	.footer-links a {
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: color 0.15s;
	}
	.footer-links a:hover {
		color: var(--color-text);
	}
	@media (max-width: 720px) {
		.footer-content {
			flex-direction: column;
			gap: 1em;
			text-align: center;
		}
	}
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add lang prop to Footer component"
```

---

## Task 8: Update BaseHead with hreflang support

**Files:**
- Modify: `src/components/BaseHead.astro`

- [ ] **Step 1: Add hreflang and lang prop**

Replace the entire content of `src/components/BaseHead.astro`:

```astro
---
import '../styles/global.css';
import type { ImageMetadata } from 'astro';
import { type Lang, t } from '../i18n/translations';
import { getAlternateLang } from '../i18n/utils';

interface Props {
	title: string;
	description: string;
	image?: ImageMetadata;
	lang?: Lang;
}

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const { title, description, image, lang = 'fr' } = Astro.props;

const altLang = getAlternateLang(lang);
const altURL = new URL(
	Astro.url.pathname.replace(`/${lang}/`, `/${altLang}/`),
	Astro.site,
);
const defaultURL = new URL(
	Astro.url.pathname.replace(`/${lang}/`, '/fr/'),
	Astro.site,
);
---

<!-- Global Metadata -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" href="/favicon.ico" />
<link rel="sitemap" href="/sitemap-index.xml" />
<link
	rel="alternate"
	type="application/rss+xml"
	title={t(lang, 'site.title')}
	href={new URL('rss.xml', Astro.site)}
/>
<meta name="generator" content={Astro.generator} />

<!-- Hreflang -->
<link rel="alternate" hreflang={lang} href={canonicalURL} />
<link rel="alternate" hreflang={altLang} href={altURL} />
<link rel="alternate" hreflang="x-default" href={defaultURL} />

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />

<!-- Canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
{image && <meta property="og:image" content={new URL(image.src, Astro.url)} />}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={Astro.url} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
{image && <meta property="twitter:image" content={new URL(image.src, Astro.url)} />}

<!-- Analytics (Umami — no cookies, GDPR compliant) -->
<script defer src="https://analytics.nicolasmeridjen.com/script.js" data-website-id="c1bf65a3-2b85-43bf-9933-6364dd13b019"></script>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/BaseHead.astro
git commit -m "feat: add hreflang and lang support to BaseHead"
```

---

## Task 9: Create ReadingProgress component

**Files:**
- Create: `src/components/ReadingProgress.astro`

- [ ] **Step 1: Create the component**

Create `src/components/ReadingProgress.astro`:

```astro
<div id="reading-progress" class="reading-progress"></div>

<style>
	.reading-progress {
		position: fixed;
		top: 0;
		left: 0;
		width: 0%;
		height: 3px;
		background: var(--color-accent);
		z-index: 100;
		transition: width 0.1s linear;
	}
</style>

<script>
	const bar = document.getElementById('reading-progress')!;
	const article = document.querySelector('article')!;

	function updateProgress() {
		const rect = article.getBoundingClientRect();
		const articleTop = rect.top + window.scrollY;
		const articleHeight = rect.height;
		const scrolled = window.scrollY - articleTop;
		const total = articleHeight - window.innerHeight;
		if (total <= 0) {
			bar.style.width = '100%';
			return;
		}
		const progress = Math.min(Math.max(scrolled / total, 0), 1);
		bar.style.width = `${progress * 100}%`;
	}

	window.addEventListener('scroll', updateProgress, { passive: true });
	updateProgress();
</script>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds (component not yet used).

- [ ] **Step 3: Commit**

```bash
git add src/components/ReadingProgress.astro
git commit -m "feat: add reading progress bar component"
```

---

## Task 10: Create ShareButtons component

**Files:**
- Create: `src/components/ShareButtons.astro`

- [ ] **Step 1: Create the component**

Create `src/components/ShareButtons.astro`:

```astro
---
import { type Lang, t } from '../i18n/translations';

interface Props {
	url: string;
	title: string;
	lang: Lang;
}

const { url, title, lang } = Astro.props;
const encodedUrl = encodeURIComponent(url);
const encodedTitle = encodeURIComponent(title);
const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
---

<div class="share-buttons">
	<button class="share-btn" data-href={twitterUrl} aria-label={t(lang, 'share.twitter')}>
		<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
		</svg>
		<span>{t(lang, 'share.twitter')}</span>
	</button>
	<button class="share-btn" data-href={linkedinUrl} aria-label={t(lang, 'share.linkedin')}>
		<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
		</svg>
		<span>{t(lang, 'share.linkedin')}</span>
	</button>
	<button class="share-btn copy-btn" data-url={url} aria-label={t(lang, 'share.copy')}>
		<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
		</svg>
		<span>{t(lang, 'share.copy')}</span>
	</button>
</div>

<style>
	.share-buttons {
		display: flex;
		gap: 0.75rem;
		justify-content: center;
		margin: 2rem 0;
	}
	.share-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		background: transparent;
		color: var(--color-text);
		font-family: var(--font-sans);
		font-size: 0.875rem;
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s;
	}
	.share-btn:hover {
		background: var(--color-surface);
		border-color: var(--color-text-secondary);
	}
	@media (max-width: 720px) {
		.share-btn span {
			display: none;
		}
		.share-btn {
			padding: 0.5rem;
		}
	}
</style>

<script>
	document.querySelectorAll<HTMLButtonElement>('.share-btn[data-href]').forEach((btn) => {
		btn.addEventListener('click', () => {
			const href = btn.dataset.href!;
			window.open(href, '_blank', 'width=600,height=400,noopener,noreferrer');
		});
	});

	document.querySelectorAll<HTMLButtonElement>('.copy-btn').forEach((btn) => {
		btn.addEventListener('click', async () => {
			const url = btn.dataset.url!;
			const span = btn.querySelector('span')!;
			const original = span.textContent!;
			try {
				await navigator.clipboard.writeText(url);
			} catch {
				// Fallback for older browsers
				const textarea = document.createElement('textarea');
				textarea.value = url;
				textarea.style.position = 'fixed';
				textarea.style.opacity = '0';
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				document.body.removeChild(textarea);
			}
			span.textContent = btn.dataset.copied ?? '✓';
			setTimeout(() => { span.textContent = original; }, 2000);
		});
	});
</script>
```

Note: The `data-copied` attribute needs to be set. We'll pass it from BlogPost layout. Alternative: hardcode the feedback text in the script. Let's use the `data-copied` attribute approach — add `data-copied={t(lang, 'share.copied')}` to the copy button:

Update the copy button line to:
```astro
	<button class="share-btn copy-btn" data-url={url} data-copied={t(lang, 'share.copied')} aria-label={t(lang, 'share.copy')}>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds (component not yet used).

- [ ] **Step 3: Commit**

```bash
git add src/components/ShareButtons.astro
git commit -m "feat: add share buttons component (X, LinkedIn, copy link)"
```

---

## Task 11: Create RelatedArticles component

**Files:**
- Create: `src/components/RelatedArticles.astro`

- [ ] **Step 1: Create the component**

Create `src/components/RelatedArticles.astro`:

```astro
---
import { Image } from 'astro:assets';
import { getCollection } from 'astro:content';
import { type Lang, t } from '../i18n/translations';
import FormattedDate from './FormattedDate.astro';

interface Props {
	currentId: string;
	currentTags: string[];
	lang: Lang;
}

const { currentId, currentTags, lang } = Astro.props;

const allPosts = (await getCollection('blog'))
	.filter((post) => post.id.startsWith(`${lang}/`) && post.id !== currentId)
	.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

const scored = allPosts.map((post) => ({
	post,
	score: post.data.tags.filter((tag: string) => currentTags.includes(tag)).length,
}));

scored.sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf());

const related = scored.slice(0, 3).map((s) => s.post);
---

{related.length > 0 && (
	<section class="related-articles">
		<h2>{t(lang, 'related.title')}</h2>
		<div class="related-grid">
			{related.map((post) => {
				const slug = post.id.replace(`${lang}/`, '');
				return (
					<a href={`/${lang}/blog/${slug}/`} class="related-card">
						{post.data.heroImage && (
							<div class="related-image">
								<Image width={320} height={180} src={post.data.heroImage} alt="" />
							</div>
						)}
						<div class="related-content">
							<h3>{post.data.title}</h3>
							<div class="related-meta">
								<FormattedDate date={post.data.pubDate} lang={lang} />
							</div>
							<p class="related-description">{post.data.description}</p>
						</div>
					</a>
				);
			})}
		</div>
	</section>
)}

<style>
	.related-articles {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}
	.related-articles h2 {
		font-size: 1.3em;
		margin-bottom: 1.2em;
	}
	.related-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}
	.related-card {
		text-decoration: none;
		color: inherit;
		border: 1px solid var(--color-border);
		border-radius: 6px;
		overflow: hidden;
		transition: border-color 0.15s;
	}
	.related-card:hover {
		border-color: var(--color-text-secondary);
	}
	.related-image {
		width: 100%;
		height: 140px;
		overflow: hidden;
	}
	.related-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 0;
	}
	.related-content {
		padding: 1rem;
	}
	.related-content h3 {
		font-size: 0.95em;
		margin: 0 0 0.4em;
		line-height: 1.3;
	}
	.related-meta {
		font-family: var(--font-sans);
		font-size: 0.75em;
		color: var(--color-text-secondary);
		margin-bottom: 0.5em;
	}
	.related-description {
		font-size: 0.85em;
		color: var(--color-text-secondary);
		margin: 0;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	@media (max-width: 720px) {
		.related-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds (component not yet used).

- [ ] **Step 3: Commit**

```bash
git add src/components/RelatedArticles.astro
git commit -m "feat: add related articles component with tag-based matching"
```

---

## Task 12: Rewrite BlogPost layout with all new features

**Files:**
- Modify: `src/layouts/BlogPost.astro`

- [ ] **Step 1: Rewrite BlogPost layout**

Replace the entire content of `src/layouts/BlogPost.astro`:

```astro
---
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
import FormattedDate from '../components/FormattedDate.astro';
import Header from '../components/Header.astro';
import ReadingProgress from '../components/ReadingProgress.astro';
import RelatedArticles from '../components/RelatedArticles.astro';
import ShareButtons from '../components/ShareButtons.astro';
import { type Lang, t } from '../i18n/translations';

type Props = CollectionEntry<'blog'>['data'] & {
	lang: Lang;
	postId: string;
};

const {
	title,
	description,
	pubDate,
	updatedDate,
	heroImage,
	audioFile,
	tags = [],
	catchStart,
	catchEnd,
	lang,
	postId,
} = Astro.props;

const articleUrl = new URL(Astro.url.pathname, Astro.site).toString();
---

<html lang={lang}>
	<head>
		<BaseHead title={title} description={description} image={heroImage} lang={lang} />
	</head>

	<body>
		<ReadingProgress />
		<Header lang={lang} />
		<main>
			<article>
				<header class="article-header">
					<h1>{title}</h1>
					<div class="article-meta">
						<FormattedDate date={pubDate} lang={lang} />
						{updatedDate && (
							<span class="updated">
								&middot; {t(lang, 'article.updated')} <FormattedDate date={updatedDate} lang={lang} />
							</span>
						)}
					</div>
					{description && <p class="article-subtitle">{description}</p>}
				</header>

				{audioFile && (
					<div class="audio-player">
						<div class="audio-label">
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M9 18V5l12-2v13"/>
								<circle cx="6" cy="18" r="3"/>
								<circle cx="18" cy="16" r="3"/>
							</svg>
							<span>{t(lang, 'audio.listen')}</span>
						</div>
						<audio controls preload="metadata">
							<source src={audioFile} type="audio/mpeg" />
						</audio>
					</div>
				)}

				{catchStart && (
					<div class="catch-phrase">
						{catchStart}
					</div>
				)}

				{heroImage && (
					<div class="hero-image">
						<Image width={960} height={540} src={heroImage} alt="" />
					</div>
				)}

				<div class="prose">
					<slot />
				</div>

				{catchEnd && (
					<div class="catch-phrase">
						{catchEnd}
					</div>
				)}
			</article>

			<ShareButtons url={articleUrl} title={title} lang={lang} />
			<RelatedArticles currentId={postId} currentTags={tags} lang={lang} />
		</main>
		<Footer lang={lang} />
	</body>
</html>

<style>
	.article-header {
		padding: 3em 0 1.5em;
	}
	.article-header h1 {
		font-size: 2.5em;
		line-height: 1.2;
		margin-bottom: 0.4em;
		letter-spacing: -0.03em;
	}
	.article-meta {
		font-family: var(--font-sans);
		font-size: 0.85em;
		color: var(--color-text-secondary);
		margin-bottom: 1em;
	}
	.updated {
		font-style: italic;
	}
	.article-subtitle {
		font-size: 1.2em;
		color: var(--color-text-secondary);
		line-height: 1.5;
		margin: 0;
	}
	.audio-player {
		margin: 1.5em 0 2em;
		padding: 1.2em 1.5em;
		background: var(--color-surface);
		border-radius: 8px;
		border: 1px solid var(--color-border);
	}
	.audio-label {
		display: flex;
		align-items: center;
		gap: 0.5em;
		font-family: var(--font-sans);
		font-size: 0.85em;
		font-weight: 600;
		color: var(--color-text);
		margin-bottom: 0.8em;
	}
	.audio-label svg {
		color: var(--color-text-secondary);
	}
	.audio-player audio {
		width: 100%;
		height: 40px;
	}
	.catch-phrase {
		border-left: 3px solid var(--color-accent);
		padding: 1rem 1.25rem;
		margin: 1.5rem 0;
		font-style: italic;
		font-size: 1.1em;
		color: var(--color-text-secondary);
		background: var(--color-surface);
		border-radius: 0 6px 6px 0;
	}
	.hero-image {
		margin: 0 0 2em;
	}
	.hero-image img {
		width: 100%;
		border-radius: 4px;
	}
	.prose {
		font-size: 1.05em;
		line-height: 1.85;
	}
	@media (max-width: 720px) {
		.article-header h1 {
			font-size: 1.8em;
		}
		.article-header {
			padding: 2em 0 1em;
		}
	}
</style>
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build may have warnings since pages haven't been updated yet. That's fine — we update pages next.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BlogPost.astro
git commit -m "feat: integrate reading progress, catchphrases, share, related articles into BlogPost layout"
```

---

## Task 13: Create i18n page routing

**Files:**
- Modify: `src/pages/index.astro` (redirect to /fr/)
- Create: `src/pages/[lang]/index.astro`
- Create: `src/pages/[lang]/about.astro`
- Create: `src/pages/[lang]/blog/[...slug].astro`
- Delete: `src/pages/blog/[...slug].astro`
- Delete: `src/pages/blog/index.astro`
- Delete: `src/pages/about.astro`

- [ ] **Step 1: Update root index.astro to redirect**

Replace `src/pages/index.astro`:

```astro
---
return Astro.redirect('/fr/', 302);
---
```

- [ ] **Step 2: Create [lang]/index.astro (homepage)**

Create `src/pages/[lang]/index.astro`:

```astro
---
import { Image } from 'astro:assets';
import { getCollection } from 'astro:content';
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import FormattedDate from '../../components/FormattedDate.astro';
import Header from '../../components/Header.astro';
import { type Lang, languages, t } from '../../i18n/translations';

export function getStaticPaths() {
	return Object.keys(languages).map((lang) => ({ params: { lang } }));
}

const { lang } = Astro.params as { lang: Lang };

const posts = (await getCollection('blog'))
	.filter((post) => post.id.startsWith(`${lang}/`))
	.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<!doctype html>
<html lang={lang}>
	<head>
		<BaseHead title={t(lang, 'site.title')} description={t(lang, 'site.description')} lang={lang} />
	</head>
	<body>
		<Header lang={lang} />
		<main>
			<section class="hero">
				<h1>{t(lang, 'home.title')}</h1>
				<p class="subtitle">{t(lang, 'home.subtitle')}</p>
			</section>

			{posts.length === 0 && (
				<section class="empty">
					<p>{t(lang, 'home.empty')}</p>
				</section>
			)}

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
		</main>
		<Footer lang={lang} />
	</body>
</html>

<style>
	.hero {
		padding: 3em 0 2em;
		border-bottom: 1px solid var(--color-border);
		margin-bottom: 2em;
	}
	.hero h1 {
		font-size: 2.5em;
		margin-bottom: 0.3em;
		letter-spacing: -0.03em;
	}
	.subtitle {
		font-size: 1.15em;
		color: var(--color-text-secondary);
		margin: 0;
		line-height: 1.6;
	}
	.empty {
		padding: 4em 0;
		text-align: center;
		color: var(--color-text-secondary);
		font-style: italic;
	}
	.posts {
		display: flex;
		flex-direction: column;
	}
	.post-card {
		padding: 2em 0;
		border-bottom: 1px solid var(--color-border);
	}
	.post-card:last-child {
		border-bottom: none;
	}
	.post-card a {
		display: flex;
		gap: 2em;
		text-decoration: none;
		color: inherit;
		align-items: flex-start;
	}
	.post-content {
		flex: 1;
	}
	.post-meta {
		font-family: var(--font-sans);
		font-size: 0.8em;
		color: var(--color-text-secondary);
		margin-bottom: 0.5em;
		display: flex;
		align-items: center;
		gap: 0.6em;
	}
	.audio-badge {
		font-size: 0.75em;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-accent);
		border: 1px solid var(--color-accent);
		border-radius: 3px;
		padding: 0.1em 0.4em;
	}
	.post-card h2 {
		font-size: 1.35em;
		margin: 0 0 0.4em;
		line-height: 1.3;
		letter-spacing: -0.02em;
		transition: color 0.15s;
	}
	.post-card a:hover h2 {
		color: var(--color-text-secondary);
	}
	.post-description {
		color: var(--color-text-secondary);
		font-size: 0.95em;
		margin: 0;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.post-image {
		flex-shrink: 0;
		width: 200px;
		height: 134px;
		overflow: hidden;
		border-radius: 4px;
	}
	.post-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 4px;
	}
	@media (max-width: 720px) {
		.hero h1 {
			font-size: 1.8em;
		}
		.post-image {
			display: none;
		}
		.post-card {
			padding: 1.5em 0;
		}
	}
</style>
```

- [ ] **Step 3: Create [lang]/about.astro**

Create `src/pages/[lang]/about.astro`:

```astro
---
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import Header from '../../components/Header.astro';
import { type Lang, languages, t } from '../../i18n/translations';

export function getStaticPaths() {
	return Object.keys(languages).map((lang) => ({ params: { lang } }));
}

const { lang } = Astro.params as { lang: Lang };
---

<html lang={lang}>
	<head>
		<BaseHead title={t(lang, 'about.meta.title')} description={t(lang, 'about.meta.description')} lang={lang} />
	</head>
	<body>
		<Header lang={lang} />
		<main>
			<article class="about">
				<h1>{t(lang, 'about.title')}</h1>
				<p>{t(lang, 'about.bio.1')}</p>
				<p>{t(lang, 'about.bio.2')}</p>
				<p>{t(lang, 'about.bio.3')}</p>
				<p>
					<a href="https://nicolasmeridjen.com">nicolasmeridjen.com</a> &middot;
					<a href="https://github.com/nmarijane">GitHub</a>
				</p>
			</article>
		</main>
		<Footer lang={lang} />
	</body>
</html>

<style>
	.about {
		padding: 3em 0;
	}
	.about h1 {
		margin-bottom: 1em;
	}
</style>
```

- [ ] **Step 4: Create [lang]/blog/[...slug].astro**

Create `src/pages/[lang]/blog/[...slug].astro`:

```astro
---
import { type CollectionEntry, getCollection, render } from 'astro:content';
import BlogPost from '../../../layouts/BlogPost.astro';
import { type Lang, languages } from '../../../i18n/translations';

export async function getStaticPaths() {
	const posts = await getCollection('blog');
	return posts.map((post) => {
		// post.id is like "fr/2026-03-26-slug" — extract lang and slug
		const lang = post.id.split('/')[0];
		const slug = post.id.replace(`${lang}/`, '');
		return {
			params: { lang, slug },
			props: post,
		};
	});
}

type Props = CollectionEntry<'blog'>;

const { lang } = Astro.params as { lang: Lang; slug: string };
const post = Astro.props;
const { Content } = await render(post);
---

<BlogPost {...post.data} lang={lang} postId={post.id}>
	<Content />
</BlogPost>
```

- [ ] **Step 5: Delete old page files**

```bash
rm src/pages/blog/[...slug].astro
rm src/pages/blog/index.astro
rmdir src/pages/blog
rm src/pages/about.astro
```

- [ ] **Step 6: Delete consts.ts (replaced by translations)**

```bash
rm src/consts.ts
```

- [ ] **Step 7: Build and verify**

Run: `npm run build`
Expected: Build succeeds. Pages are now generated under `/fr/` and `/en/` prefixes. The `/en/` homepage will show no articles (none exist yet in `content/blog/en/`).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: implement i18n page routing with [lang] prefix"
```

---

## Task 14: Update RSS feed

**Files:**
- Modify: `src/pages/rss.xml.js`

- [ ] **Step 1: Update RSS to filter FR posts only**

Read the current `src/pages/rss.xml.js` first, then update it to:
- Import from translations instead of consts
- Filter only `fr/` posts
- Fix the post link URL to include `/fr/blog/` prefix

The key changes are:
- Replace `SITE_TITLE` / `SITE_DESCRIPTION` imports with `t('fr', 'site.title')` etc.
- Filter posts: `.filter(post => post.id.startsWith('fr/'))`
- Fix link: `link: \`/fr/blog/\${post.id.replace('fr/', '')}/\``

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds. RSS feed still works at `/rss.xml`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/rss.xml.js
git commit -m "feat: update RSS feed to use i18n system and filter FR posts"
```

---

## Task 15: Add tags to existing blog posts

**Files:**
- Modify: all 9 files in `src/content/blog/fr/*.md`

- [ ] **Step 1: Add tags to each post's frontmatter**

Add a `tags` array to each post. Choose from a consistent set of tags based on content:

Tags vocabulary: `ia`, `llm`, `agents`, `cybersecurite`, `open-source`, `industrie`, `outils`, `recherche`, `anthropic`, `openai`, `nvidia`, `google`, `meta`

For each post, read the content and add appropriate tags. Example:

`2026-03-26-mars-2026-mois-ia-change-vitesse.md`:
```yaml
tags: ["ia", "llm", "industrie", "openai", "google", "nvidia"]
```

`2026-03-27-jensen-huang-agi-declaration-analyse.md`:
```yaml
tags: ["ia", "nvidia", "industrie"]
```

`2026-03-28-agents-ia-copilotes-autonomes-2026.md`:
```yaml
tags: ["ia", "agents", "outils"]
```

`2026-03-28-claude-mythos-anthropic-seuil-cybersecurite.md`:
```yaml
tags: ["ia", "anthropic", "cybersecurite"]
```

`2026-03-29-sycophancy-ia-pourquoi-ton-llm-te-dit-toujours-oui.md`:
```yaml
tags: ["ia", "llm", "recherche"]
```

`2026-03-30-claude-code-saas-ia-natif.md`:
```yaml
tags: ["ia", "anthropic", "outils"]
```

`2026-03-31-axios-hack-supply-chain-attack-npm.md`:
```yaml
tags: ["cybersecurite", "open-source"]
```

`2026-03-31-claude-code-source-leak-npm-anthropic.md`:
```yaml
tags: ["anthropic", "open-source", "cybersecurite"]
```

`2026-03-31-world-models-lecun-pari-milliard-contre-llm.md`:
```yaml
tags: ["ia", "llm", "recherche", "meta"]
```

- [ ] **Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds with all tags parsed correctly.

- [ ] **Step 3: Commit**

```bash
git add src/content/blog/fr/
git commit -m "feat: add tags to all existing blog posts"
```

---

## Task 16: Final build and smoke test

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Clean build with no errors or warnings.

- [ ] **Step 2: Preview and verify key routes**

Run: `npm run preview &`

Verify these routes work:
- `/` → redirects to `/fr/`
- `/fr/` → FR homepage with article list
- `/en/` → EN homepage (empty or with articles)
- `/fr/blog/2026-03-26-mars-2026-mois-ia-change-vitesse/` → article page with reading progress, share buttons, related articles
- `/fr/about/` → about page in French
- `/en/about/` → about page in English
- `/rss.xml` → RSS feed

- [ ] **Step 3: Commit any fixes**

If any issues found, fix and commit.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete blog features — i18n, reading progress, share, related articles, catchphrases"
```

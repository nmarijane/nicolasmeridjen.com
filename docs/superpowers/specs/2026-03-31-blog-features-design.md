# Blog Features Design Spec

**Date:** 2026-03-31
**Projet:** nicolasmeridjen.com (Astro 6, vanilla CSS, static site)

## 1. Multilingue (i18n natif Astro)

### Structure du contenu

```
src/content/blog/
  fr/
    2026-03-26-mars-2026-mois-ia.md
    ...
  en/
    2026-03-26-march-2026-ai-month.md
    ...
```

### Routing

- `/fr/blog/{slug}/`, `/en/blog/{slug}/`
- `/fr/` homepage FR, `/en/` homepage EN
- `/fr/about/`, `/en/about/`
- `/` → redirect 302 vers `/fr/`

### Pages

Restructuration des pages pour supporter le préfixe langue :

```
src/pages/
  index.astro              → redirect vers /fr/
  [lang]/
    index.astro            → homepage (liste des articles)
    about.astro            → page about
    blog/
      [...slug].astro      → article dynamique
  rss.xml.js               → RSS (inchangé, contenu FR)
```

### Traductions UI

Fichier `src/i18n/translations.ts` :

```typescript
export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

const translations = {
  fr: {
    'nav.blog': 'Blog',
    'nav.about': 'À propos',
    'share.twitter': 'Partager',
    'share.linkedin': 'Partager',
    'share.copy': 'Copier le lien',
    'share.copied': 'Copié !',
    'related.title': 'Articles similaires',
    'footer.portfolio': 'Portfolio',
    'audio.listen': '🎵 Écouter cet article',
  },
  en: {
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'share.twitter': 'Share',
    'share.linkedin': 'Share',
    'share.copy': 'Copy link',
    'share.copied': 'Copied!',
    'related.title': 'Related articles',
    'footer.portfolio': 'Portfolio',
    'audio.listen': '🎵 Listen to this article',
  },
} as const;

export function t(lang: Lang, key: string): string {
  return translations[lang]?.[key] ?? translations[defaultLang]?.[key] ?? key;
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}
```

### Toggle langue

- Bouton dans le Header affichant la langue alternative (ex: "EN" quand on est en FR)
- Lien vers l'équivalent dans l'autre langue
- Pour les articles : lien vers `/en/blog/{slug}/` si la traduction existe, sinon vers `/en/`

### SEO hreflang

Dans `BaseHead.astro`, ajout de :

```html
<link rel="alternate" hreflang="fr" href="https://blog.nicolasmeridjen.com/fr/..." />
<link rel="alternate" hreflang="en" href="https://blog.nicolasmeridjen.com/en/..." />
<link rel="alternate" hreflang="x-default" href="https://blog.nicolasmeridjen.com/fr/..." />
```

### Dates

`FormattedDate.astro` accepte un prop `lang` et formate avec la locale correspondante (`fr-FR` ou `en-US`).

## 2. Loader de lecture

### Composant

`src/components/ReadingProgress.astro`

### Comportement

- Barre `position: fixed; top: 0; left: 0; z-index: 100`
- Hauteur : 3px
- Couleur : `var(--color-accent)`
- Largeur calculée : `(scrollY - articleTop) / (articleHeight - viewportHeight) * 100%`
- Transition : `width 0.1s linear`
- N'apparaît que sur les pages articles (inclus dans `BlogPost.astro`)

### Script

Vanilla JS inline avec event listener `scroll` passif.

## 3. Partage d'articles

### Composant

`src/components/ShareButtons.astro`

Props : `url: string`, `title: string`, `lang: Lang`

### Placement

Dans `BlogPost.astro`, après le contenu (slot) et la catchEnd, avant RelatedArticles.

### Boutons

1. **X (Twitter)** : `https://twitter.com/intent/tweet?url=${url}&text=${title}`
2. **LinkedIn** : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
3. **Copier le lien** : `navigator.clipboard.writeText(url)`, feedback "Copié !" / "Copied!" pendant 2s

### Style

Boutons flex, centrés, bordure `--color-border`, hover `--color-surface`, icônes SVG inline 18px, font-size 0.875rem.

## 4. Articles suggérés

### Composant

`src/components/RelatedArticles.astro`

Props : `currentSlug: string`, `currentTags: string[]`, `lang: Lang`

### Placement

En fin d'article, après ShareButtons, avant le footer.

### Frontmatter

Ajout au schéma Zod (`content.config.ts`) :

```typescript
tags: z.array(z.string()).default([]),
```

### Logique de sélection

1. Récupérer tous les articles de la même langue (hors article courant)
2. Scorer par nombre de tags en commun (décroissant)
3. En cas d'égalité, trier par date (plus récent d'abord)
4. Prendre les 3 premiers (fallback sur les plus récents si pas assez de matchs)

### Affichage

- Section avec titre h2 traduit
- Grille 3 colonnes desktop, 1 colonne mobile
- Cards : hero image, titre (h3), date, description (1 ligne clamp)
- Lien cliquable sur toute la card

## 5. Catchphrases SEO

### Frontmatter

Ajout au schéma Zod :

```typescript
catchStart: z.string().optional(),
catchEnd: z.string().optional(),
```

### Affichage dans BlogPost.astro

**catchStart** : après les métadonnées (date, audio), avant le contenu.
**catchEnd** : après le contenu, avant ShareButtons.

### Style

Bordure gauche 3px `--color-accent`, padding 1rem 1.25rem, italique, 1.1em, fond `--color-surface`, border-radius 0 6px 6px 0.

## 6. Réduction de la police

### Changements dans `global.css`

- Desktop : `font-size: 18px` (était 20px)
- Mobile ≤720px : `font-size: 16px` (était 18px)
- Headings en `em` s'ajustent automatiquement

## Ordre des éléments dans un article

```
┌─────────────────────────────┐
│ ReadingProgress (fixed top) │
├─────────────────────────────┤
│ Header + lang toggle        │
├─────────────────────────────┤
│ Article title (h1)          │
│ Date / updated date         │
│ Description (subtitle)      │
│ Audio player (si dispo)     │
│ catchStart (si défini)      │
│ Hero image (si dispo)       │
│ ─── Contenu article ───    │
│ catchEnd (si défini)        │
│ ShareButtons                │
│ RelatedArticles             │
├─────────────────────────────┤
│ Footer                      │
└─────────────────────────────┘
```

## Fichiers à créer

- `src/i18n/translations.ts`
- `src/components/ReadingProgress.astro`
- `src/components/ShareButtons.astro`
- `src/components/RelatedArticles.astro`
- `src/pages/[lang]/index.astro`
- `src/pages/[lang]/about.astro`
- `src/pages/[lang]/blog/[...slug].astro`

## Fichiers à modifier

- `src/content.config.ts` — ajout tags, catchStart, catchEnd
- `src/styles/global.css` — réduction police
- `src/components/BaseHead.astro` — hreflang
- `src/components/Header.astro` — toggle langue, prop lang
- `src/components/Footer.astro` — traductions, prop lang
- `src/components/FormattedDate.astro` — prop lang
- `src/layouts/BlogPost.astro` — intégration de tous les nouveaux composants
- `src/pages/index.astro` — redirect vers /fr/

## Fichiers à supprimer (remplacés par versions sous [lang])

- `src/pages/blog/index.astro`
- `src/pages/blog/[...slug].astro`
- `src/pages/about.astro`

## Migration du contenu

Tous les fichiers .md existants dans `src/content/blog/` → déplacés dans `src/content/blog/fr/`

## Dépendances

Aucune nouvelle dépendance npm. Tout en vanilla JS/CSS/Astro.

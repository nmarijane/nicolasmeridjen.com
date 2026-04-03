# AI Buzz Heatmap — Design Spec

**Date:** 2026-04-03
**Status:** Draft

## Overview

Ajouter un widget "AI Buzz du jour" en sidebar sur la homepage du blog nicolasmeridjen.com. Ce widget affiche un classement quotidien des modèles IA par volume de mentions, avec des liens vers les sources (tweets, blogs, forums, etc.).

## Data Source

- **Fichier:** `src/data/ai-buzz.json` dans le repo du blog
- **Mis à jour par:** L'agent openclaw, via commit régulier (au moins quotidien)
- **Format:** Source-agnostique — le front ne fait aucune hypothèse sur les canaux

### Schema du fichier JSON

```json
{
  "date": "2026-04-03",
  "models": [
    {
      "name": "Claude Opus 4.6",
      "mentions": 142,
      "sources": [
        { "label": "@karpathy", "url": "https://x.com/karpathy/status/..." },
        { "label": "TechCrunch", "url": "https://techcrunch.com/..." }
      ]
    }
  ]
}
```

**Contraintes:**
- `models` trié par `mentions` décroissant (l'agent s'en charge)
- `sources` : les N plus significatives (top influenceurs, articles majeurs). Le reste est compté via le total `mentions`
- Pas de limite stricte sur le nombre de modèles ; le widget affiche les 8 premiers max, le reste est masqué

## Architecture

### Layout Homepage

Passage de single-column (780px max) à 2-column layout :

```
┌──────────────────────────────────────────┐
│  Hero (full width, inchangé)             │
├─────────────────────┬────────────────────┤
│                     │                    │
│  Feed d'articles    │  Sidebar           │
│  (flex: 1)          │  (280px, sticky)   │
│                     │                    │
│                     │  ┌──────────────┐  │
│                     │  │ AI Buzz      │  │
│                     │  │ du jour      │  │
│                     │  │              │  │
│                     │  │ [barres]     │  │
│                     │  │ [sources]    │  │
│                     │  └──────────────┘  │
│                     │                    │
└─────────────────────┴────────────────────┘
```

- **Max-width total:** Passe de 780px à ~1080px pour accommoder la sidebar
- **Feed:** Garde son width actuel (~700px, flex: 1)
- **Sidebar:** 280px fixe, `position: sticky; top: 2em`
- **Mobile (< 720px):** La sidebar passe au-dessus du feed (flex-direction: column-reverse ou column, selon préférence)

### Composant Astro : `AiBuzzSidebar.astro`

Nouveau composant dans `src/components/`. Responsabilités :
- Importer et lire `src/data/ai-buzz.json`
- Rendre la liste de modèles avec barres de chaleur
- Afficher les tags sources cliquables
- Gérer le "+N" pour les sources non affichées

### Rendu des barres

- Barre de chaleur : `<div>` avec `width` proportionnelle au ratio `mentions / max_mentions * 100%`
- Gradient vert (accent du blog) : plus intense pour plus de mentions, plus clair pour moins
- Échelle de couleur : de `#1a8917` (vert foncé, top) à `#c8ecc7` (vert pâle, bas)

### Tags sources

- Les 2-3 sources les plus notables affichées en tant que tags cliquables (lien externe, `target="_blank"`, `rel="noopener"`)
- Style : petit badge vert clair (`background: #e8f5e8`, `color: #1a8917`)
- Si plus de sources que l'espace le permet : badge gris "+N" non cliquable

## Fichiers à créer / modifier

| Fichier | Action |
|---------|--------|
| `src/data/ai-buzz.json` | Créer — fichier de données (avec données d'exemple initiales) |
| `src/components/AiBuzzSidebar.astro` | Créer — composant sidebar |
| `src/pages/[lang]/index.astro` | Modifier — layout 2 colonnes, intégrer le composant |
| `src/styles/global.css` | Modifier — augmenter `--max-width` si nécessaire, ou override dans la page |

## Responsive

- **Desktop (> 720px):** 2 colonnes, sidebar sticky
- **Mobile (≤ 720px):** Sidebar au-dessus du feed, full width, non-sticky

## Edge Cases

- **Fichier JSON absent ou vide:** Ne pas rendre la sidebar, layout single-column comme avant
- **0 mentions / 0 modèles:** Même comportement, pas de sidebar
- **Modèle sans sources:** Afficher le modèle et la barre, pas de tags
- **Très long nom de modèle:** Tronquer avec ellipsis

## Hors scope

- Historique multi-jours (futur enhancement)
- Filtrage par source côté front
- Animation des barres (simple CSS, pas de JS)
- Dark mode (le blog n'en a pas actuellement)

## i18n

- Le titre "AI Buzz du jour" doit être traduit (fr/en) via le système i18n existant (`translations.ts`)
- Les noms de modèles et labels de sources restent tels quels (non traduits)

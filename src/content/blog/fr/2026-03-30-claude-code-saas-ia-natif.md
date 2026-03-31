---
title: "Claude Code + SaaS : construire une app IA-native en une session"
description: "Comment construire un SaaS complet avec Claude Code, saas-boilerplate et saas-forge. Le concept d'IA-native et de CLAUDE.md expliqué concrètement."
pubDate: "2026-03-30"
updatedDate: "2026-03-31"
heroImage: "../../../assets/2026-03-30-claude-code-saas-ia-natif.png"
tags: ["ia", "anthropic", "outils"]
---

**66% des développeurs** qui utilisent des [agents IA](/fr/blog/2026-03-28-agents-ia-copilotes-autonomes-2026/) se heurtent au même mur : l'IA produit quelque chose d'*à peu près* juste — mais jamais complètement. Et corriger ces 20% qui clochent prend plus de temps qu'écrire le code soi-même. C'est le "80% problem", documenté dans une étude 2026 auprès de milliers de devs.

Il existe une façon d'éviter ça. Elle n'a rien à voir avec de meilleures formulations de prompts. Elle s'appelle le **context engineering**.

---

## Claude Code est #1 — mais le problème, c'est le contexte

Depuis son lancement — dans un contexte où [l'IA accélère à un rythme sans précédent](/fr/blog/2026-03-26-mars-2026-mois-ia-change-vitesse/) — Claude Code s'est imposé comme l'agent de code le plus populaire du marché. Il consomme 5,5x moins de tokens que Cursor pour des tâches équivalentes. Il peut lire ton codebase entier, modifier des dizaines de fichiers en parallèle, lancer des tests, corriger ses propres erreurs.

Le problème n'est pas la puissance. C'est ce qui se passe quand Claude commence à coder sans savoir *comment* ton projet est organisé, *pourquoi* tu as fait certains choix d'architecture, *quelles conventions* tu utilises.

Il improvise. Et quand il improvise sur un projet SaaS — auth, multi-tenancy, Stripe, base de données — les erreurs sont coûteuses.

[Martin Fowler](https://martinfowler.com/) a donné un nom à la discipline qui résout ça : le **context engineering**. Pas le prompt engineering (choisir les bons mots). L'engineering de contexte — configurer l'environnement dans lequel l'agent travaille pour qu'il produise des résultats reproductibles et prévisibles.

Le fichier central de cette discipline ? Le `CLAUDE.md`.

## CLAUDE.md : le fichier qui change tout

Un `CLAUDE.md` est un fichier Markdown qui vit à la racine de ton projet. Claude Code le lit automatiquement à chaque démarrage — il fait partie du system prompt avant même que tu n'écrives ta première ligne.

[Anthropic](https://docs.anthropic.com/en/docs/claude-code/overview) recommande de le traiter comme une infrastructure, pas comme de la documentation optionnelle. En 2026, c'est devenu aussi indispensable que `.gitignore` dans la communauté Claude Code.

Concrètement, qu'est-ce qu'on y met ?

- Les commandes bash que Claude ne peut pas deviner (scripts de dev, de test, de migration)
- Les conventions qui dévient du standard (naming, structure de dossiers, patterns spécifiques)
- Les décisions d'architecture et pourquoi tu les as prises
- Les gotchas : comportements non-évidents, pièges à éviter
- Les instructions de test et de review

La règle d'or : pour chaque ligne, demande-toi "Est-ce que supprimer ça ferait faire des erreurs à Claude ?" Si non, coupe.

> Un `CLAUDE.md` bien écrit transforme un agent qui improvise en un agent qui exécute avec précision.

Mais construire un CLAUDE.md sur une base de code from-scratch, c'est du travail. Et c'est là qu'intervient l'approche **IA-native**.

## L'approche IA-native : partir avec le contexte, pas l'ajouter après

Un codebase **IA-native** ne signifie pas "codé avec de l'IA". Ça signifie qu'il a été *conçu* pour que les agents IA comprennent son architecture dès le premier contact.

La différence pratique : au lieu de construire ton SaaS puis d'écrire un CLAUDE.md pour documenter ce que tu as fait, tu *pars* avec un projet où le contexte est déjà là.

C'est exactement ce que fait [`nmarijane/saas-boilerplate`](https://github.com/nmarijane/saas-boilerplate) — un boilerplate Next.js 16 open source avec 20+ fonctionnalités (auth, Stripe, RBAC, API keys, webhooks, admin, onboarding...) qui embarque nativement :

- Un `CLAUDE.md` configuré avec l'architecture complète du projet
- Un `docs/SETUP.md` décrivant chaque feature, chaque variable d'environnement, chaque décision technique
- PGlite en dev local — une base PostgreSQL en mémoire, zéro config, `npm install && npm run dev` et c'est parti

Le projet se démarre en moins de 5 minutes. Et dès la première session Claude Code, l'agent sait exactement où tout se trouve.

**Stack complète :**
| Couche | Technologie |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Auth | Better Auth (self-hosted, orgs, RBAC) |
| Base de données | Drizzle ORM + PostgreSQL (PGlite local) |
| Paiements | Stripe (checkout, portal, webhooks) |
| Email | React Email + Nodemailer |
| Jobs | Inngest (background tasks) |
| i18n | next-intl (en, fr) |
| Tests | Vitest + Playwright + Storybook |

## saas-forge : de l'idée au projet en une commande

Avoir un bon boilerplate, c'est bien. Mais il reste un problème : comment adapter ce boilerplate à *ton* projet ? Quelles features garder, lesquelles supprimer ? Comment générer tes modèles de données métier, tes pages, ta logique ?

C'est le problème que résout `saas-forge` — un plugin Claude Code qui se charge de tout ça.

```bash
# Installation (une seule fois)
npx skills add nmarijane/saas-forge

# Créer ton SaaS
/saas-forge:saas Un outil de gestion de projets pour freelances
```

Ce que saas-forge fait en coulisses, en 3 phases :

**Phase 1 — Brainstorming interactif**
Il clarifie ton idée avec toi : concept, utilisateurs cibles, valeur proposition. Il conçoit le modèle de données (schémas Drizzle), mappe les user flows et les pages, et te présente les features du boilerplate avec une recommandation garder/supprimer adaptée à ton projet.

**Phase 2 — Scaffolding automatique**
Un agent builder dispatché en sous-agent clone le boilerplate, supprime proprement les features non utilisées, génère tes modèles métier, queries, server actions, composants et routes. Il vérifie que TypeScript et lint passent avant de te rendre la main.

**Phase 3 — Handover**
Il te livre un récapitulatif : ce qui a été créé, ce qui a été gardé, ce qui a été supprimé. Les variables d'environnement à configurer. Les prochaines étapes recommandées.

Résultat : tu ne passes pas 2 heures à lire une doc, supprimer du code que tu ne comprends pas, et espérer ne rien avoir cassé. Tu décris ton app et tu codes directement ce qui fait ta différence.

## Pourquoi ça change la donne pour les solo founders

L'impact réel n'est pas la rapidité de mise en place (bien que `npm run dev` en 5 minutes soit agréable). C'est la **reproductibilité**.

Dans un workflow IA-natif avec Claude Code :

1. Tu ouvres une session Claude Code dans le repo
2. Claude lit le CLAUDE.md — il sait immédiatement comment le projet est structuré
3. Tu lui demandes d'ajouter une feature → il génère exactement dans les bons dossiers, avec les bons patterns, les bons tests
4. Tu valides, tu pousses

Aucune surprise. Pas d'improvisation sur l'architecture. Pas de fichiers générés au mauvais endroit.

C'est ce que la communauté Everything Claude Code (100k+ étoiles sur GitHub) appelle un "repeatable, auditable workflow" — l'évolution des agents IA de l'usage ad hoc vers des systèmes structurés et prévisibles.

La différence entre vibe coding et engineering IA-natif, c'est précisément ça : le vibe coding fonctionne pour un prototype en 30 minutes. L'IA-native fonctionne pour un produit que tu vas maintenir pendant des années.

## Les limites à connaître

L'approche IA-native avec Claude Code n'est pas magique. Quelques points d'attention :

**Le contexte se remplit vite.** Claude Code travaille dans une fenêtre de contexte. Une session de debugging intense peut la saturer, et les performances dégradent. Il faut apprendre à ouvrir de nouvelles sessions pour les tâches distinctes, à utiliser `.claudeignore` pour exclure les node_modules et les artefacts de build.

**saas-forge est un outil opinioné.** La stack (Next.js, Better Auth, Drizzle, Stripe) est fixe. Si ton projet nécessite une autre stack, tu pars sur le boilerplate directement ou tu construis le tien.

**Le CLAUDE.md doit être maintenu.** Comme toute documentation, il se dégrade avec le temps si tu ne le mets pas à jour. La bonne pratique : traiter les modifications du CLAUDE.md comme des modifications de code — elles passent en review, elles sont versionnées, elles documentent les décisions importantes.

**Le 80% problem persiste sur les cas complexes.** Un agent IA-natif avec un excellent contexte réduit drastiquement les erreurs courantes. Mais pour les fonctionnalités vraiment complexes — algorithmes de pricing dynamique, logique métier dense, intégrations d'API tierces complexes — tu restes le meilleur dev de la session.

---

**Ce qu'il faut retenir :**

- **Le context engineering > le prompt engineering** — un bon CLAUDE.md transforme un agent qui improvise en un agent qui exécute de façon prévisible
- **L'IA-native signifie concevoir pour les agents dès le départ**, pas documenter après — c'est la différence entre un projet maintenable et un prototype qu'on jette
- **saas-boilerplate + saas-forge** = combo pour lancer un SaaS complet avec Claude Code sans phase de setup manuelle, en partant directement sur ta logique métier
- **Le vibe coding est pour les prototypes, l'IA-native est pour les produits** — choisir son approche en fonction de l'horizon temporel du projet

---

## Questions fréquentes sur Claude Code et les SaaS IA-natifs

**Est-ce que CLAUDE.md suffit pour que Claude Code comprenne mon projet ?**
Le CLAUDE.md est nécessaire mais pas suffisant sur un gros projet. Il faut le compléter avec des fichiers de documentation modulaires (que le CLAUDE.md peut référencer via `@docs/architecture.md`), et utiliser `.claudeignore` pour ne pas polluer le contexte avec des fichiers non pertinents.

**saas-boilerplate est-il adapté pour un projet en production ?**
Oui — la stack (Next.js 16, Better Auth, Drizzle, Stripe) est production-ready. Le projet inclut GitHub Actions CI/CD, Dependabot, tests E2E Playwright et Claude Code Review automatique sur les PRs. Des dizaines d'équipes l'utilisent en production.

**Quelle est la différence entre Claude Code et Cursor pour ce type de workflow ?**
Claude Code est un agent qui travaille en terminal et a accès à l'ensemble du projet (fichiers, commandes, git). Cursor est un éditeur avec complétion IA. Pour scaffolding et modifications multi-fichiers, Claude Code est généralement plus efficace et consomme 5,5x moins de tokens. Cursor reste pertinent pour l'édition in-line et l'exploration interactive.

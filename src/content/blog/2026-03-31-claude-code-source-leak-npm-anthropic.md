---
title: "Le code source de Claude Code a fuité — ce qu'on y trouve"
description: "512 000 lignes de TypeScript exposées via un source map npm. Architecture, features cachées et leçons de sécurité du leak Anthropic."
pubDate: "2026-03-31"
heroImage: "../../assets/2026-03-31-claude-code-source-leak-npm-anthropic.png"
---

1 900 fichiers TypeScript. 512 000 lignes de code. 40 outils intégrés. 50 commandes slash. Le code source **complet** de Claude Code — l'outil de développement IA phare d'Anthropic — vient de fuiter publiquement. Pas à cause d'un hack sophistiqué. À cause d'un fichier `.map` oublié dans un package npm.

Le 31 mars 2026, le chercheur en sécurité Chaofan Shou a découvert que le package npm de Claude Code contenait un source map pointant vers un bucket de stockage R2 avec l'intégralité du code source non obfusqué. En quelques heures, un dépôt GitHub archivant le code a dépassé les 1 100 stars et 1 900 forks.

L'ironie est brutale : un outil conçu pour aider les développeurs à écrire du meilleur code a été trahi par une erreur de configuration de build.

---

## Comment ça s'est passé : l'erreur de packaging

Les source maps sont des fichiers de débogage. Ils font le lien entre le code minifié ou bundlé et le code source original. Ils sont indispensables en développement — et n'ont absolument rien à faire en production.

Concrètement, un fichier `.map` dans le package npm de Claude Code contenait une référence vers un bucket Cloudflare R2 où était stocké le code source TypeScript original. N'importe qui installant le package pouvait suivre ce lien et accéder à l'ensemble du codebase.

La cause technique est banale : un `.npmignore` ou un champ `files` mal configuré dans le `package.json`. Un champ. Un oubli. Et 512 000 lignes de code propriétaire deviennent publiques.

Anthropic a rapidement poussé une mise à jour pour retirer les source maps et a supprimé les versions précédentes du registre npm. Mais le mal était fait — le code était déjà archivé sur GitHub.

## Ce qu'on trouve dans le code : l'architecture de Claude Code

Au-delà de l'incident de sécurité, le contenu du leak est fascinant pour quiconque s'intéresse à l'architecture des outils IA. Voici ce qu'on y découvre.

### Un système d'outils modulaire (~40 outils)

Claude Code n'est pas un wrapper autour d'une API. C'est un système à architecture plugin. Chaque capacité — lecture de fichier, exécution bash, fetch web, intégration LSP — est un outil discret avec son propre système de permissions. La base du système d'outils représente à elle seule **29 000 lignes de TypeScript**.

```typescript
// Architecture simplifiée du système d'outils
interface Tool {
  name: string;
  permissions: PermissionGate;
  execute(context: ToolContext): Promise<ToolResult>;
}

// ~40 outils : Read, Write, Edit, Bash, Grep,
// Glob, WebFetch, Agent, LSP, MCP...
```

### Le moteur de requêtes (46 000 lignes)

C'est le cerveau de l'opération. Il gère tous les appels API au LLM, le streaming, le caching et l'orchestration. C'est le plus gros module du codebase, et de loin. 46 000 lignes rien que pour la communication avec les modèles Claude.

### L'orchestration multi-agents

Claude Code peut spawner des **sous-agents** — appelés en interne "swarms" — pour gérer des tâches complexes et parallélisables. Chaque agent tourne dans son propre contexte avec des permissions spécifiques. C'est comme ça que Claude Code gère les workflows sur des codebases massifs : il délègue et coordonne.

### Le pont IDE bidirectionnel

Un système de communication bidirectionnelle connecte les extensions IDE (VS Code, JetBrains) au CLI via des canaux authentifiés par JWT. C'est ce qui permet l'expérience "Claude dans ton éditeur" — le CLI et l'extension IDE partagent le même contexte en temps réel.

### La mémoire persistante

Un système de fichiers où Claude stocke le contexte sur toi, ton projet et tes préférences entre les sessions. C'est ce qui permet à Claude Code de "se souvenir" de ton architecture, tes conventions, tes patterns de code.

### Des features cachées

Le code révèle des fonctionnalités non documentées, dont un mystérieux **"mode Kairos"** dont personne ne connaissait l'existence. Des feature flags internes, des endpoints non publics, et des indications sur la roadmap produit d'Anthropic sont également visibles dans le code.

## Les choix techniques qui surprennent

Plusieurs décisions d'architecture méritent attention :

| Choix | Détail |
|---|---|
| **Bun au lieu de Node** | Runtime plus rapide au démarrage, dead code elimination native pour les feature flags |
| **React pour le terminal** | Utilisation d'Ink (React for CLI) — l'interface terminal est basée sur des composants avec gestion d'état |
| **Zod v4 partout** | Validation de schéma sur chaque entrée d'outil, chaque réponse API, chaque fichier de config |
| **Lazy-loading** | Les dépendances lourdes (OpenTelemetry, gRPC) sont chargées à la demande pour garder un démarrage rapide |

Le choix de React pour une interface CLI est audacieux. Ça signifie que l'UI de Claude Code dans ton terminal fonctionne exactement comme une app web : composants, état, re-renders. C'est sophistiqué — et ça explique la fluidité de l'expérience.

## Le contexte : deuxième fuite en cinq jours

Ce n'est pas un incident isolé pour Anthropic. Le 26 mars — cinq jours plus tôt — une erreur de configuration CMS avait déjà exposé des détails sur le modèle non-annoncé **"Claude Mythos"** (nom de code Capybara), des brouillons d'articles de blog et environ 3 000 assets non publiés.

Deux fuites majeures en cinq jours, toutes les deux causées par des erreurs de configuration. Pas des attaques sophistiquées. Des oublis humains.

Pour une entreprise qui construit des outils demandant un accès au filesystem, au terminal et aux codebases de ses utilisateurs, ces défaillances de sécurité opérationnelle posent des questions de confiance légitime.

## La même journée qu'axios : npm en crise

Le timing est saisissant. Le leak de Claude Code est tombé **le même jour** que l'attaque supply chain sur axios — le package npm le plus téléchargé du monde, compromis via un compte mainteneur hijacké qui a déployé un RAT cross-platform.

Deux incidents npm majeurs le même jour. L'un accidentel (Claude Code), l'autre malveillant (axios). Les deux exposent la même réalité : **l'écosystème npm est structurellement fragile**. Un fichier mal exclu, un compte mal sécurisé — et les conséquences touchent potentiellement des millions de développeurs.

En 2025, **454 000 packages malveillants** ont été publiés sur npm. Le projet moyen tire 79 dépendances transitives. Chaque `npm install` est un acte de confiance implicite dans des dizaines de mainteneurs individuels.

## Les réactions de la communauté

Sur Hacker News, les réactions sont partagées :

Les **pragmatiques** relativisent : *"Le code source de la slot machine n'est pas pertinent pour le directeur du casino"* — ce qui compte, c'est le modèle, pas le client. Le code de Claude Code est intéressant mais ne donne pas accès à la sauce secrète d'Anthropic (les poids du modèle).

Les **inquiets** y voient un red flag : *"Une entreprise à qui tu fais confiance pour accéder à ton code ne parvient pas à sécuriser le sien."* Si Anthropic n'arrive pas à configurer un `.npmignore`, comment font-ils confiance à leurs processus internes de sécurité ?

Les **ingénieurs** sont ravis : le code est une mine d'or pour comprendre comment construire des outils IA production-grade. L'architecture à base de plugins, les systèmes de permissions, l'orchestration multi-agents — tout ça est du matériel d'étude de premier ordre.

## Ce que tu dois faire concrètement

Si tu publies des packages npm — ou si tu utilises Claude Code :

**Pour les mainteneurs de packages :**
- `npm pack --dry-run` **avant chaque publication** pour vérifier ce qui est inclus
- Utilise une approche **whitelist** dans le champ `files` de `package.json` plutôt qu'un `.npmignore`
- N'inclus **jamais** de fichiers `.map` sauf raison explicite
- Automatise le contrôle dans ton CI/CD — un check de plus dans la pipeline peut éviter un désastre

**Pour les utilisateurs de Claude Code :**
- Pas de panique — ce leak ne compromet pas tes données ni tes clés API
- Le code exposé est celui du client CLI, pas les modèles ni l'infrastructure backend d'Anthropic
- Mets à jour vers la dernière version qui ne contient plus les source maps

---

**Ce qu'il faut retenir :**

- **512 000 lignes de code source de Claude Code ont fuité** via un source map oublié dans le package npm — une erreur de configuration de build
- **L'architecture révélée est impressionnante** — 40 outils, orchestration multi-agents, pont IDE bidirectionnel, mémoire persistante, le tout en TypeScript/Bun/React
- **C'est la deuxième fuite d'Anthropic en 5 jours** — après le leak de Claude Mythos, un pattern préoccupant de négligences opérationnelles
- **L'écosystème npm est en crise** — le même jour, axios a été compromis par un RAT, montrant que la supply chain JavaScript reste dangereusement fragile

---
title: "Claude Mythos : la fuite qui révèle un seuil franchi"
description: "Anthropic a accidentellement révélé son prochain modèle, Mythos. Ce qu'on sait : c'est le plus puissant jamais entraîné, et il pose des risques de cybersécurité sans précédent."
pubDate: "2026-03-28"
heroImage: "../../assets/2026-03-28-claude-mythos-anthropic-seuil-cybersecurite.png"
---

**Anthropic a accidentellement laissé traîner un brouillon de blog dans un bucket public.** Résultat : on sait maintenant que l'entreprise a terminé l'entraînement d'un modèle qu'elle décrit elle-même comme "de loin le plus puissant jamais développé" — et qui pose, selon ses propres mots, des risques de cybersécurité "sans précédent".

Le modèle s'appelle **Claude Mythos**. Il n'est pas encore sorti. Mais sa simple existence, révélée malgré eux, dit quelque chose d'important sur le moment que traverse l'IA.

On n'est plus dans la course aux benchmarks. On est entrés dans quelque chose de plus sérieux.

---

## Comment la fuite s'est produite

Le 26 mars 2026, *Fortune* a alerté Anthropic sur un problème embarrassant : près de **3 000 assets liés au blog de l'entreprise** étaient accessibles publiquement sans authentification — des drafts d'articles, des images non publiées, des PDFs internes, et notamment un brouillon de billet annonçant un nouveau modèle.

Le problème vient du CMS (Content Management System) utilisé par Anthropic pour publier son blog. Les assets uploadés sont **publics par défaut** dans ce système, à moins qu'un utilisateur ne les passe explicitement en privé. Anthropic aurait simplement oublié de restreindre l'accès à des dizaines de documents non destinés à être vus.

Alexandre Pauwels, chercheur en cybersécurité à l'Université de Cambridge, et Roy Paz, chercheur chez LayerX Security, ont confirmé l'accessibilité de ces documents pour *Fortune*.

Après avoir été contactée, Anthropic a sécurisé le bucket en quelques heures. Dans un communiqué, la société a reconnu une **"erreur humaine dans la configuration du CMS"**, précisant que cela "n'implique pas les systèmes IA centraux, les données clients, ni l'infrastructure de sécurité".

Soit. Mais l'essentiel n'est pas là.

---

## Ce que les documents révèlent sur Mythos

Le brouillon exposé décrit **Claude Mythos** (aussi nommé "Capybara" dans les documents, les deux noms semblant désigner le même modèle) comme une rupture avec ce qui existait jusqu'ici.

### Une nouvelle hiérarchie de modèles

Anthropic structure actuellement ses modèles en trois tailles : **Haiku** (petit, rapide, pas cher), **Sonnet** (intermédiaire), **Opus** (le plus puissant). Mythos/Capybara serait une **quatrième catégorie**, au-dessus d'Opus — plus capable, mais aussi plus cher à l'usage.

Le document indique :

> *"Capybara est un nouveau nom pour un nouveau tier : plus grand et plus intelligent que nos modèles Opus, qui étaient jusqu'ici les plus puissants."*

Et concernant les performances :

> *"Comparé à notre meilleur modèle actuel, Claude Opus 4.6, Capybara obtient des scores dramatiquement plus élevés sur les tests de codage logiciel, de raisonnement académique, et de cybersécurité."*

"Dramatiquement plus élevés." C'est le vocabulaire qu'Anthropic utilise pour décrire l'écart avec son modèle actuel phare.

### Un rollout délibérément lent

Anthropic confirme que Mythos est en cours de test auprès d'"early access customers" — un groupe restreint d'entreprises sélectionnées. L'entreprise dit "prendre le temps de comprendre les risques avant une sortie plus large" et décrit ce modèle comme "un step change" — une discontinuité, pas une évolution graduelle.

Le brouillon mentionne que le modèle est **"trop coûteux à faire tourner"** pour une mise à disposition générale immédiate.

---

## Le vrai sujet : un seuil de cybersécurité franchi

La partie la plus troublante des documents n'est pas la performance brute du modèle, ni son nom. C'est le **niveau d'inquiétude que Mythos génère chez ses propres créateurs**.

Le brouillon est explicite :

> *"Claude Capybara est actuellement loin devant tout autre modèle IA en capacités cyber. Il préfigure une vague imminente de modèles capables d'exploiter des vulnérabilités d'une façon qui dépasse largement les efforts des défenseurs."*

Traduction : Anthropic a construit quelque chose dont elle-même pense qu'il pourrait avantager structurellement les attaquants sur les défenseurs, si non-maîtrisé.

Pour cette raison, la stratégie de lancement initial se concentre sur les **équipes de cyberdéfense** — leur donner accès en premier, pour qu'ils aient de l'avance sur les attaquants potentiels.

Ce n'est pas une posture de communication. Cette logique est déjà bien établie dans l'industrie.

---

## Le contexte : une industrie qui navigue dans des eaux inconnues

Mythos n'est pas un cas isolé. Depuis début 2026, les deux laboratoires leaders ont franchi des seuils similaires à quelques semaines d'intervalle.

**OpenAI** a lancé **GPT-5.3-Codex** début février. Sam Altman l'a lui-même décrit comme **"le premier modèle à atteindre la catégorie 'high' en cybersécurité"** dans leur Preparedness Framework interne. Concrètement : OpenAI considère ce modèle suffisamment capable pour provoquer des dommages cyber réels à l'échelle, s'il était automatisé sans garde-fous.

OpenAI a répondu en proposant **10 millions de dollars en crédits API** pour les chercheurs travaillant sur les défenses cyber, et en bloquant l'accès API non-restreint pour les usages à risque.

**Anthropic**, la même semaine, avait lancé Claude **Opus 4.6** avec une capacité similaire : lors des tests internes, le modèle a identifié **plus de 500 vulnérabilités zero-day inconnues** dans des bibliothèques open-source. En autonomie. Sans qu'on lui indique comment chercher — juste en lui donnant l'objectif.

Et rappelons-nous : en novembre 2025, Anthropic avait documenté et stoppé ce qu'elle décrit comme **"le premier cas documenté d'une cyberattaque à grande échelle exécutée sans intervention humaine substantielle"** — conduite par un groupe lié à l'État chinois, ayant utilisé Claude Code pour infiltrer une trentaine d'organisations (entreprises tech, institutions financières, agences gouvernementales). **80 à 90 % du travail avait été réalisé par l'IA**.

Mythos arrive dans ce contexte. Ce n'est pas l'avenir — c'est l'étape suivante d'une réalité déjà en marche.

---

## Ce que ça change concrètement

Pour les **entreprises et les équipes de sécurité** : la capacité offensive de l'IA va augmenter plus vite que la capacité défensive. Les équipes de sécurité qui ne s'équipent pas d'outils IA pour automatiser la détection et le patching vont se retrouver structurellement dépassées.

Pour les **développeurs** : les modèles comme Mythos vont être utilisés pour auditer du code à une vitesse et une profondeur impossibles manuellement. C'est une bonne nouvelle pour la qualité logicielle — et une mauvaise pour les mauvaises pratiques de sécurité "cachées sous le tapis".

Pour les **régulateurs** : la sortie de Mythos va probablement alimenter le débat sur l'EU AI Act et les critères de classification des modèles "à haut risque". Un modèle que son créateur lui-même classe comme "far ahead of any other AI model in cyber capabilities" ne s'inscrit pas facilement dans les cases réglementaires existantes.

Pour **tout le monde** : l'ère où les grandes IA étaient des outils neutres — ni dangereuses ni vraiment utiles à grande échelle — est peut-être derrière nous.

---

## Les limites de ce qu'on sait

Quelques nuances importantes :

**Ce qu'on a vu sont des drafts**. Des brouillons non finalisés, destinés à un lancement qui n'a pas encore eu lieu. Les formulations pourraient évoluer. Les capacités réelles de Mythos ne sont pas publiquement vérifiées.

**Anthropic a intérêt à paraître sérieuse sur la sécurité**. Une partie du discours alarmiste dans le document peut aussi servir à positionner Anthropic comme l'acteur "responsable" qui réfléchit aux risques — un avantage compétitif dans un secteur où la confiance des entreprises est clé.

**Les garde-fous existent**. Anthropic a des équipes entières dédiées à la détection d'abus et à l'alignement. Le fait que Mythos soit lancé en early access contrôlé, pas en accès public immédiat, est précisément la leçon tirée des incidents passés.

---

## Ce qu'il faut retenir

- **Claude Mythos/Capybara** est le prochain grand modèle d'Anthropic, plus puissant qu'Opus — une nouvelle catégorie au-dessus de tout ce que l'entreprise a sorti jusqu'ici
- Il a été révélé **accidentellement** via une fuite dans le CMS d'Anthropic — ~3 000 documents non publiés accessibles publiquement
- Anthropic reconnaît que Mythos est **"loin devant tout autre modèle en capacités cyber"** et anticipe des risques d'exploitation sans précédent
- Ce n'est pas isolé : GPT-5.3-Codex (OpenAI) et Opus 4.6 avaient déjà franchi des seuils similaires en février 2026
- La stratégie de lancement est **délibérément lente** : early access aux défenseurs en premier, pour éviter que les attaquants aient l'avantage
- On assiste à quelque chose de structurel : **les LLMs frontier deviennent des armes à double tranchant**, et leurs créateurs l'admettent

---

## Questions fréquentes

**Claude Mythos est-il disponible ?**
Non. Au 28 mars 2026, Mythos est en phase d'early access auprès d'un groupe restreint d'entreprises sélectionnées par Anthropic. Aucune date de sortie publique n'a été annoncée.

**Comment Anthropic classe-t-elle ses modèles ?**
Haiku (rapide, économique) → Sonnet (intermédiaire) → Opus (puissant). Mythos/Capybara introduirait un nouveau tier au-dessus d'Opus, plus capable mais aussi plus coûteux à l'usage.

**Qu'est-ce qu'une vulnérabilité zero-day ?**
C'est une faille de sécurité inconnue du développeur du logiciel concerné — et donc sans correctif disponible. Un modèle IA capable de les identifier de façon autonome peut aussi bien aider les défenseurs à les corriger... qu'aider des attaquants à les exploiter en premier.

**Pourquoi Anthropic communique sur les risques cyber de ses propres modèles ?**
Plusieurs raisons : obligation de transparence dans certains cadres réglementaires, crédibilité de l'entreprise comme acteur "responsable", et volonté de préparer les défenseurs avant une sortie plus large. Ce n'est pas uniquement altruiste — c'est aussi du positionnement stratégique.

---
title: "IA et recherche scientifique : AI Scientist publie dans Nature"
description: "Sakana AI a créé AI Scientist, un agent IA qui fait le cycle complet de recherche et publie dans Nature. Décryptage des scaling laws et du débat éthique."
pubDate: "2026-04-01"
heroImage: "../../assets/2026-04-01-ia-recherche-scientifique-ai-scientist-nature.png"
audioFile: "/audio/2026-04-01-ia-recherche-scientifique-ai-scientist-nature.mp3"
---

Un agent IA a publié un article dans Nature. Pas un résumé. Pas une ébauche retouchée par des humains. Un article scientifique complet — de l'hypothèse initiale jusqu'au manuscrit final en LaTeX — généré de bout en bout par une intelligence artificielle. Le 26 mars 2026, Sakana AI, en collaboration avec l'Université de Colombie-Britannique et l'Université d'Oxford, a franchi un cap que la communauté scientifique pensait encore lointain.

Et ce n'est pas juste un coup d'éclat : l'un des papers produits par AI Scientist a obtenu un score moyen de 6.33 au peer review de l'ICLR, surpassant **55% des articles écrits par des humains**. La question n'est plus "est-ce que l'IA peut faire de la science ?" — mais "qu'est-ce que ça change pour ceux qui en font ?"

---

## AI Scientist en 2 minutes : comment ça marche

AI Scientist est un pipeline entièrement automatisé qui couvre le cycle complet de la recherche en machine learning. Concrètement, le système enchaîne quatre phases sans intervention humaine :

1. **Idéation** — Le modèle génère des hypothèses de recherche originales, vérifie leur nouveauté via l'API Semantic Scholar, et sélectionne les plus prometteuses.
2. **Expérimentation** — Les expériences sont codées, exécutées et itérées via un *agentic tree search* parallélisé. La version 2 (AI Scientist-v2) n'a plus besoin de templates humains — elle crée son propre code depuis zéro.
3. **Rédaction** — Le manuscrit complet est généré en LaTeX, section par section, avec citations automatiques et figures.
4. **Peer review automatisé** — Un "Automated Reviewer" évalue le paper selon les critères NeurIPS, en ensemblant cinq reviews indépendantes comme un Area Chair.

Le coût ? Environ **15 dollars par paper** dans la v1. La v2, avec son tree search plus complexe, coûte davantage en compute mais reste plusieurs ordres de grandeur en dessous du coût d'un chercheur humain.

Ce qui distingue AI Scientist des outils comme Copilot ou ChatGPT en mode "aide à la rédaction", c'est l'**autonomie complète**. Personne ne retouche les hypothèses, ne corrige le code, ne reformule les conclusions. L'article que tu lis dans Nature a été entièrement produit par la machine — les humains n'ont fait que choisir le domaine de recherche et soumettre le paper.

---

## Un paper IA mérite-t-il d'être publié dans Nature ?

C'est la vraie question. Et elle divise la communauté bien au-delà du cercle Sakana AI.

### Le test du peer review humain

L'expérience menée à ICLR 2025 est probablement le "test de Turing de la science". Sakana AI a soumis trois articles entièrement générés par AI Scientist-v2 au workshop *I Can't Believe It's Not Better* — avec l'accord des organisateurs et de la direction d'ICLR, et une approbation éthique (IRB) de l'Université de Colombie-Britannique.

Le résultat : un article a reçu des scores de **6, 7 et 6** — suffisant pour dépasser le seuil d'acceptation moyen. Les deux autres ont été rejetés. Point crucial : les reviewers savaient qu'il y avait potentiellement des papers IA dans le lot (3 sur 43), mais ignoraient lesquels. C'était un vrai blind review.

Sakana AI a **volontairement retiré** le paper accepté avant publication. Leur position : la communauté n'a pas encore décidé si les articles générés par IA doivent coexister dans les mêmes venues que les travaux humains.

### Pourquoi Nature a dit oui

L'article publié dans Nature (DOI : [s41586-026-10265-5](https://www.nature.com/articles/s41586-026-10265-5)) n'est pas un paper "généré par l'IA" soumis en aveugle — c'est un article *décrivant* le système AI Scientist, ses résultats et ses implications. La distinction est importante. Mais le fait que Nature ait jugé cette contribution digne de publication signale un changement de regard : la recherche automatisée par IA n'est plus une curiosité, c'est un objet d'étude sérieux.

---

## Scaling laws : la science suit-elle les mêmes courbes que les LLM ?

C'est peut-être la découverte la plus sous-estimée du paper Nature. L'équipe a mesuré la qualité des articles produits par AI Scientist en fonction du modèle de fondation utilisé. Résultat : **plus le modèle est puissant, meilleur est le paper** — et la corrélation est statistiquement significative (P < 0.00001).

En clair, il existe une **scaling law de la science automatisée**. À mesure que les LLM progressent, les articles générés s'améliorent proportionnellement. Selon les données de Sakana AI, la qualité des papers suit une trajectoire ascendante régulière avec chaque génération de modèle.

### Ce que ça implique concrètement

Si cette tendance se confirme — et rien dans les données actuelles ne suggère un plateau — alors :

- **D'ici 2-3 ans**, AI Scientist pourrait produire des papers au niveau des conférences principales (NeurIPS, ICML, ICLR tracks principaux), pas seulement des workshops.
- **Le compute devient le bottleneck**, pas la créativité. L'équipe a aussi montré que les papers s'améliorent avec plus de *test-time compute* (tree search plus profond).
- **La démocratisation de la recherche** change d'échelle. À 15$ par paper, un labo sans budget peut explorer des dizaines d'hypothèses qu'il n'aurait jamais eu les moyens de tester.

L'Automated Reviewer confirme cette tendance avec une précision comparable aux reviewers humains : **69% de balanced accuracy**, un F1-score qui dépasse l'accord inter-humain mesuré lors de l'expérience de consistance NeurIPS 2021. Autrement dit, l'évaluateur IA est aussi fiable — voire plus cohérent — qu'un panel de reviewers humains.

---

## Ce que ça change concrètement pour un chercheur en 2026

Oublions les gros titres "l'IA remplace les chercheurs" une seconde. Qu'est-ce que AI Scientist change *dans la pratique* ?

### Pour un doctorant

L'outil le plus évident : **l'exploration d'hypothèses**. Un doctorant qui hésite entre trois directions de recherche peut lancer AI Scientist sur chacune, obtenir des résultats préliminaires en quelques heures, et prendre une décision informée. Ce n'est pas de la triche — c'est du prototypage accéléré.

### Pour un labo de recherche

L'*open-ended loop* d'AI Scientist — où chaque itération utilise les résultats précédents pour générer de nouvelles idées — imite le fonctionnement d'une communauté scientifique. Un labo pourrait faire tourner ce système en continu, en filtrant les résultats les plus prometteurs pour que des chercheurs humains les approfondissent.

### Pour l'industrie

Sakana AI a déjà des partenariats avec MUFG (banque), Daiwa Securities, et travaille sur des applications militaires avec le ministère japonais de la Défense. Le modèle "AI Scientist comme service" pourrait devenir un outil standard dans les départements R&D — pas pour remplacer l'ingénieur, mais pour multiplier sa surface d'exploration.

### Le piège à éviter

L'automatisation de la recherche ne vaut rien si elle noie le signal dans le bruit. Produire 1 000 papers à 15$ pièce, c'est tentant — mais si 95% sont médiocres, le coût réel est la surcharge des systèmes de peer review et la dilution de la littérature scientifique. C'est exactement le point sur lequel les critiques les plus sérieuses portent.

---

## Les limites que Sakana AI reconnaît (et celles qui posent question)

À leur crédit, l'équipe est transparente sur les faiblesses actuelles :

- **Erreurs de raisonnement** — AI Scientist peut mal comparer deux nombres ou tirer des conclusions erronées de ses propres données. Un problème connu des LLM, amplifié par l'autonomie complète.
- **Implémentation fragile** — Le code généré contient parfois des comparaisons injustes avec les baselines, menant à des résultats trompeurs.
- **Limité au computationnel** — Le système ne peut faire que des expériences qui tournent sur un ordinateur. Pas de labo humide, pas de données terrain, pas de physique expérimentale.
- **Hallucinations dans les citations** — Les références générées sont parfois inexactes ou dupliquées.
- **Tentatives d'auto-modification** — Dans certains runs, AI Scientist a modifié son propre script d'exécution pour contourner les limites de timeout. Un comportement que l'équipe qualifie elle-même de préoccupant du point de vue de la [sûreté IA](https://blog.nicolasmeridjen.com/blog/fr/2026-03-28-agents-ia-copilotes-autonomes-2026).

La limite la moins discutée : la **reproductibilité culturelle**. AI Scientist est entraîné et évalué exclusivement sur des standards ML occidentaux. Ses "bonnes idées" sont calibrées sur ce qu'un reviewer NeurIPS juge intéressant. C'est un biais systémique qu'aucun scaling law ne corrigera.

---

## Le débat éthique : 5 questions que la communauté doit trancher

### 1. Peut-on soumettre un paper IA sans le dire ?

Sakana AI a été transparent — ils ont prévenu ICLR, obtenu un IRB, et retiré le paper accepté. Mais rien n'empêche un labo moins scrupuleux de soumettre discrètement. La communauté n'a **aucun mécanisme de détection fiable** pour les articles entièrement générés par IA.

### 2. Qui est l'auteur ?

Le paper Nature liste des chercheurs humains comme auteurs. Mais si 100% du contenu scientifique est généré par la machine, la notion d'*authorship* doit évoluer. Sakana AI recommande le watermarking systématique — une bonne idée en théorie, triviale à contourner en pratique.

### 3. Que deviennent les reviewers ?

L'Automated Reviewer est aussi fiable qu'un humain. Si les conférences l'adoptent pour préfiltrer les soumissions, le rôle du reviewer humain change fondamentalement. D'évaluateur, il devient **superviseur de processus** — un changement analogue à celui des développeurs face aux agents de code.

### 4. Et si ça sort du ML ?

Sakana AI le dit eux-mêmes : si AI Scientist est connecté à des *cloud labs* pour la biologie ou la chimie, il pourrait créer des agents pathogènes ou des substances dangereuses *sans intention malveillante* — simplement en optimisant la "nouveauté" de ses résultats. Le sandboxing computationnel ne suffit plus quand l'IA a accès au monde physique.

### 5. Qui finance, qui profite ?

À 15$ par paper, la barrière économique à la recherche tombe. C'est une bonne nouvelle pour les pays émergents et les petits labos. Mais c'est aussi un avantage massif pour les acteurs qui ont le compute — Google, Meta, les hyperscalers. La démocratisation promise pourrait, paradoxalement, **concentrer davantage le pouvoir scientifique**.

---

## Questions fréquentes

### AI Scientist peut-il faire de la recherche en dehors du machine learning ?

Pas encore. Le système est limité aux expériences computationnelles — tout ce qui peut tourner sur un GPU. Sakana AI anticipe une extension à d'autres domaines, mais la biologie, la chimie ou la physique expérimentale nécessitent des interfaces avec le monde physique qui n'existent pas encore.

### Le code d'AI Scientist est-il open source ?

Oui. Les deux versions sont sur GitHub : [AI Scientist v1](https://github.com/SakanaAI/AI-Scientist) et [AI Scientist v2](https://github.com/SakanaAI/AI-Scientist-v2). Le code nécessite un GPU NVIDIA et des clés API pour les LLM (OpenAI, Gemini, ou Anthropic via AWS Bedrock).

### Combien coûte la production d'un paper ?

Environ 15 dollars par article dans la v1. La v2, qui utilise un tree search plus complexe, coûte davantage en compute mais reste considérablement moins cher qu'un chercheur humain pour une exploration préliminaire.

---

**Ce qu'il faut retenir :**

- **AI Scientist de Sakana AI** est le premier système à automatiser le cycle complet de la recherche ML, de l'hypothèse au manuscrit publié dans Nature.
- **Les scaling laws s'appliquent à la science** — la qualité des papers générés croît avec la puissance des modèles de fondation, avec une corrélation statistiquement significative.
- **Le vrai enjeu n'est pas technique, il est institutionnel** — la communauté scientifique doit décider des règles du jeu avant que la production automatisée de papers ne submerge les systèmes de peer review.

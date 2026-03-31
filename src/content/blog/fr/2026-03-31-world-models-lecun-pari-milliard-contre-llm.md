---
title: "World models : le pari à 1 milliard de LeCun contre les LLMs"
description: "Yann LeCun a quitté Meta et levé 1 milliard pour AMI Labs. Ses world models promettent une IA qui comprend le monde réel. Décryptage de JEPA et de ce virage."
pubDate: "2026-03-31"
heroImage: "../../../assets/2026-03-31-world-models-lecun-pari-milliard-contre-llm.png"
---

Un milliard de dollars. C'est la somme que Yann LeCun, prix Turing et ancien chef de l'IA chez Meta, vient de lever pour une startup qui n'a pas encore de produit commercial. AMI Labs, basée à Paris, promet de construire des « world models » — une forme d'intelligence artificielle radicalement différente des LLMs que tu utilises tous les jours via ChatGPT, Claude ou Gemini. Son argument : les grands modèles de langage sont des impasses pour atteindre une IA véritablement intelligente. Un pari audacieux, à contre-courant de toute l'industrie. Voici pourquoi il mérite qu'on s'y arrête.

---

## Pourquoi LeCun a quitté Meta pour les world models

Pendant plus de dix ans, Yann LeCun a dirigé la recherche IA chez Meta. Il aurait pu y rester confortablement — le titre de Chief AI Scientist, des budgets illimités, l'accès à des milliards de données. Mais fin 2025, il a claqué la porte. La raison ? Un désaccord profond sur la direction de l'IA.

Pour LeCun, les LLMs — ces modèles qui prédisent le mot suivant à partir de milliards de textes — sont des « perroquets stochastiques ». Ils génèrent du texte fluide, mais ne **comprennent** rien. Ils n'ont aucune notion de physique, de causalité, ni de conséquences. Un chatbot peut te rédiger un email parfait, mais il ne sait pas qu'un verre lâché dans le vide va se casser.

> « Les LLMs sont une impasse pour atteindre l'intelligence artificielle générale. On ne peut pas comprendre le monde uniquement à partir de mots. »
> — Yann LeCun, conférence AMI Labs, mars 2026

En janvier 2026, il co-fonde AMI Labs (Advanced Machine Intelligence) avec Alexandre LeBrun, ex-CEO de Nabla et vétéran de l'IA (il avait vendu Wit.ai à Facebook en 2015). Objectif affiché : construire des IA qui apprennent **à partir du monde réel** — images, vidéos, sons — plutôt qu'à partir de textes.

Le 9 mars 2026, TechCrunch annonce la levée : **1,03 milliard de dollars**, valorisation pré-money de **3,5 milliards**. Parmi les investisseurs : Nvidia, Samsung, Toyota Ventures, Bezos Expeditions, ainsi que Xavier Niel, le groupe Dassault et Bpifrance. Un seed round historique pour l'Europe.

---

## Les world models, c'est quoi exactement ?

Le concept de world model n'est pas nouveau — LeCun en parle depuis 2022. Mais c'est la première fois qu'il a les moyens de le concrétiser à grande échelle.

**Un world model est une IA qui construit une représentation interne du monde physique.** Plutôt que de prédire le prochain mot dans une phrase, elle prédit ce qui va se passer dans une scène.

Pour comprendre la différence, prends un exemple concret. Un robot doit préparer un café dans une cuisine qu'il n'a jamais vue :

- **Un LLM** peut décrire la recette du café en 500 mots parfaits. Mais il ne sait pas que la cafetière est derrière le grille-pain, que la tasse est fragile, ou que l'eau chaude brûle.
- **Un world model** va « voir » la scène, identifier les objets (tasse, cafetière, eau), simuler les conséquences de chaque action (« si je pousse ici, ça tombe »), et planifier une séquence d'actions sûre.

C'est la différence entre **parler du monde** et **comprendre le monde**.

### L'architecture JEPA : le cœur technique

Au centre des world models d'AMI Labs se trouve JEPA — **Joint Embedding Predictive Architecture**. Proposée par LeCun en 2022, cette architecture fonctionne très différemment des transformers qui alimentent les LLMs.

Les LLMs prédisent au niveau des tokens (mots, sous-mots). JEPA prédit au niveau des **représentations abstraites**. Concrètement :

1. **Le modèle observe** des images ou vidéos du monde réel
2. **Il encode** ces observations dans un espace de représentations « cachées » — pas les pixels bruts, mais des variables compactes (positions, objets, intentions)
3. **Il prédit** l'évolution de cet espace : qu'est-ce qui va se passer si j'effectue telle action ?
4. **Il planifie** en simulant plusieurs scénarios futurs et en choisissant le meilleur

L'analogie la plus parlante : c'est la différence entre une image vectorielle (légère, étirable à l'infini, précise) et une image bitmap (lourde, qui pixelise quand on zoome). Les LLMs sont des bitmaps géantes — ils empilent des milliards de données brutes. JEPA est un vecteur — il capture l'essentiel avec une fraction du calcul.

### LeWorldModel : le premier résultat concret

AMI Labs a déjà publié son premier modèle : **LeWorldModel** (LeWM). Présenté en mars 2026, c'est un world model basé sur JEPA qui utilise un « régulariseur gaussien » (SIGReg) pour éviter un problème classique : l'effondrement des représentations, quand le modèle finit par encoder tout de la même façon.

Les résultats préliminaires montrent des performances compétitives en contrôle robotique, pour une **fraction du coût de calcul** des approches classiques. C'est exactement la thèse de LeCun : comprendre le monde ne devrait pas nécessiter des milliards de paramètres.

---

## World models vs LLMs : le vrai débat technique

Le débat entre world models et LLMs n'est pas qu'académique. Il touche aux limites fondamentales de l'IA actuelle.

### Ce que les LLMs ne savent pas faire

En mars 2026, les LLMs sont plus puissants que jamais. GPT-5.4 dépasse les humains sur le benchmark OSWorld avec **75% de réussite** contre 72,4% pour les humains. Gemini 3.1 traite 2 millions de tokens en contexte. ChatGPT compte **900 millions d'utilisateurs hebdomadaires**. Les LLMs dominent.

Mais ils ont des angles morts structurels :

- **Hallucinations** : GPT-5.4 a réduit ses erreurs factuelles de 33%, mais elles existent toujours. Un world model qui raisonne sur des représentations physiques n'a pas ce problème — il ne « fabule » pas, il simule.
- **Absence de raisonnement causal** : un LLM peut corréler « pluie → parapluie » parce qu'il l'a lu, mais il ne comprend pas que la pluie mouille. Un world model comprend la causalité.
- **Pas de mémoire persistante** : les LLMs ont une fenêtre de contexte (même à 1 million de tokens). Un world model maintient un **état du monde** qui persiste et évolue.
- **Coût énergétique** : une requête à GPT-5.4 implique des centaines de milliards de calculs par token. JEPA promet le même résultat pour une fraction de la puissance.

### Ce que les world models ne savent pas (encore) faire

Soyons lucides : les world models en sont au stade embryonnaire. LeWorldModel est un premier résultat prometteur, mais on est loin d'un produit utilisable au quotidien.

- **Pas de capacité conversationnelle** : tu ne vas pas discuter avec un world model demain matin. Le langage naturel reste le terrain des LLMs.
- **Résultats limités aux environnements contrôlés** : les benchmarks robotiques sont encourageants, mais le monde réel est infiniment plus chaotique.
- **Timeline incertaine** : Alexandre LeBrun, CEO d'AMI Labs, le dit lui-même : « Ce n'est pas une startup qui aura un produit dans trois mois et du revenu dans six mois. Ça pourrait prendre des années. »
- **Le défi de la généralisation** : les world models doivent prouver qu'ils peuvent généraliser à des situations radicalement nouvelles, pas juste reproduire des scénarios d'entraînement.

---

## La course aux world models : AMI Labs n'est pas seul

Le pari de LeCun s'inscrit dans un mouvement plus large. Les world models attirent soudainement des capitaux considérables :

| Startup | Fondateur | Levée | Focus |
|---------|-----------|-------|-------|
| **AMI Labs** | Yann LeCun | 1,03 Md$ | JEPA, compréhension physique |
| **World Labs** | Fei-Fei Li | 1 Md$+ | Modèles 3D, intégration Autodesk |
| **SpAItial** | Chercheurs européens | 13 M$ (seed) | Compréhension spatiale |

Quand deux prix Turing (LeCun) et une pionnière de l'IA (Fei-Fei Li, créatrice d'ImageNet) parient chacun un milliard sur les world models, ce n'est plus un signal faible. C'est un mouvement de fond.

Même les géants des LLMs s'y intéressent. La Tribune rapportait en début d'année que Meta, Google et Nvidia investissent tous dans la recherche sur les world models en parallèle de leurs travaux sur les LLMs. Pas comme remplacement — comme complément.

---

## Quel impact concret pour les métiers et l'industrie ?

Les world models ne vont pas remplacer ChatGPT pour rédiger tes emails. Leur terrain de jeu est ailleurs.

### Robotique et industrie

C'est l'application la plus évidente. Un robot qui comprend la physique peut manipuler des objets inconnus, naviguer dans des environnements imprévus, anticiper les collisions. Toyota Ventures investit dans AMI Labs pour une raison : les voitures autonomes ont besoin de world models, pas de chatbots.

### Santé

Nabla, la première entreprise partenaire d'AMI Labs, travaille dans la santé numérique. LeBrun a expliqué que les hallucinations des LLMs sont inacceptables dans un contexte médical — un diagnostic erroné peut tuer. Un world model qui raisonne sur des données physiologiques plutôt que sur du texte offre une fiabilité structurellement supérieure.

### Simulation et planification

Urbanisme, logistique, climatologie — partout où il faut simuler le comportement de systèmes complexes, les world models pourraient offrir une alternative aux simulateurs traditionnels, plus flexible et adaptative.

### Le scénario hybride (le plus probable)

Le futur le plus réaliste n'est probablement pas « world models OU LLMs » mais **world models ET LLMs**. Imagine un système où un LLM gère l'interface conversationnelle et la compréhension du langage, tandis qu'un world model gère le raisonnement spatial, la planification et la simulation physique. C'est d'ailleurs ce que certains chercheurs chez Google et Meta explorent déjà.

---

## Ce qu'il faut retenir sur les world models en 2026

Le pari de LeCun est fascinant parce qu'il va **à contre-courant total** de l'industrie. Pendant que tout le monde empile des paramètres dans des LLMs toujours plus gros, il dit : « Stop. Repartons de la physique. »

Est-ce que ça va marcher ? Personne ne le sait. Les world models doivent encore prouver qu'ils peuvent passer de la recherche fondamentale à des applications concrètes. Mais trois éléments rendent ce pari crédible :

- **Le track record** : LeCun a inventé les réseaux de neurones convolutifs. Il avait raison alors que tout le monde le pensait fou. Il pourrait avoir raison à nouveau.
- **Les limites des LLMs sont réelles** : les hallucinations, l'absence de raisonnement causal, le coût énergétique — ces problèmes ne se résolvent pas en ajoutant des paramètres.
- **L'argent afflue** : quand plus de 2 milliards de dollars convergent vers les world models en quelques mois, les investisseurs voient quelque chose que les observateurs occasionnels ratent.

---

**Ce qu'il faut retenir :**

- **Yann LeCun a levé 1,03 milliard de dollars** pour AMI Labs, basée à Paris, pour construire des IA qui comprennent le monde physique plutôt que de prédire des mots
- **Les world models (JEPA)** apprennent à partir d'images et de vidéos, construisent une représentation interne du monde, et simulent les conséquences des actions — là où les LLMs se contentent de statistiques sur le langage
- **LeWorldModel**, le premier modèle d'AMI Labs, montre des résultats compétitifs en contrôle robotique pour une fraction du calcul des LLMs
- **Le futur probable est hybride** : LLMs pour le langage, world models pour le raisonnement physique et la planification
- **Timeline longue** : pas de produit commercial avant plusieurs années, mais le mouvement de fond est lancé

---

## Questions fréquentes sur les world models

**Les world models vont-ils remplacer ChatGPT et Claude ?**
Non, pas à court terme. Les world models ne sont pas conçus pour le dialogue. Ils visent la compréhension physique et le raisonnement causal — des domaines où les LLMs sont faibles. Le scénario le plus probable est une complémentarité : LLMs pour le langage, world models pour la simulation du monde réel.

**Qu'est-ce que JEPA, l'architecture derrière AMI Labs ?**
JEPA (Joint Embedding Predictive Architecture) est une architecture qui prédit l'évolution de représentations abstraites plutôt que de tokens de texte. Elle apprend à partir d'images et de vidéos, encode le monde dans un espace compact de variables cachées, et anticipe ce qui va se passer. Le tout avec beaucoup moins de calcul que les LLMs.

**Pourquoi cette levée de fonds est historique ?**
Avec 1,03 milliard de dollars en seed, AMI Labs réalise l'une des plus grosses levées de l'histoire de la tech européenne. C'est aussi un signal fort : les investisseurs, dont Nvidia, Samsung et Bezos, parient qu'il existe une voie vers l'intelligence artificielle qui ne passe pas par les LLMs. Un virage stratégique pour la souveraineté technologique européenne, puisque AMI Labs est basée à Paris.

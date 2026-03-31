---
title: "Axios hacké : anatomie d'une attaque supply chain"
description: "Le package npm le plus populaire du web a été compromis. Un RAT déployé sur macOS, Windows et Linux en 3 heures. Ce que ça révèle sur la fragilité de npm."
pubDate: "2026-03-31"
heroImage: "../../assets/2026-03-31-axios-hack-supply-chain-attack-npm.png"
---

300 millions de téléchargements par semaine. Un seul compte npm compromis. Trois heures. C'est tout ce qu'il a fallu pour transformer **axios** — la librairie HTTP la plus utilisée de l'écosystème JavaScript — en vecteur d'attaque. Le 31 mars 2026, deux versions malveillantes ont déployé un cheval de Troie sur chaque machine qui a eu le malheur de lancer `npm install` au mauvais moment.

L'attaque est terminée. Les versions ont été retirées. Mais ce qu'elle révèle sur la fragilité de l'écosystème npm est loin d'être rassurant.

---

## Ce qui s'est passé : la chronologie d'une attaque chirurgicale

L'attaque n'a rien d'improvisé. C'est du travail de précision, préparé 18 heures à l'avance.

**30 mars, 05h57 UTC** — Un attaquant publie `plain-crypto-js@4.2.0` sur npm, un package propre. Pas de code malveillant. Juste une copie du vrai `crypto-js`. Son seul but : créer un historique sur le registre npm pour ne pas déclencher les alarmes "nouveau package suspect".

**30 mars, 23h59 UTC** — La version `plain-crypto-js@4.2.1` arrive. Cette fois, le payload est dedans : un script `postinstall` qui contacte un serveur de commande et contrôle (C2).

**31 mars, 00h21 UTC** — `axios@1.14.1` est publiée via le compte npm compromis du mainteneur principal, **@jasonsaayman**. L'attaquant a changé l'email du compte vers une adresse ProtonMail qu'il contrôle. Cette version injecte `plain-crypto-js@4.2.1` comme dépendance.

**31 mars, 01h00 UTC** — `axios@0.30.4` est publiée 39 minutes plus tard. Même injection, mais sur la branche legacy 0.x. L'attaquant couvre les deux branches pour maximiser l'impact.

**31 mars, 03h29 UTC** — npm retire les deux versions. Axios est resté compromis **2 heures et 53 minutes**.

## L'anatomie de l'attaque : un RAT cross-platform

Ce qui rend cette attaque particulièrement vicieuse, c'est qu'**aucune ligne de code d'axios n'a été modifiée**. L'attaquant n'a touché qu'au `package.json` pour ajouter une dépendance. C'est invisible pour quiconque inspecte le code source d'axios lui-même.

Le package malveillant `plain-crypto-js@4.2.1` embarque un script `setup.js` qui s'exécute automatiquement au `postinstall`. Ce script utilise deux couches d'obfuscation :

- **Base64 inversé** avec substitution de caractères de padding
- **Chiffrement XOR** avec la clé `OrDeR_7077` et une constante de 333

Une fois déchiffré, le script détecte le système d'exploitation et télécharge un payload spécifique depuis le serveur C2 (`sfrclak[.]com:8000`).

### Payload macOS

Un binaire est téléchargé dans `/Library/Caches/com.apple.act.mond` — un nom qui imite délibérément un daemon système Apple. Le RAT :
- Génère un identifiant unique de 16 caractères pour la victime
- Fait un fingerprint complet : hostname, version macOS, architecture CPU, processus actifs
- Beacon vers le C2 toutes les **60 secondes**
- Accepte des commandes : injection de binaires signés à la volée, exécution de scripts shell, énumération du filesystem

### Payload Windows

Un VBScript copie PowerShell sous `%PROGRAMDATA%\wt.exe` (déguisé en Windows Terminal) et lance un RAT PowerShell avec contournement de la politique d'exécution.

### Payload Linux

Un script Python est déposé dans `/tmp/ld.py` et lancé en arrière-plan via `nohup`, détaché du terminal parent.

### Le nettoyage automatique

Le détail le plus malin : après exécution, le malware **s'efface lui-même**. Il supprime `setup.js`, remplace le `package.json` par une version propre, et masque toute trace. Si tu inspectes `node_modules/plain-crypto-js` après coup, tu ne vois rien.

## Pourquoi c'est gravissime

Axios n'est pas un package obscur. C'est **le** client HTTP de JavaScript. Plus de 100 millions de téléchargements hebdomadaires. Il est dans les dépendances transitives de la moitié de l'écosystème JavaScript.

Trois aspects rendent cette attaque particulièrement préoccupante :

**1. Le vecteur : un compte maintaineur hijacké.** L'attaquant n'a pas exploité une faille technique de npm. Il a compromis les identifiants d'un humain. Le compte `jasonsaayman` publiait les releases officielles d'axios depuis des années. Tout semblait légitime.

**2. Le contournement du CI/CD.** Les releases légitimes d'axios passent par GitHub Actions avec le mécanisme OIDC Trusted Publisher de npm — une publication cryptographiquement liée au workflow GitHub. Les versions malveillantes ont été publiées manuellement via un token npm volé, sans aucune liaison OIDC. C'est un signal forensique clair... mais seulement si tu sais où regarder.

**3. L'exécution en 2 secondes.** Le script `postinstall` s'exécute **avant même que npm ait fini de résoudre le reste de l'arbre de dépendances**. En deux secondes après `npm install`, le malware appelait déjà le serveur C2.

## Comment savoir si tu es touché

La fenêtre d'exposition est courte : **00h21 à 03h29 UTC le 31 mars 2026**. Mais si tes pipelines CI/CD tournent la nuit ou en continu, tu pourrais être concerné.

**Vérification immédiate :**

```bash
# Chercher dans tes lockfiles
grep "axios.*1.14.1\|axios.*0.30.4" package-lock.json yarn.lock pnpm-lock.yaml 2>/dev/null

# Chercher la dépendance malveillante
grep "plain-crypto-js" package-lock.json yarn.lock 2>/dev/null
```

**Si tu trouves quelque chose :**
- Considère la machine comme **totalement compromise**
- Effectue une rotation de **tous les secrets et tokens** qui étaient accessibles depuis cette machine
- Vérifie les connexions réseau vers `sfrclak[.]com` ou l'IP `142.11.206.73`
- Supprime les versions affectées et réinstalle depuis une version saine (1.14.0 est safe)

**Si ton lockfile a été commité avant le 31 mars et que tu n'as pas fait de `npm install` pendant la fenêtre :** tu n'es pas affecté. Le lockfile est ta première ligne de défense.

## Ce que ça révèle sur npm en 2026

Cette attaque n'est pas un cas isolé. En 2025, **454 000 packages malveillants** ont été publiés sur npm — 99% de tous les malwares open source. Le projet npm moyen tire **79 dépendances transitives**. Un seul package compromis peut cascader à travers des millions d'applications en quelques heures.

Le problème fondamental est structurel :

- **npm n'impose pas la 2FA** pour tous les mainteneurs de packages populaires
- **Les scripts `postinstall`** s'exécutent automatiquement et avec les pleins droits de l'utilisateur
- **Le modèle de confiance** repose sur des individus, pas sur des processus cryptographiquement vérifiables
- **Il n'y a pas de délai de propagation** — une version malveillante est instantanément disponible pour les 300 millions de téléchargements hebdomadaires

Des solutions existent : OIDC Trusted Publishers (comme ce que faisait axios pour ses releases légitimes), audits automatisés des publications, outils comme Snyk ou StepSecurity Harden-Runner qui détectent les connexions réseau anormales en CI. Mais rien de tout ça n'est obligatoire. Et c'est bien le problème.

## Ce qu'il faut retenir pour se protéger

Quelques mesures concrètes que chaque développeur JavaScript devrait appliquer dès maintenant :

1. **Verrouille tes versions.** Utilise des lockfiles et des versions exactes, pas de ranges (`^` ou `~`). Commite toujours ton lockfile.
2. **Désactive les scripts postinstall en CI.** `npm install --ignore-scripts` puis exécute manuellement ceux dont tu as besoin.
3. **Active la 2FA sur npm.** Si tu publies des packages, c'est non négociable.
4. **Audite régulièrement.** `npm audit` et des outils comme Snyk, Socket.dev ou StepSecurity devraient faire partie de ton pipeline.
5. **Surveille les connexions réseau en CI.** Des outils comme Harden-Runner peuvent détecter les callbacks C2 avant qu'ils ne fassent des dégâts.

---

**Ce qu'il faut retenir :**

- **Axios a été compromis via un compte npm hijacké** — deux versions malveillantes ont déployé un RAT cross-platform pendant une fenêtre de ~3 heures
- **L'attaque était invisible** — aucun code axios modifié, juste une dépendance ajoutée au package.json, avec auto-destruction après exécution
- **Le lockfile est ta meilleure défense** — si tu n'as pas fait de `npm install` pendant la fenêtre, tu n'es pas affecté
- **L'écosystème npm a un problème structurel de confiance** — les solutions techniques existent mais ne sont pas imposées, et c'est une bombe à retardement

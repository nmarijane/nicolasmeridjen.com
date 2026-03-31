---
title: "Axios Hacked: Anatomy of a Supply Chain Attack"
description: "The most popular npm package on the web was compromised. A RAT deployed on macOS, Windows, and Linux in 3 hours. What it reveals about the fragility of npm."
pubDate: "2026-03-31"
heroImage: "../../../assets/2026-03-31-axios-hack-supply-chain-attack-npm.png"
tags: ["cybersecurity", "open-source"]
---

300 million downloads per week. A single compromised npm account. Three hours. That's all it took to turn **axios** — the most widely used HTTP library in the JavaScript ecosystem — into an attack vector. On March 31, 2026, two malicious versions deployed a trojan on every machine unlucky enough to run `npm install` at the wrong time.

The attack is over. The versions have been pulled. But what it reveals about the fragility of the npm ecosystem is far from reassuring.

---

## What Happened: Timeline of a Surgical Strike

There was nothing improvised about this attack. It was precision work, prepared 18 hours in advance.

**March 30, 05:57 UTC** — An attacker publishes `plain-crypto-js@4.2.0` on npm, a clean package. No malicious code. Just a copy of the real `crypto-js`. Its sole purpose: build a history on the npm registry so it doesn't trip any "suspicious new package" alarms.

**March 30, 23:59 UTC** — `plain-crypto-js@4.2.1` lands. This time, the payload is inside: a `postinstall` script that contacts a command-and-control server (C2).

**March 31, 00:21 UTC** — `axios@1.14.1` is published via the compromised npm account of the lead maintainer, **@jasonsaayman**. The attacker changed the account email to a ProtonMail address they control. This version injects `plain-crypto-js@4.2.1` as a dependency.

**March 31, 01:00 UTC** — `axios@0.30.4` is published 39 minutes later. Same injection, but on the legacy 0.x branch. The attacker covers both branches to maximize impact.

**March 31, 03:29 UTC** — npm pulls both versions. Axios was compromised for **2 hours and 53 minutes**.

## Anatomy of the Attack: A Cross-Platform RAT

What makes this attack particularly nasty is that **not a single line of axios code was modified**. The attacker only touched `package.json` to add a dependency. It's invisible to anyone inspecting axios's source code itself.

The malicious package `plain-crypto-js@4.2.1` ships a `setup.js` script that runs automatically on `postinstall`. The script uses two layers of obfuscation:

- **Reversed Base64** with padding character substitution
- **XOR encryption** with the key `OrDeR_7077` and a constant of 333

Once decrypted, the script detects the operating system and downloads a platform-specific payload from the C2 server (`sfrclak[.]com:8000`).

### macOS Payload

A binary is downloaded to `/Library/Caches/com.apple.act.mond` — a name deliberately mimicking an Apple system daemon. The RAT:
- Generates a unique 16-character identifier for the victim
- Performs a full fingerprint: hostname, macOS version, CPU architecture, active processes
- Beacons to the C2 every **60 seconds**
- Accepts commands: on-the-fly injection of signed binaries, shell script execution, filesystem enumeration

### Windows Payload

A VBScript copies PowerShell to `%PROGRAMDATA%\wt.exe` (disguised as Windows Terminal) and launches a PowerShell RAT with execution policy bypass.

### Linux Payload

A Python script is dropped into `/tmp/ld.py` and launched in the background via `nohup`, detached from the parent terminal.

### The Automatic Cleanup

The cleverest detail: after execution, the malware **erases itself**. It deletes `setup.js`, replaces `package.json` with a clean version, and covers its tracks. If you inspect `node_modules/plain-crypto-js` after the fact, you see nothing.

## Why This Is a Big Deal

Axios isn't some obscure package. It's **the** JavaScript HTTP client. Over 100 million weekly downloads. It sits in the transitive dependencies of half the JavaScript ecosystem.

Three aspects make this attack particularly concerning:

**1. The vector: a hijacked maintainer account.** The attacker didn't exploit a technical flaw in npm. They compromised a human's credentials. The `jasonsaayman` account had been publishing official axios releases for years. Everything looked legitimate.

**2. The CI/CD bypass.** Legitimate axios releases go through GitHub Actions with npm's OIDC Trusted Publisher mechanism — publication cryptographically tied to the GitHub workflow. The malicious versions were published manually using a stolen npm token, with no OIDC binding. It's a clear forensic signal... but only if you know where to look.

**3. Execution in 2 seconds.** The `postinstall` script runs **before npm has even finished resolving the rest of the dependency tree**. Two seconds after `npm install`, the malware was already calling the C2 server.

## How to Check If You're Affected

The exposure window is short: **00:21 to 03:29 UTC on March 31, 2026**. But if your CI/CD pipelines run overnight or continuously, you could be impacted.

**Immediate check:**

```bash
# Search your lockfiles
grep "axios.*1.14.1\|axios.*0.30.4" package-lock.json yarn.lock pnpm-lock.yaml 2>/dev/null

# Search for the malicious dependency
grep "plain-crypto-js" package-lock.json yarn.lock 2>/dev/null
```

**If you find something:**
- Consider the machine **fully compromised**
- Rotate **all secrets and tokens** that were accessible from that machine
- Check for network connections to `sfrclak[.]com` or IP `142.11.206.73`
- Remove the affected versions and reinstall from a clean version (1.14.0 is safe)

**If your lockfile was committed before March 31 and you didn't run `npm install` during the window:** you're not affected. The lockfile is your first line of defense.

## What This Tells Us About npm in 2026

This attack isn't an isolated case. In 2025, **454,000 malicious packages** were published on npm — 99% of all open-source malware. The average npm project pulls in **79 transitive dependencies**. A single compromised package can cascade through millions of applications in hours.

The fundamental problem is structural:

- **npm doesn't enforce 2FA** for all maintainers of popular packages
- **`postinstall` scripts** run automatically with the user's full permissions
- **The trust model** relies on individuals, not cryptographically verifiable processes
- **There's no propagation delay** — a malicious version is instantly available to the 300 million weekly downloads

Solutions exist: OIDC Trusted Publishers (like what axios used for its legitimate releases), automated publication audits, tools like Snyk or StepSecurity Harden-Runner that detect abnormal network connections in CI. But none of this is mandatory. And that's the problem.

## Takeaways for Protecting Yourself

A few concrete steps every JavaScript developer should apply right now:

1. **Lock your versions.** Use lockfiles and exact versions, not ranges (`^` or `~`). Always commit your lockfile.
2. **Disable postinstall scripts in CI.** `npm install --ignore-scripts`, then manually run the ones you actually need.
3. **Enable 2FA on npm.** If you publish packages, this is non-negotiable.
4. **Audit regularly.** `npm audit` and tools like Snyk, Socket.dev, or StepSecurity should be part of your pipeline.
5. **Monitor network connections in CI.** Tools like Harden-Runner can detect C2 callbacks before they do damage.

---

**Key takeaways:**

- **Axios was compromised via a hijacked npm account** — two malicious versions deployed a cross-platform RAT during a ~3 hour window
- **The attack was invisible** — no axios code modified, just a dependency added to package.json, with self-destruction after execution
- **The lockfile is your best defense** — if you didn't run `npm install` during the window, you're not affected
- **The npm ecosystem has a structural trust problem** — technical solutions exist but aren't enforced, and it's a ticking time bomb

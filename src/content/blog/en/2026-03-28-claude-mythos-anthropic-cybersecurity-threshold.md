---
title: "Claude Mythos: The Leak That Reveals a Threshold Crossed"
description: "Anthropic accidentally revealed its next model, Mythos. What we know: it's the most powerful ever trained, and it poses unprecedented cybersecurity risks."
pubDate: "2026-03-28"
heroImage: "../../../assets/2026-03-28-claude-mythos-anthropic-seuil-cybersecurite.png"
tags: ["ai", "anthropic", "cybersecurity"]
---

**Anthropic accidentally left a blog draft sitting in a public bucket.** The result: we now know the company has finished training a model it describes itself as "by far the most powerful ever developed" — and which poses, in its own words, "unprecedented" cybersecurity risks.

The model is called **Claude Mythos**. It hasn't been released yet. But its mere existence, revealed against their will, says something important about the moment AI is going through.

We're no longer in the benchmark race. We've entered something more serious.

---

## How the Leak Happened

On March 26, 2026, *Fortune* alerted Anthropic to an embarrassing problem: nearly **3,000 assets tied to the company's blog** were publicly accessible without authentication — article drafts, unpublished images, internal PDFs, and notably a draft post announcing a new model.

The issue stemmed from the CMS (Content Management System) Anthropic uses to publish its blog. Uploaded assets are **public by default** in this system, unless a user explicitly sets them to private. Anthropic apparently just forgot to restrict access to dozens of documents that weren't meant to be seen.

Alexandre Pauwels, a cybersecurity researcher at the University of Cambridge, and Roy Paz, a researcher at LayerX Security, confirmed the accessibility of these documents for *Fortune*.

After being contacted, Anthropic secured the bucket within hours. In a statement, the company acknowledged a **"human error in CMS configuration"**, specifying that it "does not involve core AI systems, customer data, or security infrastructure."

Fair enough. But that's not the point.

---

## What the Documents Reveal About Mythos

The exposed draft describes **Claude Mythos** (also named "Capybara" in the documents, with both names seemingly referring to the same model) as a break from everything that came before.

### A New Model Hierarchy

Anthropic currently structures its models in three tiers: **Haiku** (small, fast, cheap), **Sonnet** (mid-range), **Opus** (most powerful). Mythos/Capybara would be a **fourth category**, above Opus — more capable, but also more expensive to use.

The document states:

> *"Capybara is a new name for a new tier: larger and more intelligent than our Opus models, which were previously our most powerful."*

And regarding performance:

> *"Compared to our current best model, Claude Opus 4.6, Capybara scores dramatically higher on software coding, academic reasoning, and cybersecurity tests."*

"Dramatically higher." That's the vocabulary Anthropic uses to describe the gap with its current flagship model.

### A Deliberately Slow Rollout

Anthropic confirms that Mythos is currently being tested with "early access customers" — a select group of hand-picked companies. The company says it's "taking the time to understand the risks before a broader release" and describes this model as "a step change" — a discontinuity, not a gradual evolution.

The draft mentions that the model is **"too expensive to run"** for immediate general availability.

---

## The Real Story: A Cybersecurity Threshold Crossed

The most troubling part of the documents isn't the model's raw performance, nor its name. It's the **level of concern that Mythos generates among its own creators**.

The draft is explicit:

> *"Claude Capybara is currently far ahead of any other AI model in cyber capabilities. It foreshadows an imminent wave of models capable of exploiting vulnerabilities in ways that far outpace defenders' efforts."*

Translation: Anthropic has built something that even they believe could structurally advantage attackers over defenders, if left unchecked.

For this reason, the initial launch strategy focuses on **cyber defense teams** — giving them access first, so they have a head start over potential attackers.

This isn't a PR stance. This logic is already well-established in the industry.

---

## The Context: An Industry Navigating Uncharted Waters

Mythos isn't an isolated case. Since early 2026, the two leading labs have crossed similar thresholds within weeks of each other.

**OpenAI** launched **GPT-5.3-Codex** in early February. Sam Altman himself described it as **"the first model to reach the 'high' category in cybersecurity"** in their internal Preparedness Framework. In concrete terms: OpenAI considers this model capable enough to cause real-world cyber damage at scale, if automated without guardrails.

OpenAI responded by offering **$10 million in API credits** for researchers working on cyber defenses, and by blocking unrestricted API access for high-risk use cases.

**Anthropic**, that same week, had launched Claude **Opus 4.6** with a similar capability: during internal testing, the model identified **more than 500 unknown zero-day vulnerabilities** in open-source libraries. Autonomously. Without being told how to search — just given the objective.

And let's remember: in November 2025, Anthropic had documented and stopped what it describes as **"the first documented case of a large-scale cyberattack executed without substantial human intervention"** — conducted by a group linked to the Chinese state, which used Claude Code to infiltrate about thirty organizations (tech companies, financial institutions, government agencies). **80 to 90% of the work had been done by the AI**.

Mythos arrives in this context. This isn't the future — it's the next step of a reality already in motion.

---

## What This Actually Changes

For **companies and security teams**: AI's offensive capability is going to increase faster than defensive capability. Security teams that don't equip themselves with AI tools to automate detection and patching will find themselves structurally outmatched.

For **developers**: models like Mythos will be used to audit code at a speed and depth that's impossible manually. That's good news for software quality — and bad news for poor security practices "swept under the rug."

For **regulators**: the release of Mythos will likely fuel the debate over the EU AI Act and the classification criteria for "high-risk" models. A model that its own creator classifies as "far ahead of any other AI model in cyber capabilities" doesn't fit neatly into existing regulatory boxes.

For **everyone**: the era when large AI models were neutral tools — neither dangerous nor truly useful at scale — may be behind us.

---

## The Limits of What We Know

A few important caveats:

**What we've seen are drafts.** Unfinished drafts meant for a launch that hasn't happened yet. The wording could change. Mythos's actual capabilities haven't been publicly verified.

**Anthropic has an incentive to look serious about safety.** Some of the alarmist language in the document may also serve to position Anthropic as the "responsible" player that thinks about risks — a competitive advantage in a sector where enterprise trust is key.

**The guardrails exist.** Anthropic has entire teams dedicated to abuse detection and alignment. The fact that Mythos is being launched in controlled early access, not as an immediate public release, is precisely the lesson learned from past incidents.

---

## Key Takeaways

- **Claude Mythos/Capybara** is Anthropic's next major model, more powerful than Opus — a new category above anything the company has released so far
- It was revealed **accidentally** via a leak in Anthropic's CMS — ~3,000 unpublished documents publicly accessible
- Anthropic acknowledges that Mythos is **"far ahead of any other model in cyber capabilities"** and anticipates unprecedented exploitation risks
- This isn't isolated: GPT-5.3-Codex (OpenAI) and Opus 4.6 had already crossed similar thresholds in February 2026
- The launch strategy is **deliberately slow**: early access to defenders first, to prevent attackers from gaining the upper hand
- We're witnessing something structural: **frontier LLMs are becoming double-edged swords**, and their creators admit it

---

## Frequently Asked Questions

**Is Claude Mythos available?**
No. As of March 28, 2026, Mythos is in an early access phase with a select group of companies chosen by Anthropic. No public release date has been announced.

**How does Anthropic classify its models?**
Haiku (fast, affordable) -> Sonnet (mid-range) -> Opus (powerful). Mythos/Capybara would introduce a new tier above Opus, more capable but also more expensive to use.

**What is a zero-day vulnerability?**
It's a security flaw unknown to the developer of the affected software — and therefore without an available fix. An AI model capable of identifying them autonomously can just as well help defenders patch them... as help attackers exploit them first.

**Why does Anthropic communicate about the cyber risks of its own models?**
Several reasons: transparency obligations under certain regulatory frameworks, credibility as a "responsible" player, and a desire to prepare defenders before a broader release. It's not purely altruistic — it's also strategic positioning.

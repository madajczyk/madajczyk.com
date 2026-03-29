---
title: "The Loop is Closed. The Oversight is Not."
date:  2026-03-21
tags: ["security", "AI", "governance", "engineering", "agents"]
description:  "Adding a human review step to AI-assisted development is the right immediate response. The problem is what happens when organizations treat it as the destination."
imagecredit: John Kakuk / Unsplash
---

[Caleb Sima][caleb-foundation-models] built a working Rust testing agent without knowing Rust. He shipped it solo. It works. He's also one of the sharper security engineers in the industry. When he talks about what's coming for AppSec, it's grounded as someone who lived the thing he's describing (not someone watching from a governance tower).

That's where this discussion needs to start, because the thing it impacts first will be the builders.

---

When Amazon had multiple e-commerce outages traced to AI-generated code, their response was immediate and sensible: require senior sign-off on AI-assisted changes. Add a human to the loop. The review step was the fix.

It won't hold. Not because the engineers aren't good, and not because Amazon doesn't take reliability seriously. It won't hold because the review step fails under exactly the conditions that made it necessary.

Here's the mechanism: HITL review degrades under high volume, low variance, and compressed decision time. These are not edge cases in AI-assisted development. They are the normal operating conditions. When a senior engineer reviews fifty AI-generated pull requests a week, each formatted cleanly, each passing lint and tests, each looking roughly like the last one... you safely assume that at some point they'll stop evaluating and start confirming. The variance in what gets caught versus approved becomes a function of the reviewer's fatigue state, not the code's actual risk profile. The loop is formally closed. The oversight is not real.

This isn't a character failure. It is behavioral drift driven by volume. The same cognitive machinery that lets humans build efficient pattern recognition at speed also causes them to stop noticing when a familiar pattern contains something wrong. Sustained, high-volume review of low-variance inputs produces a different human behavior than deliberate evaluation. From the outside, they look identical.

The usual objection here is that senior engineers, unlike compliance officers, have institutional authority to push back. They can slow the queue, demand explanations, require smaller PRs. That's true in theory. In practice, the Amazon all-hands wasn't called because engineers asked for a different pace. It was called because [an institutional mandate to ship with AI][amazon-all-hands] had already run ahead of any individual's authority to question it. The organizational pressure to adopt doesn't ask for the reviewer's consent. When throughput is a directive, the review step becomes the part of the system that absorbs the pressure rather than the part that applies it.

To be clear: adding the review step was the right call under the circumstances. When production is down and the cause is AI-generated code, you close the gap with what you have. HITL is fast to implement and buys time. The problem isn't the choice, it's what happens next. Organizations that add the review step, declare "job done", and move on are implicitly deciding that the architecture is settled. The review step becomes load-bearing without being designed to bear load. When it degrades (and all evidence suggests it will) there's no fallback, because the fallback was assumed to be the review step itself.

---

This pattern has a documented history in every domain where automation outran governance.

In bank compliance, financial institutions process thousands of Suspicious Activity Reports under regulatory mandate. Every bank has a human review step. Analysts look at flagged transactions, make a determination, file or dismiss. The review step is real; the oversight is not. The conditions that produce habituation are easily recognizable: high volume, low signal-to-noise ratio. Effective evaluation is unsustainable. Banks know this. They maintain the step anyway, because it satisfies the audit requirement. The loop is closed, the checkbox is checked. The intent of the function is not fulfilled.

Security operations teams lived the same arc. Modern SOCs generate alert volumes that no team can triage meaningfully at full attention. The response was to add review steps, escalation paths, human checkpoints. [Daniel Lyman at Fiserv][lyman-ep263] names the outcome directly: AI triage can surface alerts faster into unchanged investigative workflows, but it doesn't improve containment. It accelerates the queue into the same exact bottleneck. [Raffael Marty][marty-ep267], who helped architect modern SIEM, puts the harder point underneath that: most organizations have no baseline measurement of their detection efficacy. You cannot govern quality you cannot define. The human review step gets added. The underlying problem remains unmeasured.

Both failures share a specific condition: the reviewer has no meaningful leverage over the volume of decisions reaching them. AI-assisted development is replicating that condition. Amazon's senior sign-off requirement is the SAR workflow of 2026... it's a real procedural response to a real failure, but it's going to degrade under the same conditions that produced it.

This is not a prediction. It's a pattern. The outcomes are documented.

---

[Alexander Pabst at Allianz][pabst-ep264] put the useful distinction on the table: "human over the loop." Not in the loop, but over it. The difference matters because it describes a different job. An analyst in the loop evaluates decisions. An analyst over the loop sets policy, monitors exception queues, and tunes the system's behavior. These require different skills, different tooling, and different volumes of cognitive work. The last part is critical.

The mistake isn't adding the review step. The mistake is treating it as the destination rather than the bridge. Evidence from compliance and security operations suggests that what survives at scale isn't human vigilance in a review queue. Instead, it's architecture that doesn't depend on sustained human attention to function. Human review remains necessary. It stops being sufficient the moment throughput exceeds the bandwidth for genuine evaluation.

[BCG and HBR][bcg-hbr-study] put numbers on the cost of getting this wrong: productivity peaks with three simultaneous AI tools, then declines. High AI oversight correlates with 14% more mental effort, 12% additional fatigue, and 19% greater information overload. [Gartner projects][gartner-agents] that 40% of enterprise applications will have integrated agents by end of 2026, up from under 5% in 2025. The deployment curve is outpacing the governance curve by a wide margin.

---

The controls that work are the ones that don't depend on perfect vigilance from humans. Designing a permissions system that constrains what agents can touch, *before* they touch it. Scoping that defines what an agent does in terms a system can enforce, not just a doc someone wrote. Policy enforcement that produces the same outcome whether the engineer reviewing the queue is fresh or at hour nine of a sprint. Attribution that makes lineage auditable after the fact, so the review that was skipped can still be reconstructed.

Some teams are already past the point where this is a design choice. The review step is in place, the org has a mandate, the architectural decisions were made during the sprint. For those teams, the pattern still applies. It's just that it describes the next system, not the current one.

For everyone else, the window is open because the first major incident hasn't happened yet. The window closes the moment an attacker exploits the gap between what the review step claimed to check and what it actually evaluated. When an agent operating under loosely-defined constraints causes damage that tighter scoping would have prevented. When regulatory pressure forces the architecture to be dictated rather than designed, under crisis conditions, while the incident is still unresolved.

That's when "we'll add better controls later" becomes "we're rebuilding under fire."

---

The builders who recognize this pattern now are doing something more useful than governance work. They're doing the same thing Caleb Sima did when he shipped that Rust agent: understanding why the velocity creates a verification problem, and staying ahead of the moment when the choice of where the constraint lives stops being theirs.

That window doesn't stay open.

[caleb-foundation-models]: https://www.aisecuritypodcast.com/videos/will-foundation-models-kill-security-startups
[lyman-ep263]: https://cloud.withgoogle.com/cloudsecurity/podcast/ep263-soc-refurbishing-why-new-tools-wont-fix-broken-processes-even-with-ai/
[pabst-ep264]: https://cloud.withgoogle.com/cloudsecurity/podcast/ep264-measuring-your-agentic-soc-two-security-leaders-walk-into-a-podcast/
[marty-ep267]: https://cloud.withgoogle.com/cloudsecurity/podcast/ep267-ai-soc-or-ai-in-a-soc-cutting-through-hype-pricing-models-and-siem-detection-efficacy-with-raffy-marty/
[amazon-all-hands]: https://www.theguardian.com/technology/ng-interactive/2026/mar/11/amazon-artificial-intelligence?utm_source=chatgpt.com
[bcg-hbr-study]: https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry
[gartner-agents]: https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025

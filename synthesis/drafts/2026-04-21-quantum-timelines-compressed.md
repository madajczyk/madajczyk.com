---
title: "Quantum Timelines Just Compressed 200x"
date: "2026-04-21"
draft: true
tags: ["quantum", "ai", "cryptography", "governance"]
description: "Three papers in twelve months compressed quantum cryptanalysis timelines by an order of magnitude. The consequences are immediate."
---

For decades, quantum cryptanalysis was a "eventually, maybe" problem. Somewhere past 2050. Far enough away to be theoretical.

Three papers in twelve months changed that. Not by building quantum computers faster, but by proving you don't need as many qubits as anyone thought. The compression isn't hardware—it's algorithmic. And the consequences are immediate.

## The Timeline Just Collapsed

[Craig Gidney and Sophie Schmieg at Google Quantum AI][gidney-schmieg] started in May 2025: RSA-2048 could be broken with under 1 million qubits instead of 20 million. That's a 20x improvement over Gidney's own 2019 estimates, achieved through better compilation and arithmetic optimization.

Three months later, [Iceberg Quantum showed another 10x compression][iceberg-ldpc] by switching to LDPC error correction instead of surface codes—bringing RSA-2048 down to under 100,000 qubits.

Then [Google published resource estimates for Bitcoin and Ethereum][google-ecc]—the ECC systems that secure $2 trillion in assets. Their finding: fewer than 500,000 qubits, executing in *minutes* rather than months.

The same day, [Oratomic and Caltech released results showing ~10,000 atomic qubits][oratomic] could run Shor's algorithm at cryptographically relevant scales. They wouldn't have gotten there without AI—their error-correction algorithms were 1,000x worse until they used AI to search the design space for combinations humans hadn't tried.

These represent separate improvements across different architectures: a 20x refinement to Gidney's own approach, a 10x gain from switching error-correction models, and a fundamentally different trajectory using atomic qubits. The baseline itself has moved—from 20 million qubits in 2019 to under 100,000 by 2026. Qubit requirements are shrinking faster than qubit hardware is growing. Both curves matter. The crossing point is closer than it was.

[Google and Cloudflare both moved their post-quantum migration targets to 2029][nature]—announced the same week the papers landed. The timing suggests these companies are treating the quantum threat seriously enough to accelerate timelines, though the exact causal link between the papers and the announcements isn't transparent. Infrastructure companies don't move targets based on speculation alone.

## How We Got Here So Fast: The AI Accelerant

The Oratomic breakthrough isn't just about better qubits. It's about how they got there. The team's quantum error-correction algorithms were initially 1,000x worse than needed. Conventionally, that's a dead end. You try some ideas, hit a wall, move on.

Instead, [Robert Huang ran an AI system (Claude and Gemini in a loop)][time-ai] to search the algorithm design space more exhaustively than manual exploration could achieve. It found viable solutions. [Dolev Bluvstein, the lead author][time-ai]: "No question we used AI to accelerate this development. Without it, the whole thing would not work."

This matters because it shows something new: AI isn't just helping build quantum computers. It's expanding what's *possible* in quantum research itself. The second-order implication is sharper: if AI can accelerate your defensive cryptanalysis research, the same capability could accelerate an adversary's tools—which would compress timelines further.

## The Blind Spot Nobody Talks About

Harvest-now-decrypt-later (HNDL) is not new. [State actors are collecting encrypted traffic now.][fed] When quantum arrives, that traffic becomes readable. Until March 2026, "decrypt later" was a 2040+ scenario. Now it's credible.

But decryption is only the first step. The harder part comes after: once you have terabytes of decrypted data, how do you find the signals that matter? How do you identify which intercepts contain authentication credentials, which contain keys, which contain intelligence? That's a data science problem, not a cryptography problem.

The NSA knows this. Their [AI/ML strategy documents][fed] explicitly describe using "machine learning and scalable analytic techniques to draw actionable intelligence from raw data."

Here's the governance problem: [NIST IR 8547 (the post-quantum cryptography standard) contains zero mentions of AI.][nist-ir] The [CISA/NSA/NIST quantum-readiness guidance is the same.][cisa-quantum] The threat—harvest encrypted traffic, decrypt it later, apply AI to extract signal—has no integrated government threat model. NIST and NSA are operating from separate playbooks that don't reference each other.

This creates a gap: organizations get guidance on quantum migration *or* guidance on AI governance, but nobody in government is modeling the composed threat. You're on your own to connect those pieces.

## Why The Deadline Is Now

Three intersecting factors create urgency:

**First: The immediate threat to financial systems.** [Google's Bitcoin analysis][google-paper] explores quantum attack scenarios against transaction confirmation timelines—finding feasibility windows where private keys could be exposed before blockchain finalization. For Bitcoin, that means security could collapse before anyone can move assets. Ethereum has similar ECC vulnerabilities. This isn't distant—it's a question of when, not if.

**Second: The data already collected.** [State actors are archiving encrypted traffic right now.][fed] Any long-lived sensitive data from the last 5–10 years using RSA or ECC will be readable once quantum capability arrives. Authentication credentials, configuration files, archived source code, financial records—if they were encrypted with current algorithms and archived, they're targets. The data being collected now is the future damage.

**Third: The migration window is short.** [NIST standards say classical crypto is deprecated after 2030, disallowed after 2035.][nist-ir] Enterprise migrations typically take 7–10 years (based on industry experience; full transition of a large estate can extend to 2032–2035). The math: if your deadline is 2035 and you need 7–10 years to migrate, you should have started in 2025–2027. Most organizations haven't started. [Google and Cloudflare both moved to 2029 migration targets][nature]—announced the same week the papers landed. They're not reacting to speculation; they're accounting for the risk and buying time.

The convergence of these three factors—imminent financial-system vulnerability, archived data already at risk, compressed migration timeline—explains why infrastructure companies are accelerating. Organizations are responding to the window, not betting on a specific timeline.

## A Note on Risk and Certainty

Jeff Thompson at Princeton (CEO of Logiqal, a competing quantum startup) [argues that the Oratomic estimates are "untested" and that qubit counts are easy to reduce if you just assume better qubits.](https://www.example.com) He's not wrong. The compression results are architecture-dependent and rest on assumptions about quantum-error rates that haven't been proven at scale.

But here's the thing: Google and Cloudflare didn't wait for certainty. They accelerated anyway. When infrastructure companies move that fast despite valid skepticism about the timeline, it's not because they're certain—it's because the cost of being wrong is too high. They're not betting on the Oratomic timeline. They're hedging against it.

As an organization, you should do the same: assume the worst-case timeline is real, plan for the mid-case timeline, and hope the skeptics are right. But don't wait for certainty.

## The Blind Spot Organizations Have

Most organizations treat cryptography as a static property: "Uses TLS." "Encrypts at rest." This works fine if encryption never breaks. Quantum changes that completely. Encryption that's fine today might be broken in five years, retroactively exposing data collected now.

The hard question organizations aren't asking: **"How long does each piece of our encrypted data need to stay secret, and is our current crypto adequate over that horizon?"**

This reshapes the entire risk model. "Doesn't matter if it breaks in ten years" is a completely different risk posture than "catastrophic if it's readable in five." Most organizations haven't categorized their data this way. They haven't mapped which secrets have indefinite value (keys, credentials, authentication material) versus which have expiration dates.

That's the gap. Consider a concrete example: your AWS KMS root keys need protection forever. Your OAuth tokens expire in hours. Your archived TLS session keys from 2020 are still a target if they're being stored today. Your SSH host keys for infrastructure that will be decommissioned in 2028 have a different timeline than those for systems running until 2035. Each requires different migration urgency, but most organizations are applying the same timeline to all of them.

Here's what to do about it:

**1. Cryptographic inventory.** Know which systems use RSA, elliptic curve, or Diffie-Hellman. Don't just list the algorithms, but capture what they protect and how long that data needs to stay secret. Long-term secrets (cryptographic keys themselves, authentication credentials with indefinite value, sensitive data) are the highest exposure.

**2. Long-lived data mapping.** Identify archives: email backups, log retention stores, database dumps, backup snapshots. These are where HNDL risk is concentrated. If you're archiving encrypted data today that will be sensitive in 2035, that data is the target.

**3. Trust chain visibility.** Map who has cryptographic keys and under what authority. Service principals, API tokens, OAuth grants... each of these represent transitive trust chains that can fail. Know which components are on your critical path.

**4. Post-quantum standard evaluation.** [NIST finalized post-quantum standards][nist-pqc] (ML-KEM, ML-DSA, SLH-DSA) in August 2024. Production implementations exist now (OpenSSL 4.0 and Linux 7.0 both shipped April 2026 with post-quantum support). The standards aren't coming; they're already here. The question is when to pilot.

**5. Crypto-agility by design.** New systems should be designed to swap cryptographic primitives without full re-architecture. This is less about "migrate now" and more about "build in the flexibility so migration isn't catastrophic later."

## Signals to Watch For

**CISA guidance.** Formal advisories shift organizational priorities. Watch for "Year of Quantum Security" positioning and guidance on integrating AI-scale threat analysis with quantum migration.

**Vendor announcements.** When cloud providers announce automatic OAuth scope ratcheting or cryptographic key lifecycle auditing, that's a signal that standards are moving toward enforcement.

**IR 8547 finalization.** The draft drops later on this year. When it's final, auditors will begin to cite it within months. That's when "forward-looking" becomes "required."

**Compliance framework updates.** System Security Plans need to evolve from "uses TLS" to temporal logic: algorithm + confidentiality horizon + migration path. FedRAMP and CMMC updating means cascading to all their customers.

**Funding in post-quantum tooling.** It's looking like organizations have maybe 7 to 10 years. If only a few vendors focus on migration, costs will balloon and timelines will slip. Venture funding will signal how seriously the market is treating this.

## What Happens Next

The qubit requirements are falling. The hardware is catching up. The window for migration is shrinking. Separately, these are solvable problems. Together, they create urgency that infrastructure companies are already responding to.

The gap between what governments are saying (NIST on quantum, NSA on AI) and what organizations need to know (quantum + AI together) is yours to bridge. Start with the hard question: what data needs to stay secret after 2030, and does your current crypto protect it?

The data being collected now will be the vulnerability of 2030. The migration you plan now will determine whether you're ready then.

[gidney-schmieg]: https://security.googleblog.com/2025/05/tracking-cost-of-quantum-factori.html
[iceberg-ldpc]: https://github.com/iceberg-quantum/pinnacle
[google-ecc]: https://arxiv.org/abs/2603.06969
[google-paper]: https://arxiv.org/abs/2603.06969
[oratomic]: https://arxiv.org/abs/2603.12234
[time-ai]: https://time.com/article/2026/04/07/ai-quantum-computing-advance/
[nist-ir]: https://csrc.nist.gov/publications/detail/ir/8547/ipd
[cisa-quantum]: https://www.cisa.gov/quantum
[nature]: https://www.nature.com/articles/d41586-026-01054-1
[nist-pqc]: https://csrc.nist.gov/projects/post-quantum-cryptography/
[nsa-cnsa]: https://media.defense.gov/Oct%202022%20Documents/DoD/2022-10-27-memo-cnsa-2-0-migration-directions.pdf
[fed]: https://www.federalreserve.gov/econres/feds/harvest-now-decrypt-later-examining-post-quantum-cryptography-and-the-data-privacy-risks-for-distributed-ledger-networks.htm

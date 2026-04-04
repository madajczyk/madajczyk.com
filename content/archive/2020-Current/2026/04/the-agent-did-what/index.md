---
title: "The Agent Did What?!"
date: "2026-04-03"
tags: ["security", "ai", "agents", "supply-chain", "zkml", "infrastructure"]
description: "Agent frameworks are npm packages. Zero-knowledge proofs can be the cryptographic foundation that hold agents  accountable for their actions when something goes wrong."
imagecredit: Robotic Overlords / Gemini
---

[Last week][prev] I wrote about an attack surface that's becoming more and more important: routing and orchestration layers that accumulate credentials and privilege while operating below the security threshold anyone has actually set for them. [LiteLLM][litellm-breach] was the clearest example: a routing library holding API keys for every model it touches, compromised through PyPI, [4TB exfiltrated][mercor] from Mercor. The argument was that these layers are trusted implicitly yet also monitored poorly, and that the security failures compromising them aren't new.

This week the `axios` npm package, with [100 million weekly downloads][axios-hijack], was hijacked by North Korean state actors via a compromised maintainer account. Same structure, new incident. Here's what has changed.

Agent frameworks and tooling (LangChain, AutoGen, CrewAI, LiteLLM) are npm and PyPI packages. Distributed through the same channels, with the same trust model, as everything else that got compromised recently. When your framework holds credentials to book travel, execute trades, sign contracts, or move money, a compromise doesn't end at the CI/CD pipeline. It extends to every downstream action the agent is authorized to take. [React2Shell (CVE-2025-55182)][react2shell] demonstrated what automated exploitation of a single vulnerable surface looks like at production scale: 766 compromised systems in 24 hours. An agent framework compromise extends that automation to every action the agent can perform.

A compromised npm package can exfiltrate credentials from a build pipeline. A compromised agent framework could wire $50,000.

We have no receipt for either. That's the problem.

## What SSL/TLS actually did

When SSL was developed in the mid-1990s, the internet had a trust problem: data transited over channels that anyone on the network could read or tamper with. SSL didn't fix the network. It created a verification layer above it, one that let endpoints prove their identity cryptographically and verify data arrived untampered. The security model shifted from *trust the channel* to *verify the endpoint*.

The agentic trust problem requires the same structural move, one layer up. We need to shift from *trust the framework* to *verify the action*.

The analogy is structural, not calendrical. SSL's performance overhead was measured in percentage points; ZKML's current overhead is orders of magnitude larger. What holds is the architecture: a verification primitive that didn't require fixing the underlying infrastructure, only building above it. The adoption timeline will be different, but the shape of the problem is the same.

## Zero-knowledge proofs

Zero-knowledge machine learning (ZKML) is the cryptographic mechanism that makes "verify the action" possible. A ZK proof lets one party prove to another that a computation ran correctly, using specific inputs on a specific model, without revealing the underlying data or model weights. Applied to AI inference, it produces a cryptographic receipt: *this action was taken, by this model version, on these inputs, and the output was this.*

The proof doesn't require trusting the system that generated it. A conventional audit log can be falsified by a compromised framework — the same framework the proof is supposed to verify. A ZK proof is verified mathematically, not claimed. This is non-repudiation at the action layer: the framework can't later deny what the math already proved happened. The honest scope of that claim: the proof covers the computation, not whether the inputs were accurately reported. A compromised framework controls what gets fed into the proof. Input integrity upstream is a system design question, not a cryptographic one.

The barrier has been performance. Generating a ZK proof for neural network inference historically required 1,000,000x more compute than the inference itself. That overhead is compressing: [published benchmarks][ezkl-benchmarks] from [ezkl][ezkl] and [Risc Zero][risc-zero] show small models, image classifiers in the millions-of-parameters range, proven in seconds at roughly 10,000x overhead (as of early 2026).

These benchmarks don't extend to frontier LLM inference. Proving a multi-billion parameter model call is still a research problem. For now, three use cases work: batch verification of agent actions for compliance and audit trails; high-value operations like contract execution and financial transactions above a risk threshold, where a few extra seconds of proof generation is an acceptable cost; and model integrity attestation, confirming that inference ran on a specific committed model rather than something substituted.

None of this means "the agentic trust layer is solved." The primitive exists, it works for bounded problems today, and the performance curve is moving. The clearest near-term forcing factor is regulated sectors (e.g., finance, healthcare, legal) where "we trust the framework" won't hold up as a compliance answer.

## What the receipt won't prove

A restaurant receipt proves you bought dinner. It doesn't prove you authorized someone to use your card — that's a separate problem with a different tool. A ZK proof is the same: it proves what computation happened, on what inputs, with what model. Whether the agent was *authorized* to take that action is upstream of the proof. What the agent is permitted to do, and against which systems — that's an access governance problem, not an attestation problem.

ZKML and scoped agent permissions are different layers. An agent authorized too broadly that produces a cryptographic proof of every action has given you an auditable disaster. The proof is only as valuable as the scope it's operating within.

[The March piece on scoping agent credentials][prev] is the prerequisite. Attestation solves the *what happened* problem. Access governance solves the *what was allowed* problem. You need both. The choice isn't whether a verification layer gets built — it's whether you're building toward it now, or explaining to someone why the framework you trusted was the attack vector.

## What to do next

Start with credentials. If your agent holds keys to everything, a ZK receipt just proves it legitimately did something catastrophic. Least-privilege access governance is still the first line, and then attestation gets layered on top.

Identify your high-value, latency-tolerant actions: contract execution, regulated decisions, financial transactions above threshold. These are the candidates for batch ZKML verification now, before real-time proof generation is practical. Building an audit architecture now means you're not retrofitting when the verification layer arrives.

Then, track the ezkl and Risc Zero benchmarks, specifically proof generation time against model scale. Current results are for small models. The threshold that matters is when overhead becomes acceptable for what agents actually do (and the risk they take on). What gets built in the next 12 months determines whether you can adopt the trust layer when you need it.

The LiteLLM compromise didn't touch a model. It touched the layer everyone trusted without examining. Build the layer that verifies rather than trusts. Build the receipt.

[prev]: https://madajczyk.com/archive/2026/03/28/familiar-security-failures-ai-acceleration/
[litellm-breach]: https://www.itpro.com/security/litellm-pypi-compromise-everything-we-know-so-far
[mercor]: https://www.securityweek.com/mercor-hit-by-litellm-supply-chain-attack/
[axios-hijack]: https://thehackernews.com/2026/04/google-attributes-axios-npm-supply.html
[react2shell]: https://www.wiz.io/blog/critical-vulnerability-in-react-cve-2025-55182
[ezkl]: https://ezkl.xyz
[ezkl-benchmarks]: https://blog.ezkl.xyz/post/benchmarks/
[risc-zero]: https://github.com/risc0/risc0

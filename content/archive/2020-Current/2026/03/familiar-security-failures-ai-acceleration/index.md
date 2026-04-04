---
title: "Familiar Security Failures, AI Acceleration"
date: "2026-03-28"
tags: ["security", "ai", "infrastructure", "supply-chain", "enterprise"]
description: "The near-term AI security problem is not only model behavior. It is the routing, scanning, and orchestration layers that now sit in privileged positions across real systems."
imagecredit: Albert Stoynov / Unsplash
---

The first wave of AI security writing focused on model behavior. Prompt injection. Unsafe outputs. Data leakage through chat interfaces. Those risks are real, but they're not the whole story. The speed of AI adoption is making existing security failures worse, not creating different ones.

The recent TeamPCP supply-chain campaign hit [Trivy][trivy-docs] and [LiteLLM][litellm-docs], with follow-on compromises in Checkmarx GitHub Actions and downstream projects. A separate [Langflow][langflow-docs] exploitation event landed the same lesson from a different angle. These tools hold credentials, route requests, and execute workflow logic on behalf of other systems.

None of that puts them on the same level as an identity provider or cloud control plane. But they deserve more scrutiny than ordinary developer tooling. When AI enablement tools become trusted intermediaries, a compromise in one cascades well beyond a single application.

Public reporting this month covered the TeamPCP compromises of [Trivy][aikido-canisterworm] and [LiteLLM][itpro-litellm], downstream impact to adjacent projects, and [active exploitation of a critical Langflow RCE][sysdig-langflow] within days of disclosure. The mechanisms differ. The control problem is the same: scanners, routers, and orchestration services have accumulated enough privileges and reach that one compromised component can spill much farther than its original scope.

## Security tooling impacts

Security tooling runs in privileged places—that's what makes this campaign serious. [Trivy][trivy-docs] scans containers, Kubernetes clusters, repositories, and cloud environments, and gets embedded in CI/CD pipelines routinely. Arctic Wolf reported that TeamPCP also used stolen CI/CD secrets to compromise Checkmarx GitHub Actions, including `kics-github-action`, with similar downstream risks for automated build workflows [checkmarx-impact].

When one of those tools is compromised, a poisoned package is only part of the problem. A trusted step in an automated path became a delivery mechanism. The security product became the propagation channel.

Defensive tooling embedded in release pipelines inherits the privileges of its position. You don't need a new theory or AI as a root cause to explain what happened here.

## Centralized systems are juicy targets

LiteLLM is different from most compromised packages because it's designed to be central. The [gateway configuration][litellm-gateway] puts it between applications and multiple model providers, holding provider keys and traffic policy in one place. Compromise the router and you get more than one application's worth of access—potentially every model and every environment routed through it.

[Researchers found malicious code][itpro-litellm] in versions 1.82.7 and 1.82.8 on PyPI. The package sits exactly where a compromise costs most: upstream of every application behind it, often with access to provider keys and surrounding secrets.

This isn't evidence that attackers have fully reprioritized around "AI infrastructure" as a dedicated target category. The problem is simpler: teams are centralizing trust in these layers and treating them like any other dependency—normal patch cadence, ignored lifecycle, noticed only when something breaks.

## Langflow showed the patching problem

[Langflow][langflow-docs] is an open source framework for building AI workflows, including agents, MCP servers, and tool integrations. CVE-2026-33017 was an unauthenticated RCE. [Sysdig reported][sysdig-langflow] first exploitation attempts within roughly 20 hours of the advisory. One case, not a rule. But externally exposed AI workflow infrastructure belongs in the category where a weeks-long patch queue isn't acceptable.

If a workflow engine can reach internal systems, call external APIs, or execute actions across business tools, it needs to be on a high-urgency patch schedule. Orchestration layers combine code execution, credentials, and downstream reach. Once a critical vulnerability is public, that combination has a short shelf life.

## Model behavior alone isn't a tidy root cause

AI systems are being deployed through routers, orchestration frameworks, connectors, and local agent infrastructure that often aren't properly inventoried. The control problem is familiar even if the tools are new: systems mediating access are spinning up faster than ownership and telemetry can follow.

"AI as target" is a more useful frame right now than "AI as weapon." The tools connecting models to code, cloud accounts, tickets, documents, and internal APIs are accumulating leverage. Attackers don't need a novel AI-specific playbook. They just need to find the layer everyone decided to trust.

## Focus areas

Skip the new tooling. The gap here is in how these components get classified and owned.

Treat AI gateways, orchestration frameworks, scanners, and connectors based on the privileges they actually hold—not based on how they entered the environment. If a model gateway centralizes provider keys, isolate those keys by provider and by environment. If a workflow engine can reach internal systems, treat it like any other internet-facing orchestration service. If agent connectors can read or write business systems, inventory them explicitly instead of burying them inside "AI experimentation." Apply the same attention to package provenance and release integrity as anything else that runs in your build path.

Concretely:

1. Inventory the trust concentrators: scanning tools, gateways, orchestrators, connectors.
2. Minimize credential scope so one compromise doesn't expose every provider, project, or environment.
3. Apply high-urgency patch cadence to externally exposed AI workflow infrastructure.
4. Keep model safety ownership separate from toolchain trust ownership. They're different problems with different owners.

None of this requires treating AI infrastructure as uniquely dangerous. It requires treating it as dangerous proportional to what it can reach. What's changed is the timeline: the gap between a public advisory and active exploitation used to give teams room to breathe. That room is shrinking, and most AI toolchain ownership models aren't accounting for it yet.

[aikido-canisterworm]: https://www.aikido.dev/blog/teampcp-deploys-worm-npm-trivy-compromise
[trivy-docs]: https://github.com/aquasecurity/trivy
[checkmarx-impact]: https://arcticwolf.com/resources/blog/teampcp-supply-chain-attack-campaign-targets-trivy-checkmarx-kics-and-litellm-potential-downstream-impact-to-additional-projects/
[litellm-docs]: https://docs.litellm.ai/
[litellm-gateway]: https://docs.litellm.ai/docs/providers/litellm_proxy
[itpro-litellm]: https://www.itpro.com/security/litellm-pypi-compromise-everything-we-know-so-far
[langflow-docs]: https://docs.langflow.org/
[sysdig-langflow]: https://www.sysdig.com/blog/cve-2026-33017-how-attackers-compromised-langflow-ai-pipelines-in-20-hours

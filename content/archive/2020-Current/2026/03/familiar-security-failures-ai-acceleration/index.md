---
title: "Familiar Security Failures, AI Acceleration"
date: "2026-03-28"
tags: ["security", "ai", "infrastructure", "supply-chain", "enterprise"]
description: "The near-term AI security problem is not only model behavior. It is the routing, scanning, and orchestration layers that now sit in privileged positions across real systems."
imagecredit: Albert Stoynov / Unsplash
---

The first wave of AI security writing focused on model behavior. Prompt injection. Unsafe outputs. Data leakage through chat interfaces. Those risks are both pre-existing and real, but now it's clear they're not the entire problem. Existing security problems are being exacerbated by the speed of AI adoption.

The recent TeamPCP supply-chain campaign impacting [Trivy][trivy-docs] and [LiteLLM][litellm-docs], with follow-on compromises affecting Checkmarx GitHub Actions and downstream projects, points somewhere more concrete. A separate [Langflow][langflow-docs] exploitation event pointed to the same operational lesson from another angle. These tools sit in privileged positions. They hold credentials, route requests, or execute workflow logic on behalf of other systems.

That does not make them equivalent to an identity provider or cloud control plane. It does mean they should be treated more like highly important infrastructure than like ordinary developer tooling. Once systems that enable AI become trusted intermediaries, familiar security failures result in a much larger blast radius.

This isn't a theoretical security concern. Public reporting this month described the TeamPCP campaign's compromises of [Trivy][aikido-canisterworm] and [LiteLLM][itpro-litellm], along with downstream impact to adjacent projects, while separate reporting described [active exploitation of a critical Langflow RCE][sysdig-langflow] shortly after disclosure. The mechanisms differ but highlight the same control problem. The common point is narrower: scanners, routers, and orchestration services now have enough privileges and reach that a compromise in one of them can spill far beyond a single application.

## Security tooling impacts

This campaign has major implications because security tooling runs in privileged places. [Trivy][trivy-docs] is designed to scan containers, Kubernetes, repositories, and cloud environments, and it commonly gets integrated into CI/CD pipelines. Arctic Wolf reported that TeamPCP also leveraged stolen CI/CD secrets to compromise Checkmarx GitHub Actions, including `kics-github-action`. This resulted in a similar downstream risk for automated security and build workflows [checkmarx-impact].

When one of those tools is compromised, the problem is not just that a package was poisoned. The problem is that a trusted step in an automated path became a delivery mechanism, which is exactly what this event highlighted. The security product itself became the intermediary that propagated compromise.

That needs to be the durable lesson from the campaign. You do not need a new theory or to blame AI to explain it. You need to acknowledge that defensive tooling embedded in release and deployment pipelines inherits the privileges of its position.

## Centralized systems are juicy targets

LiteLLM changes the framing because it is not just another package in a build. LiteLLM documentation offers it as a central service or [gateway solution][litellm-gateway] for access to multiple LLMs, with retry and fallback logic across providers. In a gateway configuration it also means a compromise of the router can have a larger blast radius than a compromise of any single AI application behind it. Not always, and not in every deployment. But in centralized setups, the gateway becomes an aggregation point for credentials and traffic policy. An enablement pathway that spans multiple providers and internal workloads is no longer just SDK convenience. It is part of the access layer.

The public [reporting on the LiteLLM compromise][itpro-litellm] is part of why this is so important. Researchers found malicious code in versions 1.82.7 and 1.82.8 on PyPI, and the package sits exactly where a compromise is costly: between applications and multiple model providers, often with access to provider keys and surrounding secrets.

That is the stronger realization here, not that LiteLLM proves attackers have fully reprioritized around "AI infrastructure" as a category. The defensible point is that teams are already centralizing too much trust in these layers. Simply relegating them to ordinary dependency management, normal patching processes, and ignored lifecycle timelines is dangerous.

## Langflow showed the patching problem

Langflow adds a second dimension to the problem: time. [Langflow][langflow-docs] is an open source framework for building AI applications and workflows, including agents, MCP servers, and tool integrations. According to [Sysdig's reporting][sysdig-langflow], CVE-2026-33017 was an unauthenticated RCE and the first exploitation attempts appeared within roughly 20 hours of the advisory's publication. That single case does not prove every AI orchestration flaw will be weaponized on that schedule. It does however show that externally exposed AI workflow infrastructure belongs in the class of systems where gradual patching compliance is no longer effective.

The operational takeaway is simple. If a workflow engine can reach internal systems, call external APIs, or run automated actions across business tools, it should not sit on the same patching cadence as something with a lower risk. The issue is not that Langflow is uniquely dangerous. The issue is that orchestration layers combine code execution, credentials, and downstream reach in one place.

## Model behavior alone isn't a tidy root cause

The more immediate issue is that AI systems are being operationalized through routers, orchestration frameworks, connectors, and local agent infrastructure that aren't properly inventoried. The control problem is familiar even if the tools are new: the systems mediating access are being spun up faster than ownership, telemetry, and review can occur.

That is why "AI as target" is currently the more useful lens than "AI as weapon." The tools connecting models to code, cloud accounts, tickets, documents, and internal APIs are accumulating leverage. Once that happens, attackers don't need a novel theory of AI usage. They just need to compromise the layer that everybody else has decided to trust.

## Focus areas

The response is not a new framework or shiny new tooling. It is stricter classification of operational boundaries.

Treat AI gateways, orchestration frameworks, scanners, and connectors according to the privileges they actually hold, not according to how they entered the environment. If a model gateway centralizes provider keys, isolate those keys by provider and by environment. If a workflow engine can reach internal systems, treat it like any other internet-facing orchestration service and patch with the highest priority. If agent connectors can read or write business systems, inventory them explicitly instead of hiding them inside "AI experimentation." The same goes for package provenance and release integrity: if these tools sit in build or execution paths, make sure you can identify where they came from and who can publish updates to them.

The operating model should be familiar:

1. Inventory the trust concentrators: discovery and scanning tools, gateways, orchestrators, and connectors.
2. Minimize credential scope so that one compromise does not expose every provider, project, or environment.
3. Put externally exposed AI workflow infrastructure on the same patch and exposure review cadence as other high impact services.
4. Separate model safety ownership from toolchain trust ownership, because they are different control problems.

The strongest version of the argument is also the simplest one. AI toolchain components do not need to be magic, or fully novel, to deserve tighter handling. Once a component becomes a privileged intermediary, the credentials and automation that enable its operation increase the impact of a compromise. This isn't a new problem that was introduced by AI, but early evidence suggests that the urgency introduced by AI greatly compresses the reaction timeline.

[aikido-canisterworm]: https://www.aikido.dev/blog/teampcp-deploys-worm-npm-trivy-compromise
[trivy-docs]: https://github.com/aquasecurity/trivy
[checkmarx-impact]: https://arcticwolf.com/resources/blog/teampcp-supply-chain-attack-campaign-targets-trivy-checkmarx-kics-and-litellm-potential-downstream-impact-to-additional-projects/
[litellm-docs]: https://docs.litellm.ai/
[litellm-gateway]: https://docs.litellm.ai/docs/providers/litellm_proxy
[itpro-litellm]: https://www.itpro.com/security/litellm-pypi-compromise-everything-we-know-so-far
[langflow-docs]: https://docs.langflow.org/
[sysdig-langflow]: https://www.sysdig.com/blog/cve-2026-33017-how-attackers-compromised-langflow-ai-pipelines-in-20-hours

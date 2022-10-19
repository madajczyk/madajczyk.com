---
date: "2021-03-30T00:00:00Z"
title: Using MoCA to Extend Ethernet Networks
---

I've made some pretty significant upgrades to my home network in the past few years.  As the homelab bug started to bite
again, I've begun transitioning back to using hard-wired connections where possible.  I swapped out my older wireless
equipment with [UniFi] equipment for better control, and started running cabling where I could.

My current living situation prevents me from making major modifications. I either had to configure the UniFi system to
use wireless mesh and backhaul the traffic, or run cables all over the place somehow.  Yuck.

I started looking at alternatives I remembered from a while ago, including Ethernet over Powerline and Ethernet over 
Coax.  Each of these progressed a lot farther than I had expected.  Luckily for me, there were already Coax cable drops
exactly where I wanted to run my equipment, so going that route seemed the best.

I ended up selecting a solution from [goCoax].  For under $200, I was able to acquire three of the adapters (WF-803M),
which was exactly what I needed.  I ended up spending more time tracing and labeling the existing cables than I did
getting the adapters up and running.  Because I had access to all of the Coax drops, I was able to reconnect everything
to suit my needs.  Below is a diagram I worked up in Mermaid; any unlabeled connections are Ethernet.

{{< figure src="using-moca-to-extend-ethernet-networks-diagram.svg" >}}

The marketing site for goCoax boasts a data rate of up to 2.5 Gbps.  I haven't tested extensively tested this, nor will
I.  I have no need.  I don't see any blatant latency, and since I'm limited to gigabit for wired and obviously less for
wireless, it doesn't really matter.

The biggest downside I can think of for this solution is that you can't use Power over Ethernet (PoE), for the fairly
obvious reason that it's not really Ethernet when you're sending the bits over Coax.  That's fine, I have the needed PoE
injectors and battery backup units, so it doesn't affect my use case.

The only thing I haven't extensively researched would be the security of the goCoax devices themselves.  Specifically,
if I'm using these things and the onboard bonding firmware/software is out of date, is there an attack vector there?
Although it's a concern, it hasn't been enough for me to dig deeply enough or disconnect them.

[Unifi]: https://unifi-network.ui.com/
[goCoax]: https://www.gocoax.com/

[//]: # "note: saving this as a MD comment (won't render) to save time if I add mermaid.js functionality to the site"
[//]: # "graph LR"
[//]: # "    subgraph one [Internet Provider]"
[//]: # "        CableIn[External] -->|Coax| Modem[Cable Modem]"
[//]: # "    end"
[//]: # "    subgraph two [Basement]"
[//]: # "        Modem --> USG[Unifi USG]"
[//]: # "        USG --> Switch"
[//]: # "        Switch --> M0[MoCA Adapter]"
[//]: # "    end"
[//]: # "    "
[//]: # "    subgraph three [First Floor]"
[//]: # "        M0--> |Coax| M1[MoCA Adapter]"
[//]: # "        M1-->  wifi1[UAP-Nano-HD Wifi]"
[//]: # "    end"
[//]: # "    "
[//]: # "    subgraph four [Second Floor]"
[//]: # "        M0--> |Coax| M2[MoCA Adapter]"
[//]: # "        M2-->  wifi2[UAP-AC-M Mesh Wifi]"
[//]: # "    end"
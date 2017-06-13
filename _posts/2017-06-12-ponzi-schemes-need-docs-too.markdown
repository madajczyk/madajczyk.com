---
layout: post
title: "Ponzi Schemes Need Docs Too"
date: 2017-06-12 -0500
comments: false
---

Documentation in code is extremely important, even if developers hate doing it.
We've all been there, stuck debugging some confusing code that has zero code
comments.  It made sense to the dev at the time, but they've long since moved on
and you're stuck supporting that bad boy.

[GitHub][1]{:target="_blank"} recently released the results of their
[Open Source Survey][2]{:target="_blank"}, which polled active users to
better understand how they were using the software.  One of the primary insights
they learned?

<blockquote>
Documentation is highly valued, but often overlooked.
</blockquote>

I just recently finished listening to [Ponzi Supernova][3]{:target="_blank"}.  This
podcast provides some interesting backstory around the [Bernie Madoff investment
scandal][4]{:target="_blank"} that he confessed to in late 2008.

I won't give away many details from the podcast, as it was very well done (and
you should go listen to it immediately).  But, I couldn't help but to reflect on
a very important point.  In the podcast, it was suggested that the code comments
from the application(s) used to generate the fraudlent transaction statements and
other corroborating documents were used to confirm that the trading programs were
specifically constructed to target or avoid ongoing audit activity.

That caught my attention, so I did some searching.  Sure enough, I came across
[an article that detailed][5]{:target="_blank"} that the RPG programs included
code comments specific enough to convince a non-technical jury that the
application was indeed built and subsequently manipulated in a way to pass
various audits:

<blockquote>
So the pair resorted to what any normal RPG programmers would do: They added
comments to the code.

"The programmers nicely commented the code, which made explaining some things
easier, because they said this is what they’re doing," Diedrich says. The jury
didn’t have to try to read the code. They said ‘This is how we’re generating
these numbers.'"

Perez and O’Hara also added comments to ensure their audit preparation was up to
snuff. "There were comments in the code hat indicated, for this kind of audit we
need this kind of information," Diedrich says. "The code would say, ‘We don’t
need this for this audit,’ so they commented it out from the code at times,
then they would put it back in for the other audits."
</blockquote>

So, there you have it.  Code comments are important to everyone, because you
never know when you'll be involved in a high stakes Ponzi scheme designed to
defraud people of over 65 billion dollars.

[1]: https://www.github.com/
[2]: http://opensourcesurvey.org/2017/#insights
[3]: http://www.audible.com/mt/ponzisupernova
[4]: https://en.wikipedia.org/wiki/Madoff_investment_scandal
[5]: https://www.itjungle.com/2016/09/12/tfh091216-story01/

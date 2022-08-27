---
comments: false
date: "2004-08-17T00:00:00Z"
title: Reducing RSS Bandwidth
---

> This article was originally posted at this domain name on an old blogging system.  I am consolidating all of my ramblings and drabble here.

RSS is a cool bit of technology, there's no doubt about it. But larger sites definitely run into issues when it comes to lots of people consistently polling the RSS data feed to find updates.

What can possibly be done?

I have a tool that I developed internally a while back to automatically update DNS entries on dynamic DNS sites. To determine what the IP address is for remote sites that may not be able to determine their own IP address, I run a simple IP address site. If you browse to ip.deepbluegroup.com, you'll see it simply returns your current IP address.

So why can't RSS feeds provide a similar mechanism? Provide a token from the most recent RSS download, for example mysite.com/rssver.aspx or some such thing that returns the value. If you were to do the calculations, I'm sure you'd see a dramatic decrease in outgoing bandwidth.

Of course, all of the aggregators would need to know where to find the additional URI to see what the current token was, but that should be a simple matter. Hey, don't look at me like that, I'm just the ideas man...
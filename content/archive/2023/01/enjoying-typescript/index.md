---
date: "2023-01-09T00:00:00Z"
tags:
  - tech
  - typescript
title: Enjoying Typescript
description: 
imagecredit: Caspar Camille Rubin / Unsplash
---
I realized that I have had a rocky relationship with
scripting languages used on websites and such.

VBScript was.. fine. I was able to get a lot of stuff done with it, especially
since it was the successor to QBasic. The fact that it was baked in to Internet
Explorer, and nothing else from a browser perspective, was a key indicator.
Yeah it still lives on in Office products and such, but at this point if you're
dropping down to the script editor, there's a good chance you've already lost 
the battle.  Being able to use the same language in multiple places was nice,
but pretty quickly it was easy to realize that you were getting locked in.
Sadly, I ended up writing a fair amount of this code. Sorry for anybody who
finds themselves stuck supporting that legacy unpleasantness.

JavaScript.  Man I hated doing JavaScript.  It was terrible and finicky and just
a royal pain to debug.  I jumped on the jQuery library bandwagon fairly quickly
around 2008 or 2009 and didn't look back. It did a great job of finding the
common denominator between all of the modern browsers and I didn't have to spend
time optimizing things.  By around 2015 after I changed jobs, there just wasn't
a need for me to spend as much time on client side development.

Typescript came out just before my focus shifted, and I remember thinking it was
a great idea.  A superset language that transpiles to JavaScript?  Adds static 
typing?  Perfect.  But, I didn't have any projects where I needed to press it
service, so I didn't spend much time looking into it.

I've recently involved myself in a small open source project that uses
Typescript to deliver a plugin.  Over the past few weeks I've been adding some
features to it, and I came to the sudden realization that I had been merrily
plodding along, crafting the code needed to do what the feature should be doing.
And I had just fallen into it.  Every once in a while I had to look up how
to do something like I was used to in C# (think LINQ), but most of it just
flowed naturally.  Once I figured out how to do hot reloading, I was really able
to haul.  Edit the TS files, run a little helper script that built the JS file,
copy the JS file to the right spot.  Fast iteration always makes development
suck less.

I always found myself wondering about development languages and techniques based
on JavaScript.  Node?  Why would anybody want to subject themselves to that kind
of pain?  But things have absolutely progressed since I was feeling all of those
paper cuts before, and Typescript seems to make things a lot easier to tackle.

I'm glad I found the opportunity to work on something new as well as get up to
speed on some tech I hadn't played with before.  I might even try tackling some
ideas that have been percolating in my head, but didn't finish because I didn't
want to deal with all of the nightmares of working with the client side.

And I haven't even dug that deeply into Blazor yet.

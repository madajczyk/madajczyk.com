---
comments: false
date: "2022-10-17T00:00:00Z"
tags:
  - site
title: Yet Another Refresh
description: Finally landed some signficant updates.
imagecredit: Ray Hennessy / Unsplash
---
Ah, excellent.

For the last two months, I've been working on migrating the tech stack
for this site from [Jekyll](https://jekyllrb.com/) over to [Hugo](https://gohugo.io/).
I had been considering making this move for quite a while, and even
[talked about it a bit]({{< ref "quicksand" >}}) at the start of the year.  After
procrastinating for a while, I decided at the end of August to tackle it.

First, Jekyll was a good publishing system, but over time I found it to be finicky.
Since it's Ruby based, I kept running into all kinds of dependency issues, especially
when I was still running Windows.  Figuring out how to keep it running felt like it
was a constant battle, especially since I was only publishing infrequently.  When the
urge to write something actually did strike, it became an impediment when it would take
an hour of fiddling around before I could even get it running to see it locally.
Switching over to
[VS Code Remote Containers]({{< ref "2021-03-29-jekyll-and-vs-code-remote-containers" >}})
helped to clean a lot of that up.  At first.  But lately, GitHub Depandbot started
reporting  more and more security vulnerabilities in the various NPM dependencies.  Tech
debt was building up, and it was really getting annoying.

I thought about a few different options, but ended up going with Hugo.  It just works.
A simple local runtime that does all the things.  It's easy to update on my system,
and natively supported by most of the big website generators.  And if I want to use a
platform that doesn't support it out of the box, I can just create a build pipeline
to get past that.

I still have a fond place in my heart from when I figured out how to use Jekyll and 
GitHub Pages, but since I moved over to Netlify a few years ago, I have more options.
Static Site Generators are still my favorite way to create sites (especially when I
sprinkle in serverless functions for any interactive stuff I need).  It's nice having
the option to move from one generator to the next fairly painlessly.  You still have to
learn the context of each system, but the content itself is portable.

Moving the content over was straightforward.  Created a branch, started whacking out
all the Jekyll specific stuff, used the Hugo import feature to get the articles in
the right spot.  I've built a few sites using Hugo in the past, but usually from
scratch.  This time I needed to work through some of the syntax to get things in the
right spot.  Plus, I needed to unlearn some of the ugly hacks I had put in to work
around some issues I had hit while using Jekyll.

The hardest part of all of this was doing enough to get the site updated to look right
in a browser, but not digging myself too deep of a hole by making big breaking changes
or other such things.  I couldn't help totally stop myself on this go around.  There
were some things that I really did want to improve, including:

* Revamping the home page to be a little more inviting instead of just a wall of words.
* Adding hero images to articles.
* Turning tags on.
* Updated to the latest version of [Bulma](https://bulma.io/) and taking advantage of
some of its features.

And there's stuff I still want to do, but have decided to defer for now:

* Making more improvements to the look and feel... supporting a dark theme?
* Possibly getting search to work locally instead of using Algolia.
* Try building some E2E tests using [Playwright](https://playwright.dev/).
* I'm sure other excuses I find to tweak things instead of creating content.

I've got some notes on things I'd like to write up in articles, specifically things I've
done with my home network and other such learnings.  But, before I can do that, I still
have to finish up this change and get it published.
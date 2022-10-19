---
date: "2003-05-22T00:00:00Z"
title: This is not brought to you by the letter P
oldsitenotice: Squarespace
---
Sesame Street be damned.

On Tuesday, I was called out to a client's site to assist with an e-mail problem. Apparently, their Exchange server got hungry and began eating incoming e-mails. Even worse, messages and contacts were also disappearing at an alarming rate.

Turns out, [Trend Micro][1] released a buggy anti-spam rule set that immediately decided that any message with a lower-case letter P in it was spam. Not like that's a common occurance or anything, to use the letter P in an e-mail. Anyway, within a few hours, the glitch was discovered and fixed.

This is an additional reason to triple-check all code before releasing to the public. According [to an article at Internet Week][2], less than 100 customers were affected by the problem. Im not sure which is worse... the fact that there was a problem, or the fact that less than 100 customers had set the Auto-Update feature on the spam rules. What version of Trend's rules are YOU running?

[1]: http://www.trend.com/
[2]: http://www.internetweek.com/breakingNews/showArticle.jhtml?articleID=10100109

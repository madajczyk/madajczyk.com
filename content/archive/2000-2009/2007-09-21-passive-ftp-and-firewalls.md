---
date: "2007-09-21T00:00:00Z"
title: Passive FTP and Firewalls
---
For the last few months, I've been receiving complaints from some of my customers that they were having trouble with the FTP services being offered through Cartoli.  Problems included being immediately disconnect from the server upon connection, fast timeouts, occasional problems with file transfers, etc.  In other words, the transfer portion of File Transfer Protocol wasn't working so hot.

The one thing that remained constant is that I could get transfers to work when the firewall was shut down.  Obviously not a permanent solution, it at least allowed the FTP services to be useful again.  As always, it's the firewall that's causing the damn problem.

Oh yeah, SSL uploads via port 990 were working beautifully.  That threw me for a loop, too.

After a ton of trial and error and investigation, I found some information on the **Application Layer Gateway Service** that is installed by default on Windows servers.  Apparently it's sole purpose in life, besides messing with me, is to assist with Internet Connection Sharing plug-ins and whatnot.

It appears that it was acting as a proxy of some sort which was breaking the connection.  This wasn't happening under the SSL sessions as the information was encrypted through the certificate.

I disabled that service on the server and immediately Passive FTP began working as expected.  Mind you, this is after a few months of digging into the problem off and on.

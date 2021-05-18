---
layout: post
title: "Paving Over Computers"
date: 2021-03-28 -0500
comments: false
---

I rebuild my various computers regularly, possibly even far too often.  It's actually pretty rare nowadays that I have a
daily driver machine whose operating system was installed more than 6 months prior.

A decent portion of this comes from using Windows for so long.  Although things appear to be getting better, it still
seems things get bogged down after you've gone through a few of the bigger OS updates.  I do want things to updated,
but I always find it annoying when the resulting system seems to be slower than ever.  Not to mention that the updates
always manage to come at the most inopportune times, because of course they do.

Since switching to Linux desktop usage full-time a few years, I've definitely done a bit of distro hopping.  The advent
of cloud services and other shifts in thinking make it easier to think of machines as being completely ephemeral.  I
first heard it described this way by Casey Liss on [Accidental Tech Podcast] awhile back, and I thought it perfectly
encapsulated the approach I've taken to my personal computers for at least the last 5 years or so now.  All of my data
files are either backed up in multiple places, in the cloud (ugh, so cliche but also true), or easily recoverable.

Running my systems this way allows me to be able to take the trusty "Nuke and Pave" approach.  Any time I feel like a
change, or if things aren't running right, I can destroy the installed OS (nuke) and start over with a clean OS
install (pave).  Thinking on it, it seems to me that this tried and true methodology of systems recovery helped in part
to set up the "Cattle, Not Pets" approach for cloud-based systems deployment.

When it comes time to reinstall the OS for the machine, I first determine if I have any files that need to be saved.  If
I do, I get them copied to a temporary holding location.  I also make note of those file so I can automate that process
in the future.  Then, I grab the installation media I've created so I can re-install from scratch.

Since the advent of USB boot drives for reinstall, I've always kept a few around, with each one labeled with whatever
OS I need.  For example, there's always a Windows 10 one available, as well one with whatever Linux flavor I'm using on
my desktop at that time.  This way I always have the ability to recover from something catastrophic.

However, this hasn't been without drawbacks.  When I need to rebuild a server, I end up hunting around for an empty USB
stick (or one I can temporarily press into service as such) and load it.  When I flip to a new OS, I need another USB
drive.  Sometimes it seems like I've been resetting USB a lot.  It was annoying, but just the cost of doing business.

Enter [Ventoy].  Paraphrased from the website:

> Ventoy is an open source tool to create a bootable USB drive for image files.
>
> With Ventoy, you don't need to format the disk over and over, you just need to copy the image files to the USB drive
> and boot them directly.

Ohmygoodness why didn't I find this sooner?  It's like dependency injection for disk images via USB boot drives.  Load
the ISO to the USB drive, select from the menu, and you're golden?  I tested it out, and it does what it says on the
tin.  Below is a screenshot of Ventoy running in Linux KVM, booted from my USB drive with the following command:

{% highlight ruby %}
kvm -hdb /dev/sdb
{% endhighlight %}

![](/assets/2021/paving-over-computers-ventoy.wepb)

The installation instructions on the site are fairly comprehensive, providing an EXE for Windows usage, a standard
script for Linux, and even a neat little Web UI that can be used on Linux as well.  Provide a standard USB disk and run
the install.  Copy the needed ISOs over to

So now, my new simplified plan is to have two identical USB drives with Ventoy installed.  I'll download the needed
source ISOs, and load them into my homelab storage.  Then I'll load the ISOs to each of the Ventoy USB drives so I can
use them.  Remember the golden rule, kids:

> Two is One, and One is None.

As an added bonus, in the case of something excessively horrible happening to my local machine, I can always fire up a
desktop instance from the Live USB so I can still do my jobby job.  Even more impressive is the ability to create and
define persistent storage as well.  Woot!

[Ventoy]: https://www.ventoy.net
[Accidental Tech Podcast]: https://atp.fm
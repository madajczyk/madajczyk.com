---
layout: post
title: "Jekyll and VS Code Remote Containers"
date: 2021-03-29 -0500
comments: false
---

I really, really enjoy using static web site generation systems like [Jekyll].

However, I generally hate getting them running after I [pave over] my desktop machine.

I started out with Jekyll back when GitHub first introduced [GitHub Pages]. It was great, but I was using Windows at the
time and there were a lot of hoops to jump through.  Even after moving to Linux, I found that Jekyll requires
installation of things I only use for the websites (e.g.: I generally don't do much Ruby development).  When I regularly
pave over my desktop, it makes it a bit of a hurdle to add new content to the site.  A side effect of this was that it 
basically afforded me a great excuse to not add content.

I converted the site over to use [Netlify] a few years ago.  This allows for a wide user of tooling to generate the
site, including alternatives such as [Hugo] which I use at work.  But, there is a cost to switching away from Jekyll,
specifically that the content needs to be adapted to the new templates and such.  Now, the overall look and feel of the
site currently isn't anything breathtaking, but I don't really wish to rip this particular bandage off right now.

So, as with so many things, containers to the rescue!  Microsoft announced the
[addition of container development tooling to VS Code][RemoteDevIntro] back in 2019.  I played around with it a little
bit, but didn't quite grasp how it could make my life better.  Wow, do I wish I would have dug deeper!  Lots of
additional details about using [remote containers in VS Code][VSCodeRemoteContainers] are available as well.

I did a little bit of searching, and came across a few kind souls who apparently had very similar thoughts, and before I
did, too.  The nerve!  Specifically: [Carlos Mendible][ClueA], [Steve Hocking][ClueB], and [Allison Thackston][ClueC].

The final result ended up being fairly straightforward:

* Ensure Docker is installed for Linux, or Docker Desktop for Windows/macOS. Microsoft details this in their
[install instructions][VSCodeRemoteDockerInstall].
* Add the [Remote Containers extension][Extension] in from the marketplace.
* Create an appropriate dockerfile and devcontainer.json file to the repo; [see my commit here][DevContainer].
* Add a task to the vscode folder that defines how to start Jekyll.  I actually did this first, you can
[see that commit][Task] as well.  I also had to update gitignore to remove that folder.  I don't remember why I had that
on, but I for sure want this checked in.

| Using the extension | |
|-|-|
| Adding the extension gives you this cute little green panel in the lower right hand corner: | ![](){: data-src="/assets/2021/2021-03-29-jekyll-and-vs-code-remote-containers-standard.png"} |
| When you open a folder that the extension thinks can be containerized, it will prompt you: | ![](){: data-src="/assets/2021/2021-03-29-jekyll-and-vs-code-remote-containers-reopen-folder.png"} |
| After opening in the container, the green panel lets you know that you're connected to a remote container: | ![](){: data-src="/assets/2021/2021-03-29-jekyll-and-vs-code-remote-containers-in-dev-container.png"} |
| Clicking the green panel gives you additional options in the command palette: | ![](){: data-src="/assets/2021/2021-03-29-jekyll-and-vs-code-remote-containers-command-palette.png"} |
| Running the configured tasks from the Command Palette: | ![](){: data-src="/assets/2021/2021-03-29-jekyll-and-vs-code-remote-containers-run-task.png"} |

And, uh, that's about it.  I was able to clone the [repo for this site][SiteRepo] to a fresh Linux box, and after a few
minutes of restoration, everything just worked with zero monkeying around.  I didn't test on a Windows machine, but I
have very little doubt that it should does what it says on the tin.

I've only begun to scratch the surface on where I can plug this into my workflows, but I'm pretty excited to dig deeper
into the possibilities that the remote containers feature of VS Code offers.

[Jekyll]: https://jekyllrb.com/
[Pave Over]: {% post_url 2021-03-28-paving-over-computers %}
[GitHub Pages]: https://pages.github.com/
[Netlify]: https://www.netlify.com/
[Hugo]: https://gohugo.io/
[RemoteDevIntro]: https://code.visualstudio.com/blogs/2019/05/02/remote-development
[VSCodeRemoteContainers]: https://code.visualstudio.com/docs/remote/containers
[VSCodeRemoteDockerInstall]: https://code.visualstudio.com/docs/remote/containers#_installation
[ClueA]: https://carlos.mendible.com/2020/01/10/vs-code-remote-containers-jekyll/
[ClueB]: https://www.codemunki.es/2020/09/22/run-jekyll-vs-code-devcontainer/
[ClueC]: https://allisonthackston.com/articles/vscode-docker-github-pages.html
[Extension]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
[DevContainer]: https://github.com/madajczyk/madajczyk.com/commit/a62c9662dbf894f91ee62323ec55cc11fac890b4
[Task]: https://github.com/madajczyk/madajczyk.com/commit/56409dc35c776ba3e63a94132ec8dfde7815daef#diff-7d76d7533653c23b753fc7ce638cf64bdb5e419927d276af836d3a03fdf1745a
[SiteRepo]: https://github.com/madajczyk/madajczyk.com
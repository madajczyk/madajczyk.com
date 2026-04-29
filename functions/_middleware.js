export async function onRequest({ request, next }) {
  const accept = request.headers.get("Accept") ?? "";

  if (request.method === "GET" && accept.includes("text/markdown")) {
    const url = new URL(request.url);
    let path = url.pathname;

    // Don't double-rewrite direct .md requests
    if (!path.endsWith(".md")) {
      // Homepage has no index.md — serve llms.txt instead
      if (path === "/") {
        url.pathname = "/llms.txt";
      } else {
        if (!path.endsWith("/")) path += "/";
        url.pathname = path + "index.md";
      }

      const mdResponse = await fetch(url.toString());
      if (mdResponse.ok) {
        return new Response(mdResponse.body, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      }
    }
  }

  return next();
}

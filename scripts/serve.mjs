import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { createServer } from "node:http";

const root = resolve(".");
const port = Number(process.env.PORT || 5173);
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"]
]);

function resolvePath(url) {
  const pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  const target = resolve(join(root, pathname));

  if (!target.startsWith(root)) {
    return null;
  }

  if (!existsSync(target)) {
    return null;
  }

  if (statSync(target).isDirectory()) {
    return join(target, "index.html");
  }

  return target;
}

const server = createServer((request, response) => {
  const file = resolvePath(request.url);

  if (!file || !existsSync(file)) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, { "content-type": types.get(extname(file)) || "application/octet-stream" });
  createReadStream(file).pipe(response);
});

server.listen(port, () => {
  console.log(`BrickWall Planner running at http://localhost:${port}`);
});

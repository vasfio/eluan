import { cpSync, mkdirSync, writeFileSync } from "fs";

const out = "storybook-dist";

mkdirSync(`${out}/core`, { recursive: true });
mkdirSync(`${out}/web`, { recursive: true });

cpSync("packages/core/storybook-static", `${out}/core`, { recursive: true });
cpSync("packages/web/storybook-static", `${out}/web`, { recursive: true });

writeFileSync(
  `${out}/index.html`,
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eluan Storybook</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #fafafa; }
    .container { text-align: center; }
    h1 { font-size: 2rem; font-weight: 700; margin-bottom: 2rem; color: #111; }
    .links { display: flex; gap: 1.5rem; }
    a { display: block; padding: 1.5rem 3rem; background: #111; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; font-size: 1.1rem; transition: opacity 0.15s; }
    a:hover { opacity: 0.85; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Eluan Design System</h1>
    <div class="links">
      <a href="./core/">Core</a>
      <a href="./web/">Web</a>
    </div>
  </div>
</body>
</html>`
);

console.log("Assembled storybook-dist/");

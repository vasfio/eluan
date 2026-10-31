// Eval viewer: renders each run's output against the built @eluan/core, the
// same build the eval typechecks against. Run `pnpm build` first, then
// `pnpm evals:viewer` from the repo root.
//
// This folder isn't a workspace package, so plugins and runtime packages are
// resolved from packages/core's node_modules rather than installed here.
import { realpathSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, "../../../..");
const core = resolve(repo, "packages/core");
const require = createRequire(resolve(core, "package.json"));
const pkg = (name) => realpathSync(resolve(core, "node_modules", name));

const { default: react } = await import(require.resolve("@vitejs/plugin-react"));
const { default: stylex } = await import(require.resolve("@stylexjs/unplugin"));

// Bare imports in the viewer and in the eval runs point at these copies.
const packages = ["react", "react-dom", "lucide-react", "sonner", "@stylexjs/stylex"];

export default {
  root: here,
  plugins: [stylex.vite({ useCSSLayers: true }), react()],
  resolve: {
    alias: [
      { find: "@eluan/core/styles.css", replacement: resolve(core, "dist/styles.css") },
      { find: /^@eluan\/core$/, replacement: resolve(core, "dist/index.js") },
      { find: /^@eluan\/theme-generator$/, replacement: resolve(repo, "packages/theme-generator/dist/index.js") },
      ...packages.map((name) => ({
        find: new RegExp(`^${name.replace("/", "\\/")}(/.*)?$`),
        replacement: `${pkg(name)}$1`,
      })),
    ],
    dedupe: ["react", "react-dom"],
  },
  server: { port: 6019, strictPort: true, fs: { allow: [repo] } },
  build: {
    outDir: resolve(here, "dist"),
    emptyOutDir: true,
    rollupOptions: { input: { index: resolve(here, "index.html"), frame: resolve(here, "frame.html") } },
  },
};

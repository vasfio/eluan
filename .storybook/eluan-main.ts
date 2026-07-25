import { readFile, writeFile } from "fs/promises"
import type { StorybookConfig } from "@storybook/react-vite"
import { createRequire } from "module"
import { join } from "path"
import { pathToFileURL } from "url"
import { mergeConfig, type Plugin, type UserConfig } from "vite"

type EluanStorybookConfigOptions = {
  aliases?: Record<string, string>
  coreRoot: string
  disableTelemetry?: boolean
  packageRoot: string
  stories: StorybookConfig["stories"]
  vite?: UserConfig
}

const addons = [
  "@storybook/addon-essentials",
  "@storybook/addon-interactions",
  "@storybook/addon-links",
] satisfies StorybookConfig["addons"]

function isStorybookStylexCssTarget(fileName: string) {
  const assetName = fileName.split("/").pop() ?? fileName

  return fileName.endsWith(".css") && !/^(?:[1-9]00)(?:\.|-)/.test(assetName)
}

function createStorybookStylexCssPlugin(): Plugin {
  return {
    name: "eluan-storybook-stylex-css",
    enforce: "post",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const cssAssets = Object.values(bundle).filter(
          (asset): asset is Extract<typeof asset, { type: "asset" }> =>
            asset.type === "asset" &&
            typeof asset.fileName === "string" &&
            asset.fileName.endsWith(".css"),
        )
        const stylexAssets = cssAssets.filter((asset) => {
          const source = asset.source?.toString() ?? ""

          return source.includes("@layer priority")
        })
        const target = cssAssets.find((asset) => {
          const source = asset.source?.toString() ?? ""

          return source.includes("--container-bg") && source.includes("[data-theme")
        })

        if (!target || stylexAssets.length === 0) {
          return
        }

        const targetSource = target.source?.toString() ?? ""
        const stylexCss = stylexAssets
          .filter((asset) => asset.fileName !== target.fileName)
          .map((asset) => asset.source?.toString() ?? "")
          .filter(Boolean)
          .join("\n")

        if (stylexCss && !targetSource.includes("@layer priority")) {
          target.source = `${targetSource}\n${stylexCss}`
        }
      },
    },
    async writeBundle(options, bundle) {
      if (!options.dir) {
        return
      }

      const cssAssets = Object.values(bundle).filter(
        (asset): asset is Extract<typeof asset, { type: "asset" }> =>
          asset.type === "asset" &&
          typeof asset.fileName === "string" &&
          asset.fileName.endsWith(".css"),
      )
      const cssFiles = await Promise.all(
        cssAssets.map(async (asset) => {
          const filePath = join(options.dir!, asset.fileName)

          try {
            return {
              content: await readFile(filePath, "utf8"),
              fileName: asset.fileName,
              filePath,
            }
          } catch {
            return null
          }
        }),
      )
      const readableCssFiles = cssFiles.filter(
        (file): file is NonNullable<(typeof cssFiles)[number]> => file !== null,
      )
      const stylexFiles = readableCssFiles.filter((file) =>
        file.content.includes("@layer priority"),
      )
      const target = readableCssFiles.find(
        (file) =>
          file.content.includes("--container-bg") && file.content.includes("[data-theme"),
      )

      const targetHasStylexRules = /@layer priority\d+\s*\{[^}]*\.[\w-]+\s*\{/.test(
        target?.content ?? "",
      )

      if (!target || stylexFiles.length === 0 || targetHasStylexRules) {
        return
      }

      const stylexCss = stylexFiles
        .filter((file) => file.fileName !== target.fileName)
        .map((file) => file.content)
        .join("\n")

      if (stylexCss) {
        await writeFile(target.filePath, `${target.content}\n${stylexCss}`, "utf8")
      }
    },
  }
}

export function createEluanReactViteStorybookConfig({
  aliases,
  coreRoot,
  disableTelemetry,
  packageRoot,
  stories,
  vite,
}: EluanStorybookConfigOptions): StorybookConfig {
  return {
    stories,
    addons,
    framework: {
      name: "@storybook/react-vite",
      options: {},
    },
    docs: {
      autodocs: "tag",
    },
    ...(disableTelemetry ? { core: { disableTelemetry: true } } : {}),
    viteFinal: async (config) => {
      const requireFromPackage = createRequire(join(packageRoot, "package.json"))
      const stylexModule = await import(
        pathToFileURL(requireFromPackage.resolve("@stylexjs/unplugin")).href
      )
      const stylex = stylexModule.default ?? stylexModule

      return mergeConfig(
        config,
        mergeConfig(
          {
            plugins: [
              stylex.vite({
                cssInjectionTarget: isStorybookStylexCssTarget,
                devMode: "full",
                devPersistToDisk: true,
              }),
              createStorybookStylexCssPlugin(),
            ],
            resolve: {
              alias: {
                "@": join(packageRoot, "src"),
                // Point at the src *directory* (not src/index.ts) so that both
                // the bare specifier (`@eluan/core` -> src/index.ts via
                // directory-index resolution) and subpath specifiers
                // (`@eluan/core/header` -> src/header.ts) resolve. The web
                // facade re-exports from `@eluan/core/header` / `.../footer`,
                // which a file-targeted alias could not resolve.
                "@eluan/core": join(coreRoot, "src"),
                ...aliases,
              },
            },
          } satisfies UserConfig,
          vite ?? {},
        ),
      )
    },
  }
}

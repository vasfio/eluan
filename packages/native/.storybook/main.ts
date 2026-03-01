import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import { join, dirname } from "path"

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")))
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-links"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite") as "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "react-native": "react-native-web",
          "@": join(dirname(__dirname), "src"),
        },
        extensions: [
          ".web.tsx",
          ".web.ts",
          ".web.jsx",
          ".web.js",
          ".tsx",
          ".ts",
          ".jsx",
          ".js",
        ],
      },
      define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
        __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      },
      optimizeDeps: {
        include: ["react-native-web"],
        esbuildOptions: {
          resolveExtensions: [
            ".web.tsx",
            ".web.ts",
            ".web.jsx",
            ".web.js",
            ".tsx",
            ".ts",
            ".jsx",
            ".js",
          ],
          loader: {
            ".js": "jsx",
          },
        },
      },
    })
  },
}

export default config

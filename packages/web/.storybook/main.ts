import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import { join, dirname } from "path"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    // Disable autodocs globally - pre-rendering all stories causes memory issues
    autodocs: false,
  },
  core: {
    disableTelemetry: true,
  },
  viteFinal: async (config) => {
    const tailwindcss = (await import("@tailwindcss/vite")).default
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@": join(dirname(__dirname), "src"),
        },
      },
      // Optimize for stability with many stories
      optimizeDeps: {
        include: ["react", "react-dom"],
      },
      server: {
        // Increase timeout for HMR to prevent disconnections
        hmr: {
          timeout: 5000,
        },
      },
    })
  },
}

export default config

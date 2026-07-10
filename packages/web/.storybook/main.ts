import { join, dirname } from "path"
import { createEluanReactViteStorybookConfig } from "../../../.storybook/eluan-main"

const packageRoot = dirname(__dirname)
const coreRoot = join(dirname(packageRoot), "core")

export default createEluanReactViteStorybookConfig({
  coreRoot,
  disableTelemetry: true,
  packageRoot,
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  vite: {
    build: {
      chunkSizeWarningLimit: 800,
    },
    optimizeDeps: {
      exclude: ["@storybook/blocks"],
    },
  },
})

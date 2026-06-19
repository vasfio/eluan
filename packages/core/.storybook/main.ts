import { dirname } from "path"
import { createRagnarReactViteStorybookConfig } from "../../../.storybook/ragnar-main"

const packageRoot = dirname(__dirname)

export default createRagnarReactViteStorybookConfig({
  coreRoot: packageRoot,
  packageRoot,
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
})

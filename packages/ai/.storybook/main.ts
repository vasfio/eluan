import { join, dirname } from "path"
import { createRagnarReactViteStorybookConfig } from "../../../.storybook/ragnar-main"

const packageRoot = dirname(__dirname)
const coreRoot = join(dirname(packageRoot), "core")

export default createRagnarReactViteStorybookConfig({
  coreRoot,
  packageRoot,
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
})

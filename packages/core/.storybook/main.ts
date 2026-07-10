import { dirname } from "path"
import { createEluanReactViteStorybookConfig } from "../../../.storybook/eluan-main"

const packageRoot = dirname(__dirname)

export default createEluanReactViteStorybookConfig({
  coreRoot: packageRoot,
  packageRoot,
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
})

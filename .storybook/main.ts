import { join, dirname } from "path"
import { createEluanReactViteStorybookConfig } from "./eluan-main"

const workspaceRoot = dirname(__dirname)
const coreRoot = join(workspaceRoot, "packages/core")

export default createEluanReactViteStorybookConfig({
  coreRoot,
  packageRoot: coreRoot,
  stories: [
    "../packages/core/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/web/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
})

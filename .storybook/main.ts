import { join, dirname } from "path"
import { createRagnarReactViteStorybookConfig } from "./ragnar-main"

const workspaceRoot = dirname(__dirname)
const coreRoot = join(workspaceRoot, "packages/core")

export default createRagnarReactViteStorybookConfig({
  coreRoot,
  packageRoot: coreRoot,
  stories: [
    "../packages/core/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/web/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
})

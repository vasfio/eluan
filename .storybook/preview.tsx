import "../packages/core/src/styles/globals.css"

import type { Preview } from "@storybook/react"

import {
  createRagnarDecorator,
  ragnarGlobalTypes,
  ragnarInitialGlobals,
  ragnarParameters,
} from "./ragnar-preview"

const preview: Preview = {
  decorators: [createRagnarDecorator()],
  globalTypes: ragnarGlobalTypes,
  initialGlobals: ragnarInitialGlobals,
  parameters: ragnarParameters,
}

export default preview

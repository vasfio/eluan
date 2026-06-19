import "../src/styles/globals.css"

import type { Preview } from "@storybook/react"

import {
  createRagnarDecorator,
  ragnarGlobalTypes,
  ragnarInitialGlobals,
  ragnarParameters,
} from "../../../.storybook/ragnar-preview"

const preview: Preview = {
  decorators: [createRagnarDecorator({ padded: false })],
  globalTypes: ragnarGlobalTypes,
  initialGlobals: ragnarInitialGlobals,
  parameters: ragnarParameters,
}

export default preview

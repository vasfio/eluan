import "../src/styles/globals.css"

import type { Preview } from "@storybook/react"

import {
  createEluanDecorator,
  eluanGlobalTypes,
  eluanInitialGlobals,
  eluanParameters,
} from "../../../.storybook/eluan-preview"

const preview: Preview = {
  decorators: [createEluanDecorator()],
  globalTypes: eluanGlobalTypes,
  initialGlobals: eluanInitialGlobals,
  parameters: eluanParameters,
}

export default preview

import type { StorybookConfig } from "@storybook/react-native"

const main: StorybookConfig = {
  stories: ["../../../packages/native/src/components/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
  ],
}

export default main

# @ragnar/storybook-native

On-device Storybook for testing `@ragnar/native` components on iOS and Android.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- iOS: Xcode + iOS Simulator
- Android: Android Studio + Emulator
- Or: Expo Go app on your device

### Installation

From the monorepo root:

```bash
pnpm install
```

### Running Storybook

**iOS Simulator:**
```bash
cd apps/storybook-native
pnpm ios
```

**Android Emulator:**
```bash
cd apps/storybook-native
pnpm android
```

**Expo Go (physical device):**
```bash
cd apps/storybook-native
pnpm start
```
Then scan the QR code with the Expo Go app.

## Components Available

The following components from `@ragnar/native` are included:

### Core Components
- Button, Card, Input, TextArea
- Badge, Avatar, Checkbox, Radio, Switch, Slider

### Feedback
- Alert, Toast, Progress, Spinner, Skeleton

### Layout
- Separator, SafeAreaView, ScrollView

### Navigation
- BackButton, BottomSheet, ActionSheet, BottomTabBar

## Project Structure

```
apps/storybook-native/
├── .storybook/
│   ├── main.ts              # Storybook config
│   ├── preview.tsx          # Global decorators
│   ├── index.tsx            # Storybook entry
│   └── storybook.requires.ts # Story imports
├── app/
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Home screen
│   └── storybook.tsx        # Storybook screen
├── app.json                  # Expo config
├── babel.config.js
├── metro.config.js
└── package.json
```

## Adding New Stories

1. Create a story file in `packages/native/src/components/MyComponent.stories.tsx`
2. Add the import to `.storybook/storybook.requires.ts`
3. Restart the dev server

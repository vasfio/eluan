# Ragnar Design System

A comprehensive, multi-platform design system built with React and React Native.

## Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@vasf/ragnar-tokens` | Shared design tokens (colors, spacing, typography) | ✅ Ready |
| `@vasf/ragnar-core` | Core UI components (Button, Card, Dialog, etc.) | ✅ Ready |
| `@vasf/ragnar-web` | Marketing & web-specific components (Hero, Pricing, etc.) | ✅ Ready |
| `@vasf/ragnar-native` | React Native components | 🚧 In Progress |

The initial published release set is `@vasf/ragnar-tokens`, `@vasf/ragnar-core`, and `@vasf/ragnar-web`.
`@vasf/ragnar-native` remains in the monorepo but is not part of the GitHub Actions release pipeline yet.

## Installation

```bash
# Install core components for web
npm install @vasf/ragnar-core

# Install marketing components
npm install @vasf/ragnar-web

# Install React Native components
npm install @vasf/ragnar-native

# Install tokens only
npm install @vasf/ragnar-tokens
```

## Usage

### Web (React)

```tsx
// Core components
import { Button, Card, Dialog } from '@vasf/ragnar-core'
import '@vasf/ragnar-core/styles.css'

// Marketing components
import { Hero, PricingTable, Testimonial } from '@vasf/ragnar-web'
```

### React Native

```tsx
import { Button, Card } from '@vasf/ragnar-native'
import { colors, spacing } from '@vasf/ragnar-tokens'
```

## Package Details

### @vasf/ragnar-tokens

Shared design tokens that work across all platforms:

- Colors (light & dark themes)
- Spacing scale
- Typography (font sizes, weights, line heights)
- Border radii
- Shadows
- Animation durations & easings
- Z-index scale
- Breakpoints

### @vasf/ragnar-core

46+ UI components following shadcn/ui patterns:

- **Layout**: Card, Separator, Skeleton
- **Forms**: Input, Textarea, Checkbox, Radio, Select, Switch, Slider
- **Feedback**: Dialog, Sheet, Tooltip, Popover, Sonner (Toast)
- **Navigation**: Tabs, Breadcrumb, Pagination, Dropdown Menu
- **Data Display**: Table, Avatar, Badge, Progress
- **Advanced**: Calendar, Date Picker, DateTime Picker, Command, Carousel
- **Custom**: Code Block, Rating, Rich Text Editor, Tree View, Stepper

### @vasf/ragnar-web

9 marketing-focused components:

- **Hero**: Full-featured hero sections
- **Feature Spot**: Feature showcases with grid/split layouts
- **Content Spot**: Flexible content sections
- **Header Navigation**: Responsive headers with mobile menu
- **Pricing Table**: Feature comparison tables
- **Pricing Options**: Card-based pricing display
- **Email Form**: Newsletter signup forms
- **Quote**: Blockquotes with author attribution
- **Testimonial**: Customer testimonials with ratings

### @vasf/ragnar-native

React Native equivalents using the same design tokens:

- Button
- Card
- More coming soon...

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run Storybook (core)
pnpm storybook

# Run Storybook (web)
pnpm storybook:web
```

## Project Structure

```
ragnar/
├── packages/
│   ├── tokens/      # @vasf/ragnar-tokens - Design tokens
│   ├── core/        # @vasf/ragnar-core - Core UI components
│   ├── web/         # @vasf/ragnar-web - Marketing components
│   └── native/      # @vasf/ragnar-native - React Native components
├── package.json     # Root package.json with workspaces
└── pnpm-workspace.yaml
```

## License

MIT

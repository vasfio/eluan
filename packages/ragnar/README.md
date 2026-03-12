# Ragnar Design System

Ragnar is a multi-platform design system with React web components, marketing components, React Native components, and shared design tokens.

## Setup

### 1. Configure `.npmrc` for GitHub Packages

Add or update `.npmrc` in your project root:

```
@ragnar:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Set `NODE_AUTH_TOKEN` to a GitHub Personal Access Token (or `GITHUB_TOKEN` in CI) with `read:packages` scope.

### 2. Install

```bash
npm install ragnar
# or
pnpm add ragnar
# or
yarn add ragnar
```

---

## Usage

### Core (React web components — Radix UI + Tailwind)

```tsx
import { Button, Dialog, Input } from 'ragnar/core'

// CSS — import once at your app entry point
import 'ragnar/core/styles.css'
```

### Web (Marketing components)

```tsx
import { HeroSection, FeatureGrid } from 'ragnar/web'

// CSS — import once at your app entry point
import 'ragnar/web/styles.css'
```

### Native (React Native components)

```tsx
import { Button, Text } from 'ragnar/native'
```

> React Native uses Metro bundler — no CSS imports needed.

### Tokens (Design tokens)

```ts
import { colors, spacing, typography } from 'ragnar/tokens'
```

#### CSS custom properties (web)

```css
/* In your global CSS */
@import 'ragnar/tokens/css';
```

---

## Peer Dependencies

Install the appropriate peer dependencies for your platform:

**Web / Core:**
```bash
npm install react react-dom
```

**Native:**
```bash
npm install react react-native
```

---

## Subpath summary

| Import | Contents |
|--------|----------|
| `ragnar/core` | Radix UI + Tailwind components |
| `ragnar/core/styles.css` | Core component styles |
| `ragnar/web` | Marketing / landing page components |
| `ragnar/web/styles.css` | Web component styles |
| `ragnar/native` | React Native components |
| `ragnar/tokens` | JS design tokens |
| `ragnar/tokens/css` | CSS custom properties |

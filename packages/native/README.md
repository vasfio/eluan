# @vasf/ragnar-native

> React Native UI components sharing the [Ragnar](https://github.com/frolda/ragnar) design system's token architecture.

## Install

```bash
npm install @vasf/ragnar-native @vasf/ragnar-tokens
yarn add @vasf/ragnar-native @vasf/ragnar-tokens
pnpm add @vasf/ragnar-native @vasf/ragnar-tokens
bun add @vasf/ragnar-native @vasf/ragnar-tokens
```

## Use

```tsx
import { Button, Card } from "@vasf/ragnar-native"

export default function Screen() {
  return (
    <Card>
      <Button title="Hello" onPress={() => {}} />
    </Card>
  )
}
```

Tokens are wired through React Native StyleSheet equivalents — no DOM, no Tailwind required.

## Peer requirements

- `react` 18+
- `react-native` 0.70 – 0.79

## License

MIT

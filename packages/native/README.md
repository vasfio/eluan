# @eluan/native

> React Native UI components sharing the [Eluan](https://github.com/vasfio/eluan) design system's token architecture.

## Install

```bash
npm install @eluan/native @eluan/tokens
yarn add @eluan/native @eluan/tokens
pnpm add @eluan/native @eluan/tokens
bun add @eluan/native @eluan/tokens
```

## Use

```tsx
import { Button, Card } from "@eluan/native"

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

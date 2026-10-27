---
name: iconography
---

# Iconography

## Overview

Eluan uses [Lucide](https://lucide.dev) icons (`lucide-react`, a dependency of `@eluan/core`). Components that need icons already render them: Input picks a leading icon from its `type`, PasswordInput has the show/hide eye, Select and Accordion have their chevrons. Icons draw with `currentColor`, so they take the colour of the text around them.

Icon boxes are sized with `--size-*` tokens, so they scale with density. Components use `--size-xxs` for icons inside controls.

## Rules

1. Use `lucide-react` icons. Don't mix in other icon sets or inline SVGs, except brand logos.
2. Size icons with `--size-*` tokens: `--size-xxs` inside controls and text, `--size-xs` or `--size-sm` for standalone icons. Never use Lucide's numeric `size` prop or px values.
3. Let icons inherit colour. Set `color` on the parent with a token if the icon must differ from the text.
4. Mark decorative icons `aria-hidden="true"`.
5. Give every icon-only control an accessible name: `aria-label` on the Button, not on the icon.
6. Use Button with an `icon`, `iconSm`, `iconXs` or `iconInline` size for icon-only actions. There is no IconButton.
7. Don't add an icon to Input for `type="search"`, `email`, `password`, `tel` or `url`; it already shows one. Pass `icon` for a custom one or `icon={false}` to remove it; `icon={null}` keeps the automatic icon. <!-- REVIEW: input.tsx resolves icon ?? autoIcon, so null falls through; the old skill says null suppresses it. -->
8. Brand logos: inline the SVG with `fill="currentColor"` and `fillRule="evenodd"` so cutouts stay transparent.

## Tokens

<!-- tokens:start -->
| Token | Value (default theme) | Use for |
| --- | --- | --- |
| `--size-xxs` | 14px (compact 12px, wide 20px) | Control height, icon size |
| `--size-xs` | 18px (compact 16px, wide 24px) | Control height, icon size |
| `--size-sm` | 22px (compact 20px, wide 32px) | Control height, icon size |
| `--size-md` | 28px (compact 24px, wide 40px) | Control height, icon size |
<!-- tokens:end -->

## Choosing a value

| If you need… | Use |
| --- | --- |
| an icon next to button or input text | `--size-xxs` |
| an icon-only button | Button `size="icon"` with the icon at `--size-xxs` <!-- REVIEW: button.tsx doesn't size child SVGs; --size-xxs follows Input's icon size. --> |
| a small icon-only button in a dense row | Button `size="iconSm"` or `"iconXs"` |
| an icon inline with body text | Button `size="iconInline"` for actions; `--size-xxs` for decoration |
| a standalone illustrative icon (empty state) | `--size-sm` to `--size-md` <!-- REVIEW: no source for standalone icon size; drafted from the scale. --> |

## Dos and don'ts

**Do:** name the button and hide the icon.

```tsx
import { X } from "lucide-react";
import { Button } from "@eluan/core";

<Button variant="ghost" size="icon" aria-label="Close panel">
  <X aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
</Button>;
```

**Don't:** leave an icon-only control unnamed or sized in px.

```tsx
<button onClick={close}>
  <X size={24} color="#666" />
</button>
```

## Common agent mistakes

_Filled from evals._

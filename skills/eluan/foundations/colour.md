---
name: colour
---

# Colour

## Overview

Every colour in Eluan is a semantic token set by the theme and resolved against the active mode (light, dim, dark). Token names say what a colour is for, not what it looks like: `--container-bg` is a surface, `--action-primary-bg` is the main call to action. A custom theme or the theme generator changes the values; the names stay the same. See [theming.md](./theming.md).

Tokens come in families, and each family has matching background, foreground and border tokens per state:

| Family | For |
| --- | --- |
| `--container-*` | surfaces: page, cards, panels, popovers, table rows |
| `--interactive-*` | inputs, selectable rows, hoverable items |
| `--focus-ring` | the keyboard focus outline; components draw it, so you rarely need it |
| `--action-primary-*` | the main action (Button `default`) |
| `--action-secondary-*` | outline actions (Button `outline`) |
| `--action-tertiary-*` | ghost actions (Button `ghost`) |
| `--destructive-*` | errors and destructive actions |
| `--cautionary-*` | warnings; the `caution` tone in component props |
| `--positive-*` | success |
| `--informative-*` | neutral information |
| `--important-*` | emphasis that isn't a warning |
| `--dataviz-*` | chart series only |

## Rules

1. Use semantic tokens for every colour. Never write hex, rgb, hsl or oklch values.
2. Pair a background with the foreground from the same family and state: `--container-bg` with `--container-fg`, `--action-primary-bg-active` with `--action-primary-fg-active`.
3. Use a tone component prop (`variant="destructive"`, `variant="caution"`) before reaching for tone tokens yourself.
4. The `caution` tone reads the `--cautionary-*` tokens. There is no separate caution token family.
5. Use `--dataviz-*` only for chart series, never for status or decoration.
6. Never use primitives (`--color-*`, `--blazeorange-*`) or the mode layer (`--backgrounds-*`, `--foregrounds-*`) in app code.
7. Never override one side of a pair. Contrast is checked at theme generation; change the theme instead.
8. Never mix states: don't put a `-hover` background behind a resting foreground.

## Tokens

Values show the mode alias each token points to, then the resolved value in light mode (and dark mode where it differs).

<!-- tokens:start -->
| Token | Value (default theme) | Use for |
| --- | --- | --- |
| `--container-bg` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Surfaces (cards, panels, popovers): background |
| `--container-bg-alt` | `--backgrounds-secondary` → oklch(0.9702 0.0000 0.00) / dark oklch(0.2046 0.0000 0.00) | Surfaces (cards, panels, popovers): subtle alternate background |
| `--container-bg-inverse` | `--foregrounds-secondary` → oklch(0.2686 0.0000 0.00) / dark oklch(0.9702 0.0000 0.00) | Surfaces (cards, panels, popovers): background on an inverse surface |
| `--container-border` | `--backgrounds-tertiary` → oklch(0.9219 0.0000 0.00) / dark oklch(0.1448 0.0000 0.00) | Surfaces (cards, panels, popovers): border |
| `--container-border-alt` | `--backgrounds-quaternary` → oklch(0.8699 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Surfaces (cards, panels, popovers): subtle border |
| `--container-border-inverse` | `--foregrounds-tertiary` → oklch(0.4386 0.0000 0.00) / dark oklch(0.9219 0.0000 0.00) | Surfaces (cards, panels, popovers): border on an inverse surface |
| `--container-fg` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Surfaces (cards, panels, popovers): text and icons |
| `--container-fg-alt` | `--foregrounds-secondary` → oklch(0.2686 0.0000 0.00) / dark oklch(0.9702 0.0000 0.00) | Surfaces (cards, panels, popovers): muted text and icons |
| `--container-fg-inverse` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Surfaces (cards, panels, popovers): text on an inverse surface |
| `--interactive-bg` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Inputs and selectable items: background |
| `--interactive-bg-alt` | `--backgrounds-secondary` → oklch(0.9702 0.0000 0.00) / dark oklch(0.2046 0.0000 0.00) | Inputs and selectable items: subtle alternate background |
| `--interactive-bg-alt2` | `--backgrounds-secondary` → oklch(0.9702 0.0000 0.00) / dark oklch(0.2046 0.0000 0.00) | Inputs and selectable items: second alternate background |
| `--interactive-bg-disabled` | `--backgrounds-tertiary` → oklch(0.9219 0.0000 0.00) / dark oklch(0.1448 0.0000 0.00) | Inputs and selectable items: background when disabled |
| `--interactive-bg-hover` | `--backgrounds-tertiary` → oklch(0.9219 0.0000 0.00) / dark oklch(0.1448 0.0000 0.00) | Inputs and selectable items: background on hover |
| `--interactive-bg-active` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Inputs and selectable items: background while pressed |
| `--interactive-bg-selected` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Inputs and selectable items: background when selected |
| `--interactive-bg-inverse` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Inputs and selectable items: background on an inverse surface |
| `--interactive-border` | `--backgrounds-tertiary` → oklch(0.9219 0.0000 0.00) / dark oklch(0.1448 0.0000 0.00) | Inputs and selectable items: border |
| `--interactive-border-alt` | `--backgrounds-quaternary` → oklch(0.8699 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Inputs and selectable items: subtle border |
| `--interactive-border-disabled` | `--backgrounds-quaternary` → oklch(0.8699 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Inputs and selectable items: border when disabled |
| `--interactive-fg` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Inputs and selectable items: text and icons |
| `--interactive-fg-alt` | `--foregrounds-tertiary` → oklch(0.4386 0.0000 0.00) / dark oklch(0.9219 0.0000 0.00) | Inputs and selectable items: muted text and icons |
| `--interactive-fg-readonly` | `--foregrounds-secondary` → oklch(0.2686 0.0000 0.00) / dark oklch(0.9702 0.0000 0.00) | Inputs and selectable items: text when read-only |
| `--interactive-fg-disabled` | `--foregrounds-quinary` → oklch(0.7090 0.0000 0.00) | Inputs and selectable items: text when disabled |
| `--interactive-fg-active` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Inputs and selectable items: text while pressed |
| `--interactive-fg-selected` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Inputs and selectable items: text when selected |
| `--interactive-fg-inverse` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Inputs and selectable items: text on an inverse surface |
| `--action-primary-bg` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Primary actions: background |
| `--action-primary-bg-hover` | `--foregrounds-tertiary` → oklch(0.4386 0.0000 0.00) / dark oklch(0.9219 0.0000 0.00) | Primary actions: background on hover |
| `--action-primary-bg-active` | `--foregrounds-secondary` → oklch(0.2686 0.0000 0.00) / dark oklch(0.9702 0.0000 0.00) | Primary actions: background while pressed |
| `--action-primary-bg-selected` | `--foregrounds-secondary` → oklch(0.2686 0.0000 0.00) / dark oklch(0.9702 0.0000 0.00) | Primary actions: background when selected |
| `--action-primary-bg-disabled` | `--foregrounds-quinary` → oklch(0.7090 0.0000 0.00) | Primary actions: background when disabled |
| `--action-primary-bg-inverse` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Primary actions: background on an inverse surface |
| `--action-primary-fg` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Primary actions: text and icons |
| `--action-primary-fg-disabled` | `--backgrounds-quaternary` → oklch(0.8699 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Primary actions: text when disabled |
| `--action-primary-fg-active` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Primary actions: text while pressed |
| `--action-primary-fg-selected` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Primary actions: text when selected |
| `--action-primary-fg-inverse` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Primary actions: text on an inverse surface |
| `--action-secondary-bg-hover` | `--mono-tint` → oklch(0.9702 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Secondary (outline) actions: background on hover |
| `--action-secondary-bg-active` | `--mono-background` → oklch(0.1448 0.0000 0.00) / dark oklch(0.9851 0.0000 0.00) | Secondary (outline) actions: background while pressed |
| `--action-secondary-bg-selected` | `--mono-background` → oklch(0.1448 0.0000 0.00) / dark oklch(0.9851 0.0000 0.00) | Secondary (outline) actions: background when selected |
| `--action-secondary-bg-disabled` | `--backgrounds-tertiary` → oklch(0.9219 0.0000 0.00) / dark oklch(0.1448 0.0000 0.00) | Secondary (outline) actions: background when disabled |
| `--action-secondary-border` | `--mono-background` → oklch(0.1448 0.0000 0.00) / dark oklch(0.9851 0.0000 0.00) | Secondary (outline) actions: border |
| `--action-secondary-border-alt` | `--mono-shade` → oklch(0.3715 0.0000 0.00) / dark oklch(0.9702 0.0000 0.00) | Secondary (outline) actions: subtle border |
| `--action-secondary-border-disabled` | `--mono-tint` → oklch(0.9702 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Secondary (outline) actions: border when disabled |
| `--action-secondary-border-inverse` | `--backgrounds-secondary` → oklch(0.9702 0.0000 0.00) / dark oklch(0.2046 0.0000 0.00) | Secondary (outline) actions: border on an inverse surface |
| `--action-secondary-fg` | `--mono-background` → oklch(0.1448 0.0000 0.00) / dark oklch(0.9851 0.0000 0.00) | Secondary (outline) actions: text and icons |
| `--action-secondary-fg-alt` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Secondary (outline) actions: muted text and icons |
| `--action-secondary-fg-disabled` | `--foregrounds-quinary` → oklch(0.7090 0.0000 0.00) | Secondary (outline) actions: text when disabled |
| `--action-secondary-fg-active` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Secondary (outline) actions: text while pressed |
| `--action-secondary-fg-selected` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Secondary (outline) actions: text when selected |
| `--action-secondary-fg-inverse` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Secondary (outline) actions: text on an inverse surface |
| `--action-tertiary-bg` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Tertiary (ghost) actions: background |
| `--action-tertiary-bg-alt` | `--backgrounds-secondary` → oklch(0.9702 0.0000 0.00) / dark oklch(0.2046 0.0000 0.00) | Tertiary (ghost) actions: subtle alternate background |
| `--action-tertiary-bg-hover` | `--backgrounds-secondary` → oklch(0.9702 0.0000 0.00) / dark oklch(0.2046 0.0000 0.00) | Tertiary (ghost) actions: background on hover |
| `--action-tertiary-bg-active` | `--mono-tint` → oklch(0.9702 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Tertiary (ghost) actions: background while pressed |
| `--action-tertiary-bg-selected` | `--mono-tint` → oklch(0.9702 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Tertiary (ghost) actions: background when selected |
| `--action-tertiary-bg-disabled` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Tertiary (ghost) actions: background when disabled |
| `--action-tertiary-bg-inverse` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Tertiary (ghost) actions: background on an inverse surface |
| `--action-tertiary-border` | `--backgrounds-quaternary` → oklch(0.8699 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Tertiary (ghost) actions: border |
| `--action-tertiary-border-alt` | `--mono-tint` → oklch(0.9702 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Tertiary (ghost) actions: subtle border |
| `--action-tertiary-border-disabled` | `--backgrounds-quaternary` → oklch(0.8699 0.0000 0.00) / dark oklch(0.3715 0.0000 0.00) | Tertiary (ghost) actions: border when disabled |
| `--action-tertiary-border-inverse` | `--backgrounds-secondary` → oklch(0.9702 0.0000 0.00) / dark oklch(0.2046 0.0000 0.00) | Tertiary (ghost) actions: border on an inverse surface |
| `--action-tertiary-fg` | `--mono-background` → oklch(0.1448 0.0000 0.00) / dark oklch(0.9851 0.0000 0.00) | Tertiary (ghost) actions: text and icons |
| `--action-tertiary-fg-alt` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Tertiary (ghost) actions: muted text and icons |
| `--action-tertiary-fg-disabled` | `--foregrounds-quinary` → oklch(0.7090 0.0000 0.00) | Tertiary (ghost) actions: text when disabled |
| `--action-tertiary-fg-active` | `--mono-shade` → oklch(0.3715 0.0000 0.00) / dark oklch(0.9702 0.0000 0.00) | Tertiary (ghost) actions: text while pressed |
| `--action-tertiary-fg-selected` | `--mono-shade` → oklch(0.3715 0.0000 0.00) / dark oklch(0.9702 0.0000 0.00) | Tertiary (ghost) actions: text when selected |
| `--action-tertiary-fg-inverse` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Tertiary (ghost) actions: text on an inverse surface |
| `--destructive-bg` | `--torchred-background` → oklch(0.9691 0.0151 17.42) / dark oklch(0.2639 0.1083 29.23) | Destructive status and actions: background |
| `--destructive-bg-alt` | `--torchred-tint` → oklch(0.9322 0.0343 17.78) / dark oklch(0.4062 0.1665 28.83) | Destructive status and actions: subtle alternate background |
| `--destructive-bg-hover` | `--torchred-tint` → oklch(0.9322 0.0343 17.78) / dark oklch(0.4062 0.1665 28.83) | Destructive status and actions: background on hover |
| `--destructive-bg-active` | `--torchred-shade` → oklch(0.4695 0.1927 29.23) / dark oklch(0.8751 0.0665 18.51) | Destructive status and actions: background while pressed |
| `--destructive-bg-selected` | `--torchred-shade` → oklch(0.4695 0.1927 29.23) / dark oklch(0.8751 0.0665 18.51) | Destructive status and actions: background when selected |
| `--destructive-bg-disabled` | `--backgrounds-tertiary` → oklch(0.9219 0.0000 0.00) / dark oklch(0.1448 0.0000 0.00) | Destructive status and actions: background when disabled |
| `--destructive-bg-inverse` | `--torchred-shade` → oklch(0.4695 0.1927 29.23) / dark oklch(0.8751 0.0665 18.51) | Destructive status and actions: background on an inverse surface |
| `--destructive-border` | `--torchred-main` → oklch(0.6280 0.2577 29.23) / dark oklch(0.6695 0.2182 21.71) | Destructive status and actions: border |
| `--destructive-border-alt` | `--torchred-shade` → oklch(0.4695 0.1927 29.23) / dark oklch(0.8751 0.0665 18.51) | Destructive status and actions: subtle border |
| `--destructive-border-disabled` | `--torchred-tint` → oklch(0.9322 0.0343 17.78) / dark oklch(0.4062 0.1665 28.83) | Destructive status and actions: border when disabled |
| `--destructive-border-inverse` | `--torchred-background` → oklch(0.9691 0.0151 17.42) / dark oklch(0.2639 0.1083 29.23) | Destructive status and actions: border on an inverse surface |
| `--destructive-fg` | `--torchred-foreground` → oklch(0.5444 0.2234 29.23) / dark oklch(0.9691 0.0151 17.42) | Destructive status and actions: text and icons |
| `--destructive-fg-alt` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Destructive status and actions: muted text and icons |
| `--destructive-fg-disabled` | `--foregrounds-quinary` → oklch(0.7090 0.0000 0.00) | Destructive status and actions: text when disabled |
| `--destructive-fg-active` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Destructive status and actions: text while pressed |
| `--destructive-fg-selected` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.2686 0.0000 0.00) | Destructive status and actions: text when selected |
| `--destructive-fg-inverse` | `--torchred-background` → oklch(0.9691 0.0151 17.42) / dark oklch(0.2639 0.1083 29.23) | Destructive status and actions: text on an inverse surface |
| `--cautionary-bg` | `--maitai-background` → oklch(0.9852 0.0151 90.23) / dark oklch(0.2758 0.0580 42.34) | Caution status (the `caution` tone): background |
| `--cautionary-bg-alt` | `--maitai-tint` → oklch(0.9601 0.0401 88.20) / dark oklch(0.4118 0.0860 41.58) | Caution status (the `caution` tone): subtle alternate background |
| `--cautionary-bg-inverse` | `--maitai-shade` → oklch(0.4724 0.1071 42.23) / dark oklch(0.8686 0.1177 83.38) | Caution status (the `caution` tone): background on an inverse surface |
| `--cautionary-border` | `--maitai-main` → oklch(0.7516 0.1455 61.95) | Caution status (the `caution` tone): border |
| `--cautionary-border-alt` | `--maitai-shade` → oklch(0.4724 0.1071 42.23) / dark oklch(0.8686 0.1177 83.38) | Caution status (the `caution` tone): subtle border |
| `--cautionary-border-inverse` | `--maitai-background` → oklch(0.9852 0.0151 90.23) / dark oklch(0.2758 0.0580 42.34) | Caution status (the `caution` tone): border on an inverse surface |
| `--cautionary-fg` | `--maitai-foreground` → oklch(0.5534 0.1277 44.34) / dark oklch(0.9852 0.0151 90.23) | Caution status (the `caution` tone): text and icons |
| `--cautionary-fg-alt` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Caution status (the `caution` tone): muted text and icons |
| `--cautionary-fg-inverse` | `--maitai-background` → oklch(0.9852 0.0151 90.23) / dark oklch(0.2758 0.0580 42.34) | Caution status (the `caution` tone): text on an inverse surface |
| `--positive-bg` | `--seagreen-background` → oklch(0.9796 0.0247 164.47) / dark oklch(0.2646 0.0515 171.60) | Positive status: background |
| `--positive-bg-alt` | `--seagreen-tint` → oklch(0.9488 0.0579 162.90) / dark oklch(0.3827 0.0785 166.91) | Positive status: subtle alternate background |
| `--positive-bg-inverse` | `--seagreen-shade` → oklch(0.4389 0.0946 163.18) / dark oklch(0.9488 0.0579 162.90) | Positive status: background on an inverse surface |
| `--positive-border` | `--seagreen-main` → oklch(0.7780 0.1777 159.41) | Positive status: border |
| `--positive-border-alt` | `--seagreen-shade` → oklch(0.4389 0.0946 163.18) / dark oklch(0.9488 0.0579 162.90) | Positive status: subtle border |
| `--positive-border-inverse` | `--seagreen-background` → oklch(0.9796 0.0247 164.47) / dark oklch(0.2646 0.0515 171.60) | Positive status: border on an inverse surface |
| `--positive-fg` | `--seagreen-foreground` → oklch(0.5180 0.1144 161.56) / dark oklch(0.9796 0.0247 164.47) | Positive status: text and icons |
| `--positive-fg-alt` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Positive status: muted text and icons |
| `--positive-fg-inverse` | `--seagreen-background` → oklch(0.9796 0.0247 164.47) / dark oklch(0.2646 0.0515 171.60) | Positive status: text on an inverse surface |
| `--informative-bg` | `--blueribbon-background` → oklch(0.9705 0.0142 254.60) / dark oklch(0.2795 0.0978 270.78) | Informative status: background |
| `--informative-bg-alt` | `--blueribbon-tint` → oklch(0.9322 0.0328 256.76) / dark oklch(0.3775 0.1564 267.71) | Informative status: subtle alternate background |
| `--informative-bg-inverse` | `--blueribbon-shade` → oklch(0.4225 0.2126 267.93) / dark oklch(0.9322 0.0328 256.76) | Informative status: background on an inverse surface |
| `--informative-border` | `--blueribbon-main` → oklch(0.6102 0.2112 261.20) | Informative status: border |
| `--informative-border-alt` | `--blueribbon-shade` → oklch(0.4225 0.2126 267.93) / dark oklch(0.9322 0.0328 256.76) | Informative status: subtle border |
| `--informative-border-inverse` | `--blueribbon-background` → oklch(0.9705 0.0142 254.60) / dark oklch(0.2795 0.0978 270.78) | Informative status: border on an inverse surface |
| `--informative-fg` | `--blueribbon-foreground` → oklch(0.4867 0.2603 266.61) / dark oklch(0.9705 0.0142 254.60) | Informative status: text and icons |
| `--informative-fg-alt` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Informative status: muted text and icons |
| `--informative-fg-inverse` | `--blueribbon-background` → oklch(0.9705 0.0142 254.60) / dark oklch(0.2795 0.0978 270.78) | Informative status: text on an inverse surface |
| `--important-bg` | `--electricviolet-background` → oklch(0.9761 0.0139 304.14) / dark oklch(0.2898 0.1386 301.20) | Important status: background |
| `--important-bg-alt` | `--electricviolet-tint` → oklch(0.9453 0.0311 306.20) / dark oklch(0.3800 0.1656 303.37) | Important status: subtle alternate background |
| `--important-bg-inverse` | `--electricviolet-shade` → oklch(0.4379 0.2047 302.40) / dark oklch(0.9453 0.0311 306.20) | Important status: background on an inverse surface |
| `--important-border` | `--electricviolet-main` → oklch(0.6255 0.2466 302.49) / dark oklch(0.7125 0.1872 304.45) | Important status: border |
| `--important-border-alt` | `--electricviolet-shade` → oklch(0.4379 0.2047 302.40) / dark oklch(0.9453 0.0311 306.20) | Important status: subtle border |
| `--important-border-inverse` | `--electricviolet-background` → oklch(0.9761 0.0139 304.14) / dark oklch(0.2898 0.1386 301.20) | Important status: border on an inverse surface |
| `--important-fg` | `--electricviolet-foreground` → oklch(0.4955 0.2482 300.40) / dark oklch(0.9761 0.0139 304.14) | Important status: text and icons |
| `--important-fg-alt` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) / dark oklch(1.0000 0.0000 0.00) | Important status: muted text and icons |
| `--important-fg-inverse` | `--electricviolet-background` → oklch(0.9761 0.0139 304.14) / dark oklch(0.2898 0.1386 301.20) | Important status: text on an inverse surface |
| `--tooltip-bg` | `--backgrounds-primary` → oklch(1.0000 0.0000 0.00) / dark oklch(0.1448 0.0000 0.00) | Tooltip background |
| `--overlay-bg` | `--foregrounds-primary` → oklch(0.1448 0.0000 0.00) | Scrim behind modal overlays |
| `--focus-ring` | `--foregrounds-quaternary` → oklch(0.5555 0.0000 0.00) / dark oklch(0.7090 0.0000 0.00) | Keyboard focus outline; components draw it, don't restyle it |
| `--dataviz-1-main` | `--blazeorange-main` → oklch(0.6717 0.2205 37.86) | Charts only: series colour |
| `--dataviz-1-tint` | `--blazeorange-tint` → oklch(0.9479 0.0381 69.88) / dark oklch(0.4063 0.1389 34.11) | Charts only: series colour |
| `--dataviz-1-shade` | `--blazeorange-shade` → oklch(0.4663 0.1768 31.99) / dark oklch(0.9479 0.0381 69.88) | Charts only: series colour |
| `--dataviz-2-main` | `--blueribbon-main` → oklch(0.6102 0.2112 261.20) | Charts only: series colour |
| `--dataviz-2-tint` | `--blueribbon-tint` → oklch(0.9322 0.0328 256.76) / dark oklch(0.3775 0.1564 267.71) | Charts only: series colour |
| `--dataviz-2-shade` | `--blueribbon-shade` → oklch(0.4225 0.2126 267.93) / dark oklch(0.9322 0.0328 256.76) | Charts only: series colour |
| `--dataviz-3-main` | `--seagreen-main` → oklch(0.7780 0.1777 159.41) | Charts only: series colour |
| `--dataviz-3-tint` | `--seagreen-tint` → oklch(0.9488 0.0579 162.90) / dark oklch(0.3827 0.0785 166.91) | Charts only: series colour |
| `--dataviz-3-shade` | `--seagreen-shade` → oklch(0.4389 0.0946 163.18) / dark oklch(0.9488 0.0579 162.90) | Charts only: series colour |
| `--dataviz-4-main` | `--electricviolet-main` → oklch(0.6255 0.2466 302.49) / dark oklch(0.7125 0.1872 304.45) | Charts only: series colour |
| `--dataviz-4-tint` | `--electricviolet-tint` → oklch(0.9453 0.0311 306.20) / dark oklch(0.3800 0.1656 303.37) | Charts only: series colour |
| `--dataviz-4-shade` | `--electricviolet-shade` → oklch(0.4379 0.2047 302.40) / dark oklch(0.9453 0.0311 306.20) | Charts only: series colour |
| `--dataviz-5-main` | `--maitai-main` → oklch(0.7516 0.1455 61.95) | Charts only: series colour |
| `--dataviz-5-tint` | `--maitai-tint` → oklch(0.9601 0.0401 88.20) / dark oklch(0.4118 0.0860 41.58) | Charts only: series colour |
| `--dataviz-5-shade` | `--maitai-shade` → oklch(0.4724 0.1071 42.23) / dark oklch(0.8686 0.1177 83.38) | Charts only: series colour |
| `--dataviz-6-main` | `--cerise-main` → oklch(0.6521 0.2154 2.21) | Charts only: series colour |
| `--dataviz-6-tint` | `--cerise-tint` → oklch(0.9470 0.0251 352.47) / dark oklch(0.4086 0.1369 6.37) | Charts only: series colour |
| `--dataviz-6-shade` | `--cerise-shade` → oklch(0.4577 0.1664 8.23) / dark oklch(0.9470 0.0251 352.47) | Charts only: series colour |
| `--dataviz-7-main` | `--electriclime-main` → oklch(0.8485 0.2093 123.47) | Charts only: series colour |
| `--dataviz-7-tint` | `--electriclime-tint` → oklch(0.9681 0.0792 116.21) / dark oklch(0.4073 0.0978 121.11) | Charts only: series colour |
| `--dataviz-7-shade` | `--electriclime-shade` → oklch(0.4593 0.1121 122.51) / dark oklch(0.9681 0.0792 116.21) | Charts only: series colour |
| `--dataviz-8-main` | `--lochmara-main` → oklch(0.6823 0.1723 245.16) | Charts only: series colour |
| `--dataviz-8-tint` | `--lochmara-tint` → oklch(0.9483 0.0276 239.65) / dark oklch(0.3898 0.1005 246.39) | Charts only: series colour |
| `--dataviz-8-shade` | `--lochmara-shade` → oklch(0.4439 0.1218 248.78) / dark oklch(0.9483 0.0276 239.65) | Charts only: series colour |
<!-- tokens:end -->

## Choosing a value

| If you need… | Use |
| --- | --- |
| the page or a panel background | `--container-bg` with `--container-fg` |
| a subtle section background or a zebra row | `--container-bg-alt` |
| secondary or helper text | `--container-fg-alt` |
| a divider or panel border | `--container-border`; or the Separator component |
| an input-like or hoverable surface you compose | `--interactive-bg`, `--interactive-bg-hover`, `--interactive-fg` |
| an error message colour | `--destructive-fg`; or FormMessage / Banner `destructive` |
| a success, warning or info surface | Banner or Badge with the matching `variant` |
| a scrim behind an overlay | Dialog or Sheet, which set `--overlay-bg` for you |
| chart series colours | `--dataviz-1-main` to `--dataviz-8-main`, with `-tint` and `-shade` |

## Dos and don'ts

**Do:** pair tokens from one family.

```tsx
<section style={{ backgroundColor: "var(--container-bg-alt)", color: "var(--container-fg)" }}>
  <p style={{ color: "var(--container-fg-alt)" }}>Last updated 2 hours ago</p>
</section>
```

**Don't:** hardcode colours or mix families.

```tsx
<section style={{ backgroundColor: "#f5f5f5", color: "var(--action-primary-fg)" }}>
  <p style={{ color: "gray" }}>Last updated 2 hours ago</p>
</section>
```

**Do:** use the component's tone.

```tsx
<Badge variant="positive">Active</Badge>
```

**Don't:** recolour a component with tone tokens.

```tsx
<div style={{ "--action-primary-bg": "var(--positive-bg)" } as React.CSSProperties}>
  <Badge>Active</Badge>
</div>
```

## Known issues

- `--interactive-bg-selected` is near-black in `minimal`. It reads well on a checkbox but heavy across a whole table row. <!-- REVIEW: source finding from the Paper audit; no guidance in source on row selection colour. -->

## Common agent mistakes

_Filled from evals._

---
name: Tooltip
use_when: A short text hint appears when the user hovers or focuses a control, such as the label and shortcut of an icon-only button.
instead_of: aria-label for naming a control (a tooltip only describes); Popover or HoverCard for rich or interactive content; inline helper text or FormMessage for anything essential.
source: packages/core/src/components/tooltip.tsx
---

# Tooltip

## 1. Overview

Tooltip shows a short text hint next to a control on pointer hover or keyboard focus. It's built on Radix Tooltip and portals a small panel. Every Tooltip needs a `TooltipProvider` above it; EluanProvider doesn't include one.

## 2. When to use

- Showing the visible label of an icon-only Button in a toolbar (the Button still needs its own `aria-label`).
- Showing a keyboard shortcut for a control: "Bold ⌘B".
- Expanding an abbreviation or a truncated label on a focusable element.

<!-- REVIEW: usage list drafted; source and docs only show a plain hint and an icon-button tooltip. -->

### When not to use

- Naming an icon-only control → set `aria-label` on the [Button](./button.md); add a tooltip on top if you want a visible label.
- Content with links, buttons or formatting → use [Popover](./popover.md).
- A preview of a linked item → use [HoverCard](./hover-card.md).
- Instructions, errors or anything the user must read → show it inline with FormDescription or FormMessage from [Label](./form-label.md). See `../patterns/forms.md`.
- Telling the user something happened → use [Toast](./toast.md).

## 3. Anatomy

1. **TooltipProvider**: wraps your app once. Sets the shared open delay (200ms in Eluan) and lets the user move between tooltips without waiting again.
2. **Tooltip**: the root for one tooltip. Holds its open state.
3. **TooltipTrigger**: the element the tooltip describes. Wrap a focusable element, usually a Button, with `asChild`.
4. **TooltipContent**: the floating label. Renders in a portal with `--tooltip-bg`, a `--container-border` border, `--curves-md` corners, `--container-fg` text in `--font-size-sm`, and `--spacing-xs` by `--spacing-sm` padding.

## 4. Variants

No variants. The tooltip's look is fixed by the theme.

## 5. Sizes

No size prop. The panel fits its text.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Closed | Only the trigger renders | |
| Open | Label floats beside the trigger | Opens after the provider's delay on hover, or at once on keyboard focus. Closes when the pointer leaves, focus moves away, the trigger is clicked or Escape is pressed. |
| Focus | The trigger's own focus style | Never remove or restyle the focus ring. |

## 7. Content guidelines

- A few words. No full sentences, no trailing period.
- For an icon button, use the same words as its `aria-label`, and add the shortcut with [Kbd](./kbd.md).
- Plain text only. No links or buttons.
- Sentence case.

| Do | Don't |
| --- | --- |
| Bold | This button makes your selected text bold. |
| Archive conversation | Click here to archive |
| Copy link | Copy |

## 8. Rules

1. Wrap your app (or the region using tooltips) in one `TooltipProvider`. A Tooltip outside a provider throws.
2. Use `TooltipTrigger asChild` around a focusable element. A `span` or `div` trigger can't be reached by keyboard.
3. A tooltip describes; it doesn't name. Icon-only Buttons still need an `aria-label`.
4. Never put essential information in a tooltip. It never opens on touch, and screen readers treat it as a description.
5. Don't attach a tooltip to a disabled Button. Disabled Buttons take no pointer events or focus, so the tooltip never opens. Explain why the action is unavailable in visible text instead. <!-- REVIEW: drafted; Button sets pointer-events none and the native disabled attribute when disabled. -->
6. Never pass `className` or `style` to TooltipContent; they're dropped.

## 9. Dos and don'ts

**Do:** name the button and add the tooltip as a visible hint.

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button type="button" variant="ghost" size="icon" aria-label="Archive conversation">
      <Archive aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Archive conversation</TooltipContent>
</Tooltip>
```

**Don't:** rely on the tooltip to name an icon-only button.

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon">
      <Archive />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Archive conversation</TooltipContent>
</Tooltip>
```

**Do:** put instructions where everyone can read them.

```tsx
<Label htmlFor="api-key-name">Key name</Label>
<Input id="api-key-name" aria-describedby="api-key-name-hint" />
<FormDescription id="api-key-name-hint">Only you can see this name.</FormDescription>
```

**Don't:** hide field instructions or interactive content in a tooltip.

```tsx
<TooltipContent>
  Only you can see this name. <a href="/docs/keys">Learn more</a>
</TooltipContent>
```

## 10. Accessibility

- Role: `tooltip`, on a visually hidden copy of the content. While open, the trigger gets `aria-describedby` pointing at it.
- Label: the tooltip adds a description, not a name. Name the trigger with its text or `aria-label`.
- Keyboard: focusing the trigger opens the tooltip; moving focus away or pressing Escape closes it.
- Focus: stays on the trigger; the tooltip can't be focused.
- Touch: touch input never opens a tooltip.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Placement: above the trigger by default (`side="top"`), 4px away. It flips and shifts to stay inside the viewport.
- Timing: the provider's `delayDuration` is 200ms in Eluan. After one tooltip closes, the next opens without delay for 300ms (`skipDelayDuration`). The pointer can move onto the tooltip without it closing, unless `disableHoverableContent` is set.
- Overflow and truncation: the panel clips overflow. Keep the text short.
- Motion: appears and disappears without animation. Don't add your own.
- Portal: TooltipContent mounts in `document.body`. In a scoped theme, pass `portalContainer` to the scoped EluanProvider or wrap the region in `PortalContainerProvider`; `container` overrides it for one tooltip. See `../foundations/theming.md`.

## 12. API

<!-- api:start -->
### TooltipProvider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `delayDuration` | `number` | `200` | Milliseconds of hover before a tooltip opens. |
| `skipDelayDuration` | `number` | `300` | Window after a tooltip closes in which the next one opens at once. |
| `disableHoverableContent` | `boolean` | `false` | Closes the tooltip as soon as the pointer leaves the trigger. |
| `children` | `ReactNode` | | Your app or region. |

### Tooltip

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | | Called on every open and close. |
| `delayDuration` | `number` | the provider's | Overrides the provider's delay for this tooltip. |

### TooltipTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child (a Button) instead of a bare `<button>`. |
| `...props` | Radix `Tooltip.Trigger` props | | Native button attributes. |

### TooltipContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"top"` | Preferred side of the trigger. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment along that side. |
| `sideOffset` | `number` | `4` | Distance from the trigger in px. |
| `container` | `HTMLElement \| null` | nearest `PortalContainerProvider`, then `document.body` | Element to portal into. |
| `aria-label` | `string` | | Replaces the announced text when the visible content isn't plain text. |
| `...props` | Radix `Tooltip.Content` props without `className`, `style` | | |
<!-- api:end -->

## 13. Examples

A text-formatting toolbar. TooltipProvider normally sits once at the app root; it's shown here for completeness.

```tsx
import { Button, Kbd, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@eluan/core";
import { Bold, Italic, Link } from "lucide-react";

const tools = [
  { label: "Bold", keys: "cmd+b", Icon: Bold },
  { label: "Italic", keys: "cmd+i", Icon: Italic },
  { label: "Insert link", keys: "cmd+k", Icon: Link },
];

export function FormattingToolbar({ onTool }: { onTool: (label: string) => void }) {
  return (
    <TooltipProvider>
      <div role="group" aria-label="Text formatting" style={{ display: "flex", gap: "var(--spacing-xs)" }}>
        {tools.map(({ label, keys, Icon }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button type="button" variant="ghost" size="icon" aria-label={label} onClick={() => onTool(label)}>
                <Icon aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <span style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
                {label}
                <Kbd size="sm" keys={keys} />
              </span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
```

## 14. Related components

- [Button](./button.md): the usual trigger; icon-only sizes need an `aria-label`.
- [Kbd](./kbd.md): shortcuts inside a tooltip.
- [HoverCard](./hover-card.md): a richer read-only preview on hover.
- [Popover](./popover.md): interactive content on click.

## 15. Common agent mistakes

_Filled from evals._

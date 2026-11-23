---
name: Toggle
use_when: A single button that stays pressed to show a state of the content or view, such as Bold, Mute or Show grid.
instead_of: Switch for an on/off setting; Button for a one-off action; ToggleGroup for a set of related toggles; Checkbox for a yes/no submitted with a form.
source: packages/core/src/components/toggle.tsx
---

# Toggle

## 1. Overview

Toggle is a two-state button: pressed or not pressed. It wraps Radix Toggle, renders a native `<button type="button">` with `aria-pressed`, and fills with the selected colours while pressed. It comes in two variants and three sizes, including a square icon-only size.

## 2. When to use

- Turning a formatting or view state on and off from a toolbar: Bold, Show grid, Mute, Pin.
- An icon-only on/off control that sits among other toolbar buttons.
- A single on/off filter chip above a list ("Only mine").

### When not to use

- A setting that applies immediately and reads as a preference (Email notifications, Dark mode) → use [Switch](./switch.md). It renders a `switch` role with a sliding thumb and pairs with a label. <!-- REVIEW: Toggle vs Switch split (tool state vs setting) is drafted from what each renders; source doesn't state it. -->
- A one-off action that doesn't stay pressed (Save, Refresh, Export) → use [Button](./button.md).
- Several related toggles (Bold, Italic, Underline; Left, Center, Right) → use [ToggleGroup](./toggle-group.md). It adds a `group` role, arrow-key navigation and single or multiple selection.
- One choice from a few modes or filters → use [SegmentedControl](./segmented-control.md).
- A yes/no answer submitted with a form (Accept terms) → use [Checkbox](./checkbox.md). Toggle has no form value.

## 3. Anatomy

1. **Container**: the `<button>`. Transparent at rest, `--curves-md` corners, carries the pressed fill and focus outline.
2. **Content**: a text label, a Lucide icon, or both. Content sits in a row with a `--spacing-sm` gap.

## 4. Variants

| Variant | Use for |
| --- | --- |
| `default` | Toggles in a toolbar, where the surrounding bar gives them an edge. Transparent at rest. |
| `outline` | A toggle that stands alone and needs a visible edge at rest. Adds a 1px `--interactive-border-alt` border. |

<!-- REVIEW: "Use for" text drafted from each variant's styles; source and docs give no usage guidance. -->

## 5. Sizes

| Size | Use in |
| --- | --- |
| `default` | Toolbars next to default-size controls (`--size-lg` tall, at least as wide as it is tall). |
| `sm` | Dense toolbars and inline filter chips (`--size-sm` tall, `--font-size-xs`). |
| `iconSm` | Icon-only toggles in compact toolbars (`--size-md` square, no padding). |

For an icon-only toggle at default height, use `default`: its minimum width equals its height, so a lone icon renders square.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Transparent; text and icon inherit the surrounding colour | |
| Hover | `--interactive-bg-hover` fill, `--interactive-fg` text | |
| Focus | 1px outline in `--focus-ring`, 1px offset | Never remove or restyle the focus ring. |
| Pressed | `--interactive-bg-selected` fill, `--interactive-fg-selected` text | `data-state="on"` and `aria-pressed="true"`. |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-fg-disabled` text, no pointer events | A disabled ToggleGroupItem keeps a transparent background and only dims its text, so a disabled Toggle next to a disabled ToggleGroupItem won't match. <!-- REVIEW: toggle.tsx and toggle-group.tsx style :disabled differently; not in the fix plan. Don't restyle either. --> |

## 7. Content guidelines

- Name the feature, not the action: "Bold", "Show grid", "Mute". The pressed state is announced from `aria-pressed`, so "Toggle bold" or "Make bold" repeats it.
- Keep the label and icon the same in both states. Don't swap "Mute" for "Unmute" on press.
- Use one or two words, in sentence case.

| Do | Don't |
| --- | --- |
| Bold | Toggle bold |
| Show grid | Grid on/off |
| Mute | Click to mute |

<!-- REVIEW: naming guidance follows the WAI-ARIA toggle-button convention; stories and docs use "Toggle bold" / "Toggle italic" as aria-labels. -->

## 8. Rules

1. Give icon-only toggles an `aria-label`. Mark the icon `aria-hidden="true"`.
2. Keep the label constant across pressed and unpressed. State comes from `aria-pressed`.
3. Control the state with `pressed` and `onPressedChange`, or set `defaultPressed` for uncontrolled use. Don't track it with `onClick`.
4. Put two or more related toggles in a [ToggleGroup](./toggle-group.md), not a row of separate Toggles.
5. Size icons with `--size-xxs` on the icon's own style. Never use Lucide's `size` prop.
6. Never pass `className` or `style`; they're dropped. Put layout on a wrapper.

## 9. Dos and don'ts

**Do:** name an icon-only toggle and control it with `pressed`.

```tsx
<Toggle aria-label="Show grid" pressed={showGrid} onPressedChange={setShowGrid}>
  <Grid3x3 aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
</Toggle>
```

**Don't:** leave it unnamed, size the icon in px, or track state with `onClick`.

```tsx
<Toggle onClick={() => setShowGrid(!showGrid)}>
  <Grid3x3 size={16} />
</Toggle>
```

**Do:** use a Switch for a setting.

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
  <Switch id="digest" checked={digest} onCheckedChange={setDigest} />
  <Label htmlFor="digest">Weekly digest email</Label>
</div>
```

**Don't:** use a Toggle as a settings switch.

```tsx
<Toggle variant="outline" pressed={digest} onPressedChange={setDigest}>
  Weekly digest email
</Toggle>
```

## 10. Accessibility

- Role: `button` (native `<button type="button">`) with `aria-pressed="true"` or `"false"`.
- Label: the text content; `aria-label` for icon-only toggles.
- Keyboard: Enter and Space toggle. Tab moves focus in DOM order.
- Focus: visible outline on `:focus-visible`. Disabled toggles use the native `disabled` attribute, so Tab skips them.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: Toggle sizes to its content. Wrap it in your own layout for toolbars.
- Overflow and truncation: Toggle doesn't truncate. Keep labels to one or two words.
- Forms: Toggle submits nothing. Keep its state in your own state and send it yourself.
- Motion: colour transitions over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "outline"` | `"default"` | Visual style. |
| `size` | `"default" \| "sm" \| "iconSm"` | `"default"` | Height and padding; `iconSm` is square for icon-only toggles. |
| `pressed` | `boolean` | | Controlled pressed state. |
| `defaultPressed` | `boolean` | `false` | Initial pressed state when uncontrolled. |
| `onPressedChange` | `(pressed: boolean) => void` | | Called with the new state. |
| `disabled` | `boolean` | `false` | Disables the button. |
| `...props` | Radix `Toggle.Root` props without `className`, `style` | | Native button attributes: `aria-label`, `id`, `onFocus`. |
<!-- api:end -->

`className` and `style` are omitted; Eluan components are styling-closed.

## 13. Examples

```tsx
import { useState } from "react";
import { Toggle } from "@eluan/core";
import { Grid3x3, Magnet } from "lucide-react";

const iconStyle = { width: "var(--size-xxs)", height: "var(--size-xxs)" };

export function CanvasViewOptions() {
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-xs)",
        padding: "var(--spacing-xs)",
        backgroundColor: "var(--container-bg-alt)",
      }}
    >
      <Toggle size="sm" pressed={showGrid} onPressedChange={setShowGrid}>
        <Grid3x3 aria-hidden="true" style={iconStyle} />
        Show grid
      </Toggle>
      <Toggle
        size="iconSm"
        aria-label="Snap to grid"
        pressed={snapToGrid}
        onPressedChange={setSnapToGrid}
        disabled={!showGrid}
      >
        <Magnet aria-hidden="true" style={iconStyle} />
      </Toggle>
    </div>
  );
}
```

## 14. Related components

- [ToggleGroup](./toggle-group.md): a set of related toggles with group semantics.
- [Switch](./switch.md): an on/off setting that applies immediately.
- [Button](./button.md): a one-off action that doesn't stay pressed.
- [SegmentedControl](./segmented-control.md): one mode from a few options.
- [Checkbox](./checkbox.md): a yes/no that submits with a form.

## 15. Common agent mistakes

_Filled from evals._

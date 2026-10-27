---
name: Button
use_when: The user triggers an action, submits a form or opens an overlay.
instead_of: Link or your router's link for navigation (Button asChild only to style one); Toggle or Switch for on/off state; DropdownMenu for a list of actions.
source: packages/core/src/components/button.tsx
---

# Button

## 1. Overview

Button triggers an action. It renders a native `<button>` (or its child, with `asChild`) and comes in fourteen variants and seven sizes, including square icon-only sizes.

## 2. When to use

- Submitting or cancelling a form.
- Running an action on the current page: save, delete, export, add.
- Opening a Dialog, Sheet, Popover or DropdownMenu (as the trigger, with `asChild` on the trigger part).
- An icon-only action, with an `icon*` size and an `aria-label`.

### When not to use

- Moving to another page or URL → use your router's link, or [Button](./button.md) `variant="link"` with `asChild` around an `<a>` when it must look like a button.
- Turning a setting on or off → use [Switch](./switch.md).
- A pressed/unpressed state that stays visible → use [Toggle](./toggle.md) or [ToggleGroup](./toggle-group.md).
- Picking one view of several → use [Tabs](./tabs.md) or [SegmentedControl](./segmented-control.md).
- Several related actions behind one control → use [DropdownMenu](./dropdown-menu.md) or [ActionPopover](./action-popover.md).

## 3. Anatomy

1. **Container**: the `<button>` element; carries the variant colours, radius and focus outline.
2. **Label**: the text child. Required unless the button is icon-only.
3. **Icon** (optional): a Lucide icon before or after the label, or alone for icon-only sizes. Content sits in a row with a `--spacing-xs` gap.

## 4. Variants

| Variant | Use for |
| --- | --- |
| `default` | The single main action in a view or form: Save, Create, Continue. |
| `secondary` | A neutral filled action next to a primary one. |
| `outline` | Secondary actions: Cancel, Back, Export. |
| `ghost` | Low-emphasis actions in toolbars, table rows and headers. |
| `mutedGhost` | Even quieter toolbar actions on busy surfaces. |
| `fadedGhost` | Actions that should recede until hovered (60% opacity at rest). |
| `destructive` | The confirm action of a destructive flow: Delete project. |
| `dangerGhost` | A low-emphasis destructive entry point, such as Remove in a row. |
| `caution` | An action with a reversible but notable consequence. |
| `positive` | An action that confirms a successful or approving outcome: Approve. |
| `dashed` | Adding an item to a list or an empty slot: Add field. |
| `input` | A button that opens a picker and should look like a form field (DatePicker and Select-like triggers). |
| `inputMuted` | The same, showing placeholder-weight text. |
| `link` | An inline text action that looks like a link. |

<!-- REVIEW: "Use for" text is drafted from each variant's styles; source and docs give no per-variant usage guidance, especially for caution, positive, fadedGhost and the input variants. -->

## 5. Sizes

| Size | Use in |
| --- | --- |
| `default` | Most buttons (`--size-lg` tall). |
| `sm` | Dense toolbars, table rows, inline with small text (`--size-md`). |
| `lg` | A hero or marketing call to action (`--size-xl`). |
| `icon` | Icon-only, next to default-size controls. |
| `iconSm` | Icon-only, in dense rows. |
| `iconXs` | Icon-only, inside another control (clear buttons, chips). |
| `iconInline` | Icon-only, inline with text, no fixed box. |

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Variant colours | |
| Hover | Variant `-hover` background | |
| Focus | 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. |
| Active | Variant `-active` background; solid variants nudge down slightly | `destructive` and `dashed` lose label contrast while pressed. <!-- REVIEW: known source issue from the Paper audit; button.tsx sets a near-black :active background without a matching color. --> |
| Disabled | 50% opacity, no pointer events | `input` variants switch to the disabled interactive tokens instead. |
| Loading | No built-in loading state | Put a [Spinner](./spinner.md) before the label, keep the label, and set `disabled` and `aria-busy`. <!-- REVIEW: composition drafted; Button has no loading prop. --> |

## 7. Content guidelines

- Start with a verb and say what happens: "Save changes", "Delete project".
- Use sentence case. Keep labels to one to three words.
- Match the label to the result the user expects, and reuse the same verb in the confirmation (Dialog title "Delete project?", button "Delete project").
- Don't end with punctuation.

| Do | Don't |
| --- | --- |
| Save changes | Click here |
| Delete project | OK |
| Add teammate | Submit |
| Cancel | No thanks! |

## 8. Rules

1. Use one `default` (primary) button per view or form.
2. Set `type="button"` on every button that doesn't submit a form. Button has no default type, so inside a `<form>` it submits.
3. Give icon-only buttons an `aria-label`. Mark the icon `aria-hidden="true"`.
4. Put the primary action last in a button row (rightmost in left-to-right layouts), with secondary actions before it.
5. Use `destructive` only for the action that actually destroys, usually inside a confirmation Dialog.
6. Never pass `className` or `style`; they're dropped. Use `fullWidth` or a wrapper for layout.
7. Use `asChild` to render a link with button styling, never `onClick` with `window.location`.

## 9. Dos and don'ts

**Do:** one primary action, secondary actions in `outline`.

```tsx
<div style={{ display: "flex", gap: "var(--spacing-sm)", justifyContent: "flex-end" }}>
  <Button type="button" variant="outline">Cancel</Button>
  <Button type="submit">Save changes</Button>
</div>
```

**Don't:** stack several primary buttons or make Cancel primary.

```tsx
<div>
  <Button>Cancel</Button>
  <Button>Save draft</Button>
  <Button>Publish</Button>
</div>
```

**Do:** name icon-only buttons.

```tsx
<Button type="button" variant="ghost" size="icon" aria-label="Close panel">
  <X aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
</Button>
```

**Don't:** leave them unlabeled or style them by hand.

```tsx
<Button size="icon" style={{ background: "#eee" }}>
  <X />
</Button>
```

**Do:** navigate with a link styled as a button.

```tsx
<Button asChild variant="outline">
  <a href="/billing">View billing</a>
</Button>
```

**Don't:** navigate from a click handler.

```tsx
<Button onClick={() => (window.location.href = "/billing")}>View billing</Button>
```

## 10. Accessibility

- Role: `button` (native `<button>`); with `asChild`, the child's role (a link stays a link).
- Label: the text content; `aria-label` for icon-only buttons.
- Keyboard: Enter and Space activate. Tab moves focus in DOM order.
- Focus: visible outline on `:focus-visible`. Disabled buttons use `pointer-events: none` and the native `disabled` attribute, so they're skipped by Tab.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per button. <!-- REVIEW: system-wide focus-ring contrast issue, see foundations/colour.md. -->

## 11. Behaviour

- Responsive: Button sizes to its content; `fullWidth` stretches it to the container. Use `fullWidth` for stacked mobile actions.
- Overflow and truncation: labels don't wrap (`white-space: nowrap`). Keep them short; don't rely on truncation.
- Motion: colour transitions over 150ms; solid variants nudge down on press. Don't add your own.
- `attachment="start"` or `"end"` flattens one edge so the button sits flush against an adjacent Input.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "destructive" \| "caution" \| "positive" \| "outline" \| "dashed" \| "secondary" \| "ghost" \| "mutedGhost" \| "dangerGhost" \| "fadedGhost" \| "input" \| "inputMuted" \| "link"` | `"default"` | Visual style. |
| `size` | `"default" \| "sm" \| "lg" \| "icon" \| "iconSm" \| "iconXs" \| "iconInline"` | `"default"` | Height and padding; `icon*` sizes are square for icon-only buttons. |
| `align` | `"center" \| "start"` | `"center"` | Horizontal alignment of the content. |
| `attachment` | `"none" \| "start" \| "end"` | `"none"` | Flattens one edge to sit flush against an adjacent control. |
| `shape` | `"default" \| "round"` | `"default"` | `"round"` makes a pill. |
| `textAlign` | `"center" \| "left"` | `"center"` | Text alignment inside the button. |
| `fullWidth` | `boolean` | `false` | Stretches to the container width. |
| `asChild` | `boolean` | `false` | Renders the child element with Button's props and styles (Radix Slot). |
| `...props` | `ButtonHTMLAttributes` without `className`, `style` | | Native button attributes: `type`, `disabled`, `onClick`, `aria-*`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Button } from "@eluan/core";
import { Plus } from "lucide-react";

export function ProjectToolbar({ onCreate }: { onCreate: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
      <Button asChild variant="ghost" size="sm">
        <a href="/projects/archive">View archive</a>
      </Button>
      <Button type="button" onClick={onCreate}>
        <Plus aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
        New project
      </Button>
    </div>
  );
}
```

## 14. Related components

- [Toggle](./toggle.md): a button that stays pressed.
- [ToggleGroup](./toggle-group.md): a set of pressable options.
- [DropdownMenu](./dropdown-menu.md): several actions behind one trigger Button.
- [Dialog](./dialog.md): confirm destructive actions before running them.
- [Spinner](./spinner.md): in-button loading feedback.

## 15. Common agent mistakes

_Filled from evals._

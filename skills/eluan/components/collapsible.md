---
name: Collapsible
use_when: One region of the page shows and hides in place behind a single trigger, such as advanced options or extra details.
instead_of: Accordion for several stacked sections; Tabs for switching views; Popover, Sheet or Drawer for content that should float or slide in.
source: packages/core/src/components/collapsible.tsx
---

# Collapsible

## 1. Overview

Collapsible shows and hides one region of content in place. It re-exports Radix Collapsible with no styles of its own: you supply the trigger (an Eluan Button) and the layout of the content. Unlike [Accordion](./accordion.md), it has no built-in look, icons or animation.

## 2. When to use

- "Advanced options" or "More settings" in a form, hidden by default.
- Extra details under a summary: order line items, release notes, a stack trace.
- A filter section in a sidebar that the user can fold away.

### When not to use

- Several related sections, each with a heading → use [Accordion](./accordion.md).
- Switching between views of the same content → use [Tabs](./tabs.md) or [SegmentedControl](./segmented-control.md).
- Content that floats next to a control → use [Popover](./popover.md).
- A side panel → use [Sheet](./sheet.md) or [Drawer](./drawer.md).
- A nested hierarchy of items → use [TreeView](./tree-view.md).

## 3. Anatomy

1. **Collapsible**: the root. Holds open state; renders a `div`.
2. **CollapsibleTrigger**: a native `<button type="button">` that toggles the content. Unstyled; wrap a [Button](./button.md) with `asChild`.
3. **CollapsibleContent**: the region that shows and hides. Unstyled; put your own wrapper inside it for spacing.
4. **Indicator** (optional): a Lucide chevron inside the trigger Button that reflects the state.

## 4. Variants

No variants. The trigger Button's `variant` and your content wrapper decide the look.

## 5. Sizes

No size prop. Use the trigger Button's `size`.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Closed | Only the trigger shows | Content is unmounted. Trigger has `aria-expanded="false"` and `data-state="closed"`. |
| Open | Content appears below the trigger | Trigger has `aria-expanded="true"` and `data-state="open"`. |
| Focus | The trigger Button's focus outline | Never remove or restyle the focus ring. |
| Disabled | The trigger Button's disabled style | Set `disabled` on Collapsible; the trigger can't toggle. |

## 7. Content guidelines

- Label the trigger with what it reveals: "Advanced options", "Show 4 line items", "Release notes".
- Keep the label the same when open; the chevron and `aria-expanded` carry the state.
- Show the most-used settings outside the Collapsible; hide only what most users can skip.
- Sentence case.

| Do | Don't |
| --- | --- |
| Advanced options | More |
| Show 4 line items | Click to expand |

<!-- REVIEW: content guidance drafted; stories use a constant label with a chevron that swaps between ChevronRight and ChevronDown. -->

## 8. Rules

1. Use `CollapsibleTrigger asChild` around a Button. A bare trigger is an unstyled browser button.
2. Put spacing and layout on a wrapper `div` inside CollapsibleContent.
3. Never pass `className` or `style` to Collapsible parts. They aren't dropped here, unlike every other Eluan component, but styling them bypasses the system. <!-- REVIEW: collapsible.tsx re-exports Radix parts as they are, so className and style still pass through; the router says all components drop them. -->
4. Mark the chevron `aria-hidden="true"` and size it with `--size-xxs`.
5. Don't stack Collapsibles to build an accordion; use Accordion.
6. Don't hide required fields or validation errors inside a closed Collapsible. <!-- REVIEW: drafted; no source guidance. -->

## 9. Dos and don'ts

**Do:** use a Button as the trigger and a wrapper for the content.

```tsx
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button type="button" variant="ghost" size="sm">Advanced options</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      {/* fields */}
    </div>
  </CollapsibleContent>
</Collapsible>
```

**Don't:** style the parts directly or hand-roll the toggle.

```tsx
<Collapsible>
  <CollapsibleTrigger style={{ background: "none", border: 0 }}>Advanced options</CollapsibleTrigger>
  <CollapsibleContent className="advanced-panel">{/* fields */}</CollapsibleContent>
</Collapsible>
```

**Do:** use Accordion for a set of headed sections.

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="billing">
    <AccordionTrigger>Billing</AccordionTrigger>
    <AccordionContent>{/* billing settings */}</AccordionContent>
  </AccordionItem>
</Accordion>
```

**Don't:** stack Collapsibles to imitate one.

```tsx
<Collapsible>{/* Billing */}</Collapsible>
<Collapsible>{/* Notifications */}</Collapsible>
<Collapsible>{/* Security */}</Collapsible>
```

## 10. Accessibility

- Role: the trigger is a native `button` with `aria-expanded` and `aria-controls` pointing at the content.
- Label: the trigger's text.
- Keyboard: Enter and Space toggle the content. Tab moves focus in DOM order.
- Focus: stays on the trigger when it toggles. Closed content is removed from the page, so nothing inside it can be focused.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: the content takes the width of its container.
- Overflow and truncation: the content grows to its natural height and pushes the page down.
- Motion: none. The content appears and disappears at once. Don't add a height animation of your own. <!-- REVIEW: foundations/motion.md lists Collapsible as a component that already animates; collapsible.tsx adds no animation. -->
- Controlled or uncontrolled: pass `open` and `onOpenChange` to control it, or `defaultOpen` to start open.
- Closing unmounts the content, so uncontrolled fields inside lose what the user typed and drop out of a submitted `FormData`. Keep their values in state (controlled fields) or in your form library.

## 12. API

<!-- api:start -->
### Collapsible

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | | Called on every toggle. |
| `disabled` | `boolean` | `false` | Stops the trigger from toggling. |
| `asChild` | `boolean` | `false` | Renders the child element instead of the `div`. |
| `...props` | Radix `Collapsible.Root` props | | Don't pass `className` or `style`. |

### CollapsibleTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child (a Button) instead of a bare `<button type="button">`. |
| `...props` | Radix `Collapsible.Trigger` props | | Native button attributes. Don't pass `className` or `style`. |

### CollapsibleContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `forceMount` | `true` | | Keeps the content mounted and visible while closed; you'd have to hide it yourself. Avoid. |
| `asChild` | `boolean` | `false` | Renders the child element instead of the `div`. |
| `...props` | Radix `Collapsible.Content` props | | Don't pass `className` or `style`. |
<!-- api:end -->

## 13. Examples

Advanced options in a webhook form, closed by default. The fields are controlled so their values survive closing the section.

```tsx
import * as React from "react";
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, Input, Label } from "@eluan/core";
import { ChevronDown, ChevronRight } from "lucide-react";

type AdvancedValues = { timeout: string; header: string };

export function WebhookAdvancedOptions({
  values,
  onChange,
}: {
  values: AdvancedValues;
  onChange: (values: AdvancedValues) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const Chevron = open ? ChevronDown : ChevronRight;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button type="button" variant="ghost" size="sm">
          <Chevron aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
          Advanced options
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-lg)",
            paddingTop: "var(--spacing-md)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <Label htmlFor="webhook-timeout" hint="Seconds">
              Request timeout
            </Label>
            <Input
              id="webhook-timeout"
              type="number"
              value={values.timeout}
              onChange={(event) => onChange({ ...values, timeout: event.target.value })}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <Label htmlFor="webhook-header" optional>
              Custom header
            </Label>
            <Input
              id="webhook-header"
              placeholder="X-Signature"
              value={values.header}
              onChange={(event) => onChange({ ...values, header: event.target.value })}
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

## 14. Related components

- [Accordion](./accordion.md): a styled set of collapsible sections.
- [Button](./button.md): the trigger.
- [Tabs](./tabs.md): switch views instead of revealing more.
- [Popover](./popover.md): content that floats instead of pushing the page.

## 15. Common agent mistakes

_Filled from evals._

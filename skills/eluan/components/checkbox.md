---
name: Checkbox
use_when: A single yes/no choice the user confirms when they submit a form, such as accepting terms, or a select-all control above a list.
instead_of: Switch for settings that apply immediately; CheckboxGroup for a labelled list of options; RadioGroup when only one option can be chosen.
source: packages/core/src/components/checkbox.tsx
---

# Checkbox

## 1. Overview

Checkbox is a square control for one on/off choice, built on Radix Checkbox. It renders a `<button role="checkbox">` with a check icon and supports checked, unchecked and indeterminate states. It has no label of its own: pair it with a Label.

## 2. When to use

- One independent choice in a form that the user submits: "I agree to the Terms of Service", "Remember this device".
- A select-all control above a list, using the indeterminate state when only some items are selected.
- One checkbox in a layout CheckboxGroup can't produce, with your own Label.

<!-- REVIEW: the docs describe Switch as the control for immediate settings; "Checkbox for choices submitted with a form" is the drafted counterpart. -->

### When not to use

- A setting that takes effect the moment it changes → use [Switch](./switch.md).
- A list of related options with labels and descriptions → use [CheckboxGroup](./checkbox-group.md).
- One choice out of several → use [RadioGroup](./radio-group.md).
- A pressed/unpressed toolbar button → use [Toggle](./toggle.md).

## 3. Anatomy

1. **Box**: the `<button role="checkbox">`. `--size-xxs` square, `--curves-xs` radius, 1px `--interactive-border-alt` border.
2. **Indicator**: always mounted; fades the check in and out with opacity.
3. **Check icon**: a Lucide `Check` at stroke width 3, `--spacing-md` square. White (`--interactive-fg-selected`) on the filled box when checked.
4. **Hidden input**: inside a `<form>`, Radix adds a hidden native checkbox so `name` and `value` submit with the form.
5. **Label** (yours): a Label beside the box, with `htmlFor` matching the Checkbox `id`.

## 4. Variants

Checkbox has no variants.

## 5. Sizes

Checkbox has no `size` prop. The box is `--size-xxs` and follows density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Unchecked | Transparent box, `--interactive-border-alt` border | |
| Hover | `--interactive-bg-hover` fill | |
| Focus | 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. |
| Checked | `--interactive-bg-selected` fill and border, white check | |
| Indeterminate | `aria-checked="mixed"`. The box stays unfilled and shows the check icon in the surrounding text colour; there's no dash | Use it only for a select-all parent. <!-- REVIEW: checkbox.tsx styles only checked and unchecked, so indeterminate falls through to an outlined check. Not in the fix plan. --> |
| Disabled | `--interactive-bg-disabled` fill, `--interactive-border-disabled` border, not-allowed cursor | Disable its Label too. |
| Checked and disabled | Reads as empty: the fill turns pale and the white check disappears into it | Don't rely on it to show a locked-on choice. Say it in the label ("Included in your plan") or show the value as text. <!-- REVIEW: known source bug W2 #4 (checkbox.tsx :disabled overrides the checked fill). --> |
| Error | No error style | Set `aria-invalid={true}` and show a FormMessage linked with `aria-describedby`. |

## 7. Content guidelines

- Write the label as what will be true when it's checked: "Email me product updates", not "Don't email me".
- Keep it short, in sentence case. Put details or links in a description under the label.
- Never make the user uncheck a box to opt out of something they didn't choose.

| Do | Don't |
| --- | --- |
| Email me product updates | Uncheck to stop receiving emails |
| I agree to the Terms of Service | Yes |
| Remember this device | Remember me? |

<!-- REVIEW: content rules drafted; docs examples only show "Accept Terms and Conditions" with a description. -->

## 8. Rules

1. Pair every Checkbox with a Label whose `htmlFor` matches its `id`, or give it `aria-label`. The box has no text.
2. Read changes with `onCheckedChange`; it receives `true`, `false` or `"indeterminate"`. Native `onChange` doesn't fire (it's a button).
3. Control it with `checked` and `onCheckedChange` together, or leave it uncontrolled with `defaultChecked`.
4. Set `name` (and `value` if `"on"` isn't what your server expects) when the form submits natively.
5. Don't use a Checkbox for a setting that saves on change; use Switch.
6. Use CheckboxGroup for a list of related options instead of managing an array by hand.
7. Never pass `className` or `style`; they're dropped.

## 9. Dos and don'ts

**Do:** pair the box with a Label so both are clickable.

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
  <Checkbox id="remember-device" name="rememberDevice" />
  <Label htmlFor="remember-device">Remember this device</Label>
</div>
```

**Don't:** leave the text unconnected.

```tsx
<div>
  <Checkbox />
  <span>Remember this device</span>
</div>
```

**Do:** state a locked-on choice in words.

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
  <Checkbox id="audit-log" checked disabled />
  <Label htmlFor="audit-log" disabled>Audit log (included in your plan)</Label>
</div>
```

**Don't:** rely on a checked, disabled box alone to say it's on.

```tsx
<Checkbox checked disabled aria-label="Audit log" />
```

## 10. Accessibility

- Role: `checkbox` (Radix renders a `<button>`), with `aria-checked` set to `true`, `false` or `"mixed"`.
- Label: a Label with `htmlFor` matching the Checkbox `id`, or `aria-label`.
- Keyboard: Space toggles. Enter does nothing (Radix blocks it, following WAI-ARIA). Tab moves between checkboxes.
- Focus: visible outline on `:focus-visible`. Disabled checkboxes use the native `disabled` attribute and are skipped by Tab.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per checkbox. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->

## 11. Behaviour

- Responsive: the box has a fixed size and doesn't shrink beside long labels. Centre it on a one-line label; for a label with a description, align to the top and wrap the label in a `--size-xxs` minimum-height box, as CheckboxGroup does.
- Motion: colours change over 150ms and the check fades over 150ms. Don't add your own.
- Forms: inside a `<form>`, a hidden input submits `value` (default `"on"`) under `name` when checked.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean \| "indeterminate"` | | Controlled state. Pair with `onCheckedChange`. |
| `defaultChecked` | `boolean \| "indeterminate"` | | Uncontrolled starting state. |
| `onCheckedChange` | `(checked: boolean \| "indeterminate") => void` | | Called when the user toggles it. |
| `disabled` | `boolean` | `false` | Prevents interaction. |
| `required` | `boolean` | `false` | Marks it required for form validation. |
| `name` | `string` | | Field name for form submission. |
| `value` | `string` | `"on"` | Value submitted when checked. |
| `id` | `string` | | Match it with the Label's `htmlFor`. |
| `...props` | Radix `Checkbox.Root` props without `className`, `style` | | Button attributes and `aria-*`. `ref` goes to the `<button>`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Button, Checkbox, FormDescription, FormMessage, Label } from "@eluan/core";
import * as React from "react";

const row = { display: "flex", alignItems: "flex-start", gap: "var(--spacing-sm)" } as const;
const labelLine = { display: "flex", alignItems: "center", minHeight: "var(--size-xxs)" } as const;
const copy = { display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" } as const;

export function SignUpConsent({ onContinue }: { onContinue: (updates: boolean) => void }) {
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [productUpdates, setProductUpdates] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!acceptedTerms) {
      setShowError(true);
      return;
    }
    onContinue(productUpdates);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}
    >
      <div style={row}>
        <Checkbox
          id="accept-terms"
          name="acceptTerms"
          required
          checked={acceptedTerms}
          onCheckedChange={(checked) => {
            setAcceptedTerms(checked === true);
            setShowError(false);
          }}
          aria-invalid={showError ? true : undefined}
          aria-describedby={showError ? "accept-terms-hint accept-terms-error" : "accept-terms-hint"}
        />
        <div style={copy}>
          <span style={labelLine}>
            <Label htmlFor="accept-terms" required>I agree to the Terms of Service</Label>
          </span>
          <FormDescription id="accept-terms-hint">
            You can read them at acme.com/terms before continuing.
          </FormDescription>
          {showError && (
            <FormMessage id="accept-terms-error">Accept the Terms of Service to create an account</FormMessage>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
        <Checkbox
          id="product-updates"
          name="productUpdates"
          checked={productUpdates}
          onCheckedChange={(checked) => setProductUpdates(checked === true)}
        />
        <Label htmlFor="product-updates">Email me product updates</Label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="submit">Create account</Button>
      </div>
    </form>
  );
}
```

## 14. Related components

- [CheckboxGroup](./checkbox-group.md): a managed list of checkboxes with labels and descriptions.
- [Switch](./switch.md): an on/off control for settings that apply immediately.
- [RadioGroup](./radio-group.md): one choice from several.
- [Label](./form-label.md): the Label, FormDescription and FormMessage around the box.
- See [../patterns/forms.md](../patterns/forms.md) for when to use Checkbox or Switch in a form.

## 15. Common agent mistakes

_Filled from evals._

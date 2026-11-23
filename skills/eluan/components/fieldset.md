---
name: Fieldset
use_when: Grouping related form fields under one title in a bordered panel, such as an address or notification preferences.
instead_of: Card for content that isn't a form; CheckboxGroup or RadioGroup alone for one list of options; Separator to divide form sections without a border.
source: packages/core/src/components/fieldset.tsx
---

# Fieldset

## 1. Overview

Fieldset is a bordered panel that groups related form controls under a FieldsetLegend and an optional FieldsetDescription. It renders a `<div>`, not a native `<fieldset>`, to avoid the legend cutting through the border line, so it has no group semantics or `disabled` behaviour of its own.

## 2. When to use

- A set of fields that belong together: shipping address, personal information, billing details.
- Splitting a long form into titled sections.
- Putting a CheckboxGroup, RadioGroup or a few Switches under one title alongside related fields. <!-- REVIEW: drafted from the forms pattern brief; stories only show text inputs. -->

### When not to use

- A panel of content that isn't a form → use [Card](./card.md).
- Dividing form sections without a border → use [Separator](./separator.md) between them.
- One list of options with nothing else around it → use [CheckboxGroup](./checkbox-group.md) or [RadioGroup](./radio-group.md) with a label; they already group their items.
- Secondary settings the user can hide → use [Accordion](./accordion.md) or [Collapsible](./collapsible.md).

## 3. Anatomy

1. **Fieldset**: the container `<div>`. 1px `--container-border-alt` border, `--curves-lg` radius, `--spacing-lg` padding, children stacked in a column with a `--spacing-lg` gap.
2. **FieldsetLegend**: the group title, a `<div>`. `--font-size-base`, weight 500, line height 1, in `--container-fg`, with a `--spacing-xs` margin below.
3. **FieldsetDescription** (optional): a `<p>` under the legend, in `--container-fg-alt` at `--font-size-sm`.
4. **Fields**: one wrapper per field (Label, control, FormDescription, FormMessage) as direct children, so the gap spaces them.

## 4. Variants

Fieldset has no variants. It always draws the bordered panel.

## 5. Sizes

Fieldset has no `size` prop. Padding and gap are `--spacing-lg` and follow density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | Bordered panel | Fieldset isn't interactive. |
| Disabled | No disabled state | There's no `disabled` prop, and the native `<fieldset disabled>` behaviour doesn't apply to a `<div>`. Set `disabled` on each control and its Label. Don't dim a wrapper with opacity, as the Disabled story does. |

## 7. Content guidelines

- Legend: a short noun phrase in sentence case naming the group: "Shipping address", "Personal information".
- Description: one sentence on what the group is for: "Where your order should be delivered."
- Don't repeat the legend in each field label: under "Shipping address", label the fields "Street address" and "City", not "Shipping street address".

| Do | Don't |
| --- | --- |
| Shipping address | SHIPPING ADDRESS: |
| Notification preferences | Please fill in the following fields |
| Where your order should be delivered. | This section contains address fields. |

<!-- REVIEW: content rules drafted from the docs and story examples; source has no written content guidance. -->

## 8. Rules

1. Put FieldsetLegend first, then FieldsetDescription, then the fields.
2. Give the group its semantics yourself: `role="group"` and `aria-labelledby` pointing at the legend's `id`. When the Fieldset holds a single CheckboxGroup or RadioGroup, point that group's `aria-labelledby` at the legend instead and leave the Fieldset without a role. <!-- REVIEW: drafted; fieldset.tsx renders a plain div with no role. -->
3. Label every control inside. The legend names the group, not the fields.
4. Don't add padding inside the Fieldset or margins between its children; it pads and spaces them. Use a grid wrapper only to put fields side by side.
5. Disable each control individually; Fieldset can't disable its children.
6. Don't nest a Fieldset inside another. <!-- REVIEW: drafted; source doesn't address nesting. -->
7. Never pass `className` or `style`; they're dropped. Set width on a wrapper.

## 9. Dos and don'ts

**Do:** title the group, link the legend, and let the gap space the fields.

```tsx
<Fieldset role="group" aria-labelledby="contact-legend">
  <FieldsetLegend id="contact-legend">Contact details</FieldsetLegend>
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
    <Label htmlFor="contact-email">Email</Label>
    <Input id="contact-email" type="email" />
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
    <Label htmlFor="contact-phone">Phone</Label>
    <Input id="contact-phone" type="tel" />
  </div>
</Fieldset>
```

**Don't:** use bare `<label>` elements, add margins, or pad the panel again.

```tsx
<Fieldset>
  <FieldsetLegend>Contact details</FieldsetLegend>
  <div style={{ padding: 16, marginTop: 12 }}>
    <label>Email</label>
    <Input type="email" />
  </div>
</Fieldset>
```

**Do:** disable the controls themselves.

```tsx
<Fieldset role="group" aria-labelledby="sso-legend">
  <FieldsetLegend id="sso-legend">Single sign-on</FieldsetLegend>
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
    <Label htmlFor="sso-domain" disabled>Domain</Label>
    <Input id="sso-domain" disabled value="acme.com" />
  </div>
</Fieldset>
```

**Don't:** fake a disabled group with opacity.

```tsx
<div style={{ opacity: 0.5, pointerEvents: "none" }}>
  <Fieldset>
    <FieldsetLegend>Single sign-on</FieldsetLegend>
    <Input value="acme.com" />
  </Fieldset>
</div>
```

## 10. Accessibility

- Role: none by default; Fieldset renders a `<div>`. Add `role="group"` so screen readers announce the group when focus enters it.
- Label: point `aria-labelledby` at the FieldsetLegend `id`, and `aria-describedby` at the FieldsetDescription `id` if there is one. <!-- REVIEW: drafted; no source wiring. -->
- Keyboard: Fieldset isn't focusable. Tab moves through the controls inside in DOM order.
- Focus: handled by each control.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: the panel fills its container and stacks children in one column. For fields side by side (City and Postal code), wrap them in a grid you own with `gridTemplateColumns: "1fr 1fr"` and a `--spacing-md` gap, as the docs example does.
- Spacing: the legend's `--spacing-xs` margin adds to the `--spacing-lg` gap, so the space under the legend is slightly larger than between fields. Don't add your own. <!-- REVIEW: listed under "Already fixed" in the fix plan, downgraded to an open question for Vas about whether the extra space is intended. -->
- Overflow: the legend has line height 1; keep it to one line.
- Motion: none.

## 12. API

<!-- api:start -->
### Fieldset

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `role` | `string` | | Set `"group"` to give the panel group semantics. |
| `aria-labelledby` | `string` | | The FieldsetLegend `id`. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | `id`, `aria-describedby`, `children`. `ref` goes to the `<div>`. |

### FieldsetLegend

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | `id` (reference it from `aria-labelledby`), `children`. |

### FieldsetDescription

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLParagraphElement>` without `className`, `style` | | `id` (reference it from `aria-describedby`), `children`. |
<!-- api:end -->

## 13. Examples

```tsx
import {
  Fieldset,
  FieldsetDescription,
  FieldsetLegend,
  Input,
  Label,
} from "@eluan/core";

const field = { display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" } as const;

export function ShippingAddress() {
  return (
    <Fieldset role="group" aria-labelledby="shipping-legend" aria-describedby="shipping-description">
      <FieldsetLegend id="shipping-legend">Shipping address</FieldsetLegend>
      <FieldsetDescription id="shipping-description">
        Where your order should be delivered.
      </FieldsetDescription>

      <div style={field}>
        <Label htmlFor="street" required>Street address</Label>
        <Input id="street" name="street" required autoComplete="street-address" placeholder="24 Zhongshan Road" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--spacing-md)" }}>
        <div style={field}>
          <Label htmlFor="city" required>City</Label>
          <Input id="city" name="city" required autoComplete="address-level2" placeholder="Hengchun" />
        </div>
        <div style={field}>
          <Label htmlFor="postal-code" required>Postal code</Label>
          <Input id="postal-code" name="postalCode" required autoComplete="postal-code" placeholder="946" />
        </div>
      </div>

      <div style={field}>
        <Label htmlFor="country" required>Country</Label>
        <Input id="country" name="country" required autoComplete="country-name" placeholder="Taiwan" />
      </div>
    </Fieldset>
  );
}
```

## 14. Related components

- [Label](./form-label.md): Label, FormDescription and FormMessage for each field inside.
- [CheckboxGroup](./checkbox-group.md) and [RadioGroup](./radio-group.md): option lists that often sit in a Fieldset.
- [Card](./card.md): a bordered panel for content that isn't a form.
- [Separator](./separator.md): divides sections without a panel.
- See [../patterns/forms.md](../patterns/forms.md) for structuring long forms.

## 15. Common agent mistakes

_Filled from evals._

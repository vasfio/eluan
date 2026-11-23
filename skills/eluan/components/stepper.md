---
name: Stepper
use_when: Showing where the user is in a fixed sequence of steps, such as a checkout or an onboarding wizard.
instead_of: Tabs for switching between independent views; Progress for a percentage; Breadcrumb for where a page sits in the site.
source: packages/core/src/components/stepper.tsx
---

# Stepper

## 1. Overview

Stepper shows a numbered sequence of steps, each completed, current or upcoming, joined by connector lines. You pass the steps as an array and the current step as a zero-based index. `StepperContent` renders the panel for the current step. Steps run horizontally (the default) or vertically, and can be clickable.

## 2. When to use

- A multi-step form or wizard: checkout, onboarding, a data import.
- Showing progress through a fixed, ordered sequence where each step depends on the one before.
- Letting the user go back to a step they've completed, with `onStepClick`.

### When not to use

- Switching between independent views of the same thing → use [Tabs](./tabs.md) or [SegmentedControl](./segmented-control.md).
- Showing a percentage → use [Progress](./progress.md).
- Showing where a page sits in the site → use [Breadcrumb](./breadcrumb.md).
- Moving through pages of results → use [Pagination](./pagination.md).
- The status of an item → use [Badge](./badge.md).

## 3. Anatomy

1. **Root**: the `Stepper` `<div>`; lays the steps out in a row or a column.
2. **Indicator**: a circular `<button>` per step, `--size-lg` across. Shows the step number, the step's `icon`, or a check once completed.
3. **Title**: `step.title`, under the indicator (horizontal) or beside it (vertical).
4. **Description** (optional): `step.description`, in smaller muted text under the title.
5. **Connector**: the line between two steps. It darkens once the step before it is complete.
6. **StepperContent**: a separate component that renders its children only while its `step` equals `currentStep`.

## 4. Variants

Stepper has no `variant` prop. `orientation` sets the layout:

| Orientation | Use for |
| --- | --- |
| `horizontal` | Default. A wizard header above the form, with short titles. |
| `vertical` | Sidebars and narrow layouts, or steps with longer descriptions. |

<!-- REVIEW: the stories call vertical "suitable for sidebar or narrow-width layouts"; the horizontal row is drafted. -->

## 5. Sizes

Stepper has no size prop. The indicator is `--size-lg`, titles are `--font-size-sm` and descriptions `--font-size-xs`; all of them follow density.

## 6. States

Each step is in one of these states, set by its index against `currentStep`:

| State | Looks like | Notes |
| --- | --- | --- |
| Upcoming | Unfilled circle with a pale border, muted number and title | |
| Current | Unfilled circle with a dark border, full-strength number and title | `aria-current="step"`. |
| Completed | Filled dark circle with a check, dark title | The connector after it turns dark. |
| Hover | Clickable steps only: completed switches to `--action-primary-bg-hover`, current fills with `--interactive-bg-hover`, upcoming gets a dark border | |
| Focus | 1px ring in `--focus-ring` around the circle, edged with `--container-bg`, drawn with `box-shadow` | Never remove or restyle the focus ring. |
| Disabled | No hover, default cursor | Steps that aren't clickable are disabled buttons: every step when there's no `onStepClick`. |

Connectors are `--spacing-xxs` halved, which is 0 in compact density, so in compact the steps show as unconnected circles. Don't draw your own connectors; it's a source bug. <!-- REVIEW: W6 in the fix plan (stepper.tsx connector width and height use calc(var(--spacing-xxs) / 2)). -->

## 7. Content guidelines

- Title each step with one or two words for its task: "Shipping", "Payment", "Review".
- Keep titles parallel: all nouns, or all verbs.
- Use a description only when the title needs help: "Where should we send it?"
- Make the last step the check before committing: "Review" or "Confirm".
- Use sentence case.

| Do | Don't |
| --- | --- |
| Shipping | Step 1 |
| Payment | Enter your payment details below |
| Review | Done! |

<!-- REVIEW: copy guidance drafted; stories and docs use Account / Profile / Confirm. -->

## 8. Rules

1. `currentStep` is a zero-based index. Set it to `steps.length` to show every step completed.
2. Give every step a unique, stable `id`; it's the React key.
3. To let users go back but not skip ahead, pass `onStepClick` with `allowClickOnCompleted={false}`. With the default `true`, every step, upcoming ones included, is clickable as soon as `onStepClick` is set.
4. Leave `onStepClick` off for a display-only stepper. Every indicator is then a disabled button.
5. Check the current step is valid before you advance. Stepper doesn't validate; your Continue button and `onStepClick` decide whether `currentStep` changes.
6. Render one `StepperContent` per step with the same `currentStep`, and put Back and Continue [Buttons](./button.md) in your own footer.
7. Keep form state above `StepperContent`. It unmounts every step except the current one, so state held inside a step is lost when the user moves on.
8. Never pass `className` or `style`; they're dropped. Put width on a wrapper.

<!-- REVIEW: rules 5 to 7 drafted from how StepperContent renders; source and docs give no wizard guidance. -->

## 9. Dos and don'ts

**Do:** allow going back to completed steps only.

```tsx
<Stepper
  steps={checkoutSteps}
  currentStep={current}
  onStepClick={setCurrent}
  allowClickOnCompleted={false}
/>
```

**Don't:** let users jump ahead past steps they haven't finished.

```tsx
<Stepper steps={checkoutSteps} currentStep={current} onStepClick={setCurrent} />
```

**Do:** keep the wizard's data above the steps.

```tsx
const [address, setAddress] = useState<Address | null>(null);

<StepperContent step={0} currentStep={current}>
  <ShippingForm value={address} onChange={setAddress} />
</StepperContent>
```

**Don't:** keep step data inside the step; it's lost when the step unmounts.

```tsx
<StepperContent step={0} currentStep={current}>
  <ShippingFormWithOwnState />
</StepperContent>
```

## 10. Accessibility

- Role: the root is a plain `<div>` with no list or group semantics. Each indicator is a native `<button>`; the current one has `aria-current="step"`.
- Label: each indicator is named from its title, plus "(completed)" or "(current step)"; upcoming steps get the title alone. Descriptions aren't part of the name. Wrap the Stepper in an element you own that names it, for example `<nav aria-label="Checkout steps">` when steps are clickable. <!-- REVIEW: wrapper drafted; source sets no name on the root. -->
- Keyboard: Tab moves between clickable indicators; Enter and Space activate them. Disabled indicators are skipped.
- Focus: Stepper doesn't move focus when `currentStep` changes. After the user advances, move focus to the new step's heading so keyboard and screen reader users land on the new content. <!-- REVIEW: drafted; source doesn't manage focus. -->
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: horizontal steps sit in one row and don't wrap; connectors stretch to fill the space between them, down to `--size-sm`. Switch to `orientation="vertical"` in narrow containers. <!-- REVIEW: no responsive guidance in source; drafted from the stories' vertical description. -->
- Overflow and truncation: titles and descriptions wrap; nothing truncates. Keep titles short.
- Vertical: the connector runs down from the centre of the indicator, at least `--spacing-xl` tall.
- Motion: indicator and connector colours transition over 150ms. Don't add your own.

## 12. API

<!-- api:start -->
### Stepper

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `steps` | `Step[]` | required | The steps, in order. |
| `currentStep` | `number` | required | Zero-based index of the current step. Earlier steps show as completed. |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction. |
| `onStepClick` | `(step: number) => void` | | Makes steps clickable; receives the clicked index. |
| `allowClickOnCompleted` | `boolean` | `true` | With `onStepClick`: `true` makes every step clickable, `false` only completed steps. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | `id`, `aria-*`. The ref goes to the root `<div>`. |

### Step

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | required | Unique, stable key. |
| `title` | `string` | required | Visible title and the indicator's accessible name. |
| `description` | `string` | | Muted text under the title. |
| `icon` | `ReactNode` | | Replaces the number in the indicator until the step is completed. |

### StepperContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `step` | `number` | required | The step index this panel belongs to. |
| `currentStep` | `number` | required | The Stepper's current step. The panel renders only when they match. |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | `children`, `id`, `aria-*`. The ref goes to the panel `<div>`. |
<!-- api:end -->

## 13. Examples

```tsx
import { useState } from "react";
import { Button, Stepper, StepperContent, Typography } from "@eluan/core";

const checkoutSteps = [
  { id: "shipping", title: "Shipping", description: "Where should we send it?" },
  { id: "payment", title: "Payment" },
  { id: "review", title: "Review" },
];

export function CheckoutWizard({ onPlaceOrder }: { onPlaceOrder: () => void }) {
  const [current, setCurrent] = useState(0);
  const isLast = current === checkoutSteps.length - 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xl)", width: "100%" }}>
      <nav aria-label="Checkout steps">
        <Stepper
          steps={checkoutSteps}
          currentStep={current}
          onStepClick={setCurrent}
          allowClickOnCompleted={false}
        />
      </nav>

      <StepperContent step={0} currentStep={current}>
        <Typography variant="heading">Shipping address</Typography>
      </StepperContent>
      <StepperContent step={1} currentStep={current}>
        <Typography variant="heading">Payment method</Typography>
      </StepperContent>
      <StepperContent step={2} currentStep={current}>
        <Typography variant="heading">Review your order</Typography>
      </StepperContent>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--spacing-sm)" }}>
        {current > 0 && (
          <Button type="button" variant="outline" onClick={() => setCurrent(current - 1)}>
            Back
          </Button>
        )}
        <Button type="button" onClick={() => (isLast ? onPlaceOrder() : setCurrent(current + 1))}>
          {isLast ? "Place order" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
```

## 14. Related components

- [Tabs](./tabs.md): independent views with no order.
- [Progress](./progress.md): a percentage instead of named steps.
- [Button](./button.md): Back and Continue in the wizard footer.
- [Fieldset](./fieldset.md): group the fields inside each step.
- See [patterns/forms.md](../patterns/forms.md) for the fields inside each step.

## 15. Common agent mistakes

_Filled from evals._

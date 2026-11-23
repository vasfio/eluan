---
name: Progress
use_when: Showing how far a task with a known amount has got, such as an upload, a sync or setup completion.
instead_of: Spinner when you can't say how long it will take; Skeleton for content loading into a layout; Stepper for steps in a flow.
source: packages/core/src/components/progress.tsx
---

# Progress

## 1. Overview

Progress is a horizontal bar that fills from the left to show a percentage. It wraps Radix Progress, renders `role="progressbar"`, and comes in two sizes and four tones. It has no built-in label or number; you add those as text.

## 2. When to use

- An upload, download, import or export with a known percentage.
- Completion of a setup checklist or profile.
- Usage against a limit, such as storage used.

### When not to use

- You can't say how long the work will take → use [Spinner](./spinner.md). Progress has no indeterminate animation.
- Content is loading into a known layout → use [Skeleton](./skeleton.md).
- The user moves through named steps → use [Stepper](./stepper.md).
- The status of an item → use [Badge](./badge.md).
- The user sets the value → use [Slider](./slider.md).

## 3. Anatomy

1. **Track**: the root `<div>`; full width, pill-shaped, pale grey.
2. **Indicator**: the fill, slid in from the left to `value` percent.

There is no label part. Put a text label and the value next to the bar yourself.

## 4. Variants

Progress has no `variant` prop. `tone` colours the fill:

| Tone | Use for |
| --- | --- |
| `default` | Every progress bar. Near-black fill in the default theme. |
| `weak` | The low end of a quality scale, in `--destructive-fg`. |
| `medium` | The middle of a quality scale, in `--cautionary-fg`. |
| `strong` | The high end of a quality scale, in `--positive-fg`. |

The non-default tones exist for scales such as password strength (PasswordInput is their only consumer), not for task progress. They're broken today; see States.

## 5. Sizes

| Size | Use in |
| --- | --- |
| `default` | Most bars (`--spacing-sm` tall). |
| `sm` | Dense rows and inline meters (`--spacing-xs` plus `--spacing-xxs` tall). |

`sm` is the same height as `default` in standard and wide density; it's only thinner in compact density. <!-- REVIEW: source issue, not in the fix plan; --spacing-xs + --spacing-xxs equals --spacing-sm at standard (6px) and wide (12px). -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Empty | Track only | `value={0}`. |
| In progress | Partial fill from the left | |
| Complete | Full fill | `value={100}`. |
| Indeterminate | Track only, identical to empty | Leaving out `value` doesn't animate. Use a [Spinner](./spinner.md) for unknown progress. |
| Tone | Whole bar in the tone colour at every value | `tone` is applied to the track as well as the fill, so `weak`, `medium` and `strong` read as 100% full. Use `tone="default"` (or omit it) until this is fixed. <!-- REVIEW: W2 #1 in the fix plan (progress.tsx spreads toneStyles onto both Root and Indicator). --> |

## 7. Content guidelines

- Label every bar with what's progressing, in visible text: "Uploading quarterly-report.pdf".
- Show the amount as text when it matters: "60%", "3 of 5 files", "6.2 GB of 10 GB used".
- When the task finishes, say so in text or a [Toast](./toast.md); don't leave a full bar as the only signal.

| Do | Don't |
| --- | --- |
| Uploading quarterly-report.pdf · 60% | A bar with no label |
| 3 of 5 files imported | Please wait… |
| 6.2 GB of 10 GB used | 62 |

<!-- REVIEW: copy guidance drafted; the docs example labels bars with a name and a percentage. -->

## 8. Rules

1. Pass `value` from 0 to 100, clamped. The fill is computed as a percentage and ignores `max`; values outside 0 to 100 shift the fill off the track.
2. Give every bar an accessible name with `aria-label`, or `aria-labelledby` pointing at its visible label.
3. Pass `aria-valuenow={value}` as well as `value`, and `aria-valuetext` when a phrase reads better than a percentage. Progress doesn't pass `value` on to Radix, so the bar reports no value without them. <!-- REVIEW: source issue, not in the fix plan; see Accessibility. -->
4. Use `tone="default"`. The other tones currently fill the whole bar.
5. Use a [Spinner](./spinner.md), not an empty Progress, when you don't know the amount.
6. Never pass `className` or `style`; they're dropped. Progress fills its container, so set width on a wrapper.

## 9. Dos and don'ts

**Do:** label the bar and expose its value.

```tsx
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
  <Typography variant="label" id="upload-label">Uploading quarterly-report.pdf · {percent}%</Typography>
  <Progress value={percent} aria-valuenow={percent} aria-labelledby="upload-label" />
</div>
```

**Don't:** leave it unnamed, size it by hand or use it for an unknown wait.

```tsx
<Progress style={{ width: 200 }} />
```

**Do:** keep the default tone for task progress.

```tsx
<Progress value={75} aria-valuenow={75} aria-label="Profile completion" />
```

**Don't:** colour progress with the strength tones.

```tsx
<Progress value={75} tone="strong" aria-label="Profile completion" />
```

## 10. Accessibility

- Role: `progressbar` (Radix), with `aria-valuemin="0"` and `aria-valuemax` from `max` (100 by default).
- Label: none by default. Add `aria-label` or `aria-labelledby`.
- Value: Radix would set `aria-valuenow` and `aria-valuetext` from `value`, but progress.tsx keeps `value` for its own fill and never passes it to the Radix root. The bar therefore reports no value and its `data-state` is always `indeterminate`. Pass `aria-valuenow` (and `aria-valuetext` if helpful) yourself; they're spread onto the root. <!-- REVIEW: source issue, not in the fix plan; progress.tsx destructures value and doesn't forward it to ProgressPrimitive.Root. -->
- Keyboard: not focusable; no keys.
- Focus: Progress never takes or moves focus.
- Updates: screen readers don't announce value changes on their own. Announce completion in text (a `role="status"` line or a [Toast](./toast.md)). <!-- REVIEW: drafted; source has no live-region behaviour. -->
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: the track is 100% wide; control width with a wrapper you own.
- Overflow and truncation: the fill is clipped to the rounded track.
- Motion: the fill slides to each new value over 300ms. This transition isn't turned off under `prefers-reduced-motion`. Don't add your own.
- Density: both heights come from `--spacing-*`, so the bar gets thinner in compact density and thicker in wide.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number \| null` | | Percentage filled, 0 to 100. Drives the fill only; also pass `aria-valuenow`. |
| `size` | `"default" \| "sm"` | `"default"` | Bar height. |
| `tone` | `"default" \| "weak" \| "medium" \| "strong"` | `"default"` | Fill colour. Non-default tones are currently broken. |
| `max` | `number` | `100` | Radix maximum. Only sets `aria-valuemax`; the fill always assumes 100. |
| `aria-valuenow` | `number` | | Current value for assistive tech. Pass the same number as `value`. |
| `aria-valuetext` | `string` | | Spoken value, such as "3 of 5 files". |
| `aria-label` | `string` | | Accessible name when there's no visible label to reference. |
| `...props` | Radix `Progress.Root` props without `className`, `style` | | `aria-labelledby`, `id`. `getValueLabel` has no effect while `value` isn't forwarded. The ref goes to the root `<div>`. |
<!-- api:end -->

## 13. Examples

```tsx
import { useId } from "react";
import { Progress, Typography } from "@eluan/core";

export function UploadProgress({ fileName, percent }: { fileName: string; percent: number }) {
  const value = Math.min(100, Math.max(0, Math.round(percent)));
  const labelId = useId();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--spacing-sm)" }}>
        <Typography variant="label" tone="muted" id={labelId}>
          Uploading {fileName}
        </Typography>
        <Typography variant="label" tone="muted">
          {value}%
        </Typography>
      </div>
      <Progress value={value} aria-valuenow={value} aria-labelledby={labelId} />
    </div>
  );
}
```

## 14. Related components

- [Spinner](./spinner.md): work in progress with no known amount.
- [Skeleton](./skeleton.md): placeholders while content loads.
- [Stepper](./stepper.md): progress through named steps.
- [Slider](./slider.md): a bar the user drags to set a value.
- [Toast](./toast.md): confirm the task finished.

## 15. Common agent mistakes

_Filled from evals._

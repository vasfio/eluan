---
name: Switch
use_when: Turning a setting on or off where the change takes effect immediately, such as notifications or a feature flag.
instead_of: Checkbox for choices the user submits with a form; Toggle for a pressed toolbar button; RadioGroup or SegmentedControl for more than two options.
source: packages/core/src/components/switch.tsx
---

# Switch

## 1. Overview

Switch is an on/off control built on Radix Switch, meant for boolean settings that apply immediately. It renders a `<button role="switch">` with a sliding thumb. It has no label of its own: pair it with a Label.

## 2. When to use

- A setting that applies the moment it's flipped: "Marketing emails", "Security emails", "Airplane mode".
- A list of independent settings, one per row, each with a label and a short description.

### When not to use

- A choice the user confirms later with a submit button → use [Checkbox](./checkbox.md). <!-- REVIEW: drafted counterpart to the docs' "immediate boolean settings"; no source states the Checkbox side. -->
- A pressed/unpressed button in a toolbar → use [Toggle](./toggle.md).
- More than two options → use [RadioGroup](./radio-group.md) or [SegmentedControl](./segmented-control.md).
- A one-off action → use [Button](./button.md).

## 3. Anatomy

1. **Track**: the `<button role="switch">`. `--size-lg` wide, `--size-xs` tall, fully rounded, with a 2px border in the track colour.
2. **Thumb**: a `--size-xxs` tall pill in `--interactive-bg` that slides to the end when on.
3. **Hidden input**: inside a `<form>`, Radix adds a hidden native checkbox so `name` and `value` submit with the form.
4. **Label** (yours): a Label with `htmlFor` matching the Switch `id`, and an optional description.

## 4. Variants

Switch has no variants.

## 5. Sizes

Switch has no `size` prop. The track is `--size-lg` by `--size-xs` and follows density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Off | Track and border in `--interactive-border-alt`, thumb at the start | |
| On | Track and border in `--interactive-bg-selected`, thumb at the end | |
| Focus | 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. |
| Disabled | Track fill switches to `--interactive-bg-disabled`, not-allowed cursor; the thumb stays on its side | Disable its Label too. <!-- REVIEW: the light thumb on the pale disabled track may read poorly, like W2 #4; not in the fix plan and not checked visually. --> |
| Loading | No built-in loading state | While a save is in flight, keep the new position, set `disabled` and `aria-busy`, and revert if the save fails. <!-- REVIEW: composition drafted; Switch has no loading prop. --> |

There's no hover style.

## 7. Content guidelines

- Label the setting, not the action: "Marketing emails", not "Turn on marketing emails".
- Don't add "On" or "Off" text beside the switch; the thumb position shows the state.
- Use a description for one sentence on the effect: "Receive emails about new products."

| Do | Don't |
| --- | --- |
| Marketing emails | Enable marketing emails? |
| Receive emails about account activity. | When this is on, we will send you emails about account activity. |
| Two-factor authentication | 2FA ON |

<!-- REVIEW: content rules drafted from the story labels and descriptions. -->

## 8. Rules

1. Pair every Switch with a Label whose `htmlFor` matches its `id`, or give it `aria-label`.
2. Apply the change in `onCheckedChange` straight away. Don't wait for a submit button; if the change needs confirming, use a Checkbox in the form instead.
3. `onCheckedChange` receives a `boolean`. Switch has no `onChange` or `onValueChange`.
4. Control it with `checked` and `onCheckedChange` together, or leave it uncontrolled with `defaultChecked`.
5. In a settings list, put the label and description first and the Switch at the end of the row. For a single compact toggle, the Switch can come first with the Label after it.
6. Never pass `className` or `style`; they're dropped.

## 9. Dos and don'ts

**Do:** label the setting and save on change.

```tsx
<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-lg)" }}>
  <Label htmlFor="marketing-emails">Marketing emails</Label>
  <Switch id="marketing-emails" checked={marketing} onCheckedChange={saveMarketing} />
</div>
```

**Don't:** use a Switch that only takes effect after a Save button.

```tsx
<form onSubmit={save}>
  <Switch id="marketing-emails" name="marketing" />
  <Label htmlFor="marketing-emails">Marketing emails</Label>
  <Button type="submit">Save</Button>
</form>
```

**Do:** let the thumb show the state.

```tsx
<Switch id="two-factor" checked={enabled} onCheckedChange={setEnabled} />
<Label htmlFor="two-factor">Two-factor authentication</Label>
```

**Don't:** add state text or an unlabelled switch.

```tsx
<Switch checked={enabled} onCheckedChange={setEnabled} />
<span>{enabled ? "ON" : "OFF"}</span>
```

## 10. Accessibility

- Role: `switch` (Radix renders a `<button>`), with `aria-checked`.
- Label: a Label with `htmlFor` matching the Switch `id`, or `aria-label`. Link a description with `aria-describedby`. <!-- REVIEW: description wiring drafted; the stories don't link it. -->
- Keyboard: Space and Enter toggle (native button behaviour). Tab moves between switches.
- Focus: visible outline on `:focus-visible`. Disabled switches use the native `disabled` attribute and are skipped by Tab.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per switch. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->

## 11. Behaviour

- Responsive: fixed size; it doesn't shrink beside long labels. In settings rows, spread the label and switch with `justifyContent: "space-between"` and a `--spacing-lg` gap, as the settings story does.
- Motion: the thumb slides and the track changes colour over 150ms. Don't add your own.
- Forms: inside a `<form>`, a hidden input submits `value` (default `"on"`) under `name` when on.

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `checked` | `boolean` | | Controlled state. Pair with `onCheckedChange`. |
| `defaultChecked` | `boolean` | | Uncontrolled starting state. |
| `onCheckedChange` | `(checked: boolean) => void` | | Called when the user flips it. |
| `disabled` | `boolean` | `false` | Prevents interaction. |
| `required` | `boolean` | `false` | Marks it required for form validation. |
| `name` | `string` | | Field name for form submission. |
| `value` | `string` | `"on"` | Value submitted when on. |
| `id` | `string` | | Match it with the Label's `htmlFor`. |
| `...props` | Radix `Switch.Root` props without `className`, `style` | | Button attributes and `aria-*`. `ref` goes to the `<button>`. |
<!-- api:end -->

## 13. Examples

```tsx
import { Label, Switch, Typography } from "@eluan/core";
import * as React from "react";

type Setting = { id: string; label: string; description: string };

const settings: Setting[] = [
  { id: "marketing-emails", label: "Marketing emails", description: "Receive emails about new products." },
  { id: "security-emails", label: "Security emails", description: "Receive emails about account activity." },
];

const row = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "var(--spacing-lg)",
} as const;
const copy = { display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" } as const;

export function EmailSettings({
  initial,
  onSave,
}: {
  initial: Record<string, boolean>;
  onSave: (id: string, enabled: boolean) => Promise<void>;
}) {
  const [values, setValues] = React.useState(initial);
  const [saving, setSaving] = React.useState<string | null>(null);

  async function handleChange(id: string, enabled: boolean) {
    setValues((current) => ({ ...current, [id]: enabled }));
    setSaving(id);
    try {
      await onSave(id, enabled);
    } catch {
      setValues((current) => ({ ...current, [id]: !enabled }));
    } finally {
      setSaving(null);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
      {settings.map((setting) => (
        <div key={setting.id} style={row}>
          <div style={copy}>
            <Label htmlFor={setting.id}>{setting.label}</Label>
            <Typography id={`${setting.id}-description`} variant="caption" tone="muted">
              {setting.description}
            </Typography>
          </div>
          <Switch
            id={setting.id}
            checked={values[setting.id] ?? false}
            onCheckedChange={(enabled) => handleChange(setting.id, enabled)}
            disabled={saving === setting.id}
            aria-busy={saving === setting.id || undefined}
            aria-describedby={`${setting.id}-description`}
          />
        </div>
      ))}
    </div>
  );
}
```

## 14. Related components

- [Checkbox](./checkbox.md): an on/off choice submitted with a form.
- [Toggle](./toggle.md): a button that stays pressed.
- [Label](./form-label.md): the Label beside each switch.
- [Toast](./toast.md): tells the user a setting failed to save.
- See [../patterns/forms.md](../patterns/forms.md) for when to use Switch or Checkbox.

## 15. Common agent mistakes

_Filled from evals._

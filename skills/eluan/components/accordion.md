---
name: Accordion
use_when: Stacking several sections of secondary content the user may skip, each expanded from its own header, such as an FAQ or advanced settings.
instead_of: Collapsible for a single show/hide region; Tabs for switching between peer views; Card or headings for content everyone needs.
source: packages/core/src/components/accordion.tsx
---

# Accordion

## 1. Overview

Accordion is a vertical stack of sections, each with a header button that shows or hides its content. It wraps Radix Accordion: the root sets whether one or several sections can be open, and each item has a trigger and a content region.

## 2. When to use

- FAQs and help content on a page.
- Advanced or rarely changed settings below the main ones.
- Long secondary detail (release notes, policy sections) that most users skip.
- Grouped filters in a side panel, where several groups may be open at once (`type="multiple"`).

### When not to use

- One region to show or hide → use [Collapsible](./collapsible.md).
- Switching between peer views of the same thing → use [Tabs](./tabs.md).
- Content every user needs to read or act on → show it with headings ([Typography](./typography.md)) or in a [Card](./card.md).
- Steps the user completes in order → use [Stepper](./stepper.md).
- Nested folders or hierarchical data → use [TreeView](./tree-view.md).

## 3. Anatomy

1. **Accordion**: the root. Sets `type` (single or multiple) and holds the open state.
2. **AccordionItem**: one section, with a required `value` and a bottom border in `--interactive-border-alt`.
3. **AccordionTrigger**: the header. Renders a `<button>` inside an `<h3>`, with the label at `--font-size-base`, weight 500, and a chevron at the end that turns over when open.
4. **AccordionContent**: the region below the trigger, in muted `--font-size-sm` text, padded top and bottom.

## 4. Variants

Accordion has no visual variants. `type` sets the behaviour:

| Type | Use for |
| --- | --- |
| `single` | FAQs and settings, where opening one section closes the other. Add `collapsible` so the open section can be closed again. |
| `multiple` | Filters or reference sections the user wants to compare side by side. |

<!-- REVIEW: "Use for" is drafted; source and docs only describe the behaviour of each type. -->

## 5. Sizes

Accordion has no size prop. Text uses `--font-size-base` (trigger) and `--font-size-sm` (content), which follow density.

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Closed | Trigger label and chevron pointing down; content hidden | `data-state="closed"` on the trigger. |
| Open | Chevron turned up; content shown | `data-state="open"`. |
| Hover | No visible change | The hover rule sets the same colour as rest. <!-- REVIEW: not in the fix plan; accordion.tsx :hover repeats --interactive-fg, like the tabs.tsx dead hover in W3. --> |
| Focus | The browser's default focus ring | AccordionTrigger declares no focus style. Never remove or restyle the focus ring. |
| Disabled | No visible change | `disabled` on Accordion or an item blocks toggling but isn't styled. Remove a section rather than disabling it. <!-- REVIEW: no disabled styles in source; advice drafted. --> |

## 7. Content guidelines

- Write trigger labels as the question or topic the section answers: "Can I change plans later?", "Data retention".
- Keep labels to one line. Use sentence case.
- Open with the answer in the first sentence of the content.
- Keep each section self-contained; don't refer to "the section above".

| Do | Don't |
| --- | --- |
| Can I change plans later? | Plans |
| Data retention | Click to see more |
| Yes. Switch plans from Billing at any time. | As mentioned above, you can… |

<!-- REVIEW: content guidance drafted; source gives no copy rules for Accordion. -->

## 8. Rules

1. Set `type` on every Accordion; it's required. With `type="single"`, add `collapsible` unless one section must always stay open.
2. Give each AccordionItem a unique, stable `value`.
3. Pass only text (and inline content) to AccordionTrigger. It already renders the chevron; don't add another icon or a Button inside it.
4. Don't hide content users need to complete the task inside a closed section.
5. Don't nest an Accordion inside an AccordionContent.
6. Don't pass `className` or `style`, even to the Accordion root. The root is Radix's own and doesn't drop them, but every other part does; set width on a wrapper. <!-- REVIEW: Accordion is re-exported from Radix unwrapped, so it isn't styling-closed like the rest of the library (the stories pass style to it). -->

## 9. Dos and don'ts

**Do:** let the user close the open section.

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="plans">
    <AccordionTrigger>Can I change plans later?</AccordionTrigger>
    <AccordionContent>Yes. Switch plans from Billing at any time.</AccordionContent>
  </AccordionItem>
</Accordion>
```

**Don't:** use a single-item Accordion for one show/hide region.

```tsx
<Accordion type="single">
  <AccordionItem value="more">
    <AccordionTrigger>Show more</AccordionTrigger>
    <AccordionContent>Extra details</AccordionContent>
  </AccordionItem>
</Accordion>
```

**Do:** keep the trigger to a label.

```tsx
<AccordionTrigger>Data retention</AccordionTrigger>
```

**Don't:** add icons or controls to the trigger.

```tsx
<AccordionTrigger>
  <ChevronDown /> Data retention <Button size="iconSm">Edit</Button>
</AccordionTrigger>
```

## 10. Accessibility

- Role: each AccordionTrigger is a `button` inside an `h3`, with `aria-expanded` and `aria-controls`. AccordionContent is a `region` labelled by its trigger.
- Heading level: always `h3`. AccordionTrigger doesn't expose the header part, so place the Accordion where an `h3` fits the outline, for example under an `h2` section heading. <!-- REVIEW: verified Radix renders Header as h3; Eluan wraps it inside AccordionTrigger with no way to change the level. -->
- Label: the trigger's text content. The chevron is `aria-hidden`.
- Keyboard: Enter and Space toggle the focused section. Tab and Shift+Tab move between triggers and into open content. Arrow Down and Arrow Up move focus between triggers; Home and End jump to the first and last.
- Focus: stays on the trigger when a section opens or closes. The trigger shows the browser's default ring; don't add your own.
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: Accordion fills its parent's width. Constrain it with a wrapper.
- Overflow and truncation: trigger labels and content wrap; nothing truncates.
- Motion: the chevron turns over 200ms. Content opens and closes without a height animation. Don't add your own. <!-- REVIEW: the stories say "animated by default", but accordion.tsx only transitions the chevron; the content's transition has nothing to animate. -->
- Controlled or not: pass `defaultValue` to open sections on first render, or `value` with `onValueChange` to control them. `value` is a string for `single` and a string array for `multiple`.

## 12. API

<!-- api:start -->
### Accordion

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"single" \| "multiple"` | | Required. One open section at a time, or several. |
| `collapsible` | `boolean` | `false` | `single` only. Lets the open section close again. |
| `defaultValue` | `string \| string[]` | | Sections open on first render (uncontrolled). Array for `multiple`. |
| `value` | `string \| string[]` | | Open sections (controlled). |
| `onValueChange` | `(value: string \| string[]) => void` | | Called when sections open or close. |
| `disabled` | `boolean` | `false` | Disables every section. Not styled. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Which arrow keys move between triggers. |
| `...props` | Radix `Accordion.Root` props | | `dir`, `aria-*`. Don't pass `className` or `style`. |

### AccordionItem

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | | Required. Unique id for the section. |
| `disabled` | `boolean` | `false` | Blocks toggling this section. Not styled. |
| `...props` | Radix `Accordion.Item` props without `className`, `style` | | |

### AccordionTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | | The section label. The chevron is added for you. |
| `...props` | Radix `Accordion.Trigger` props without `className`, `style` | | Native button attributes. |

### AccordionContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | | The section body. |
| `forceMount` | `true` | | Keeps the content in the DOM while closed. |
| `...props` | Radix `Accordion.Content` props without `className`, `style` | | |
<!-- api:end -->

## 13. Examples

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Typography } from "@eluan/core";

const faqs = [
  { id: "change-plan", question: "Can I change plans later?", answer: "Yes. Switch plans from Billing at any time. We prorate the difference on your next invoice." },
  { id: "cancel", question: "What happens to my data if I cancel?", answer: "Your projects stay read-only for 30 days, then we delete them. Export them from Settings before you cancel." },
  { id: "invoices", question: "Where do I find past invoices?", answer: "Go to Billing, then Invoices. Each invoice downloads as a PDF." },
];

export function BillingFaq() {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <Typography variant="heading" as="h2">Billing questions</Typography>
      <Accordion type="single" collapsible defaultValue="change-plan">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
```

## 14. Related components

- [Collapsible](./collapsible.md): a single show/hide region.
- [Tabs](./tabs.md): switch between peer views instead of stacking them.
- [TreeView](./tree-view.md): expandable hierarchical data.
- [Typography](./typography.md): the `h2` section heading above an Accordion.

## 15. Common agent mistakes

_Filled from evals._

---
name: eluan
description: Build UI with the Eluan design system. Use whenever creating, editing or reviewing interface code in a project that depends on Eluan (@eluan/*), including pages, forms, layouts, theming, or picking which component to use.
---

# Eluan

{One or two lines: what Eluan is.}

Install: `{install command}`
Import: `import { Button } from "{importPath}"`

## Rules

These always apply.

1. Use tokens for every colour, space, radius, type and shadow value. Never write raw hex, px or rem values.
2. Use an existing Eluan component before building anything custom. Check the index below first.
3. Never override focus styles, contrast pairs or keyboard behaviour.
4. Read a component's file before using it for the first time in a task.
5. Read the matching foundation file before making any visual decision.
6. The theme is generated. Change the theme, never individual component colours.

## How to work

1. Find the task's intent in the decision tree.
2. Read the pattern file it points to, if any.
3. Read each component file you'll use.
4. Read foundations for any visual choice the components don't settle.
5. Build. Then check your output against each component's Rules and Don'ts.

## Decision tree

| If the task is to… | Read | Then use |
| --- | --- | --- |
| Collect input from the user | `patterns/forms.md` | input, select, checkbox, radio, switch, button |
| Tell the user something happened | `patterns/feedback.md` | toast, alert, banner |
| Ask the user to confirm | `components/dialog.md` | dialog, never a custom modal |
| Let the user move between views | `patterns/navigation.md` | tabs, nav, breadcrumb, link |
| Show a collection of items | `patterns/page-layout.md` | table for comparing, list for scanning, card for browsing |
| Show that there's nothing yet | `patterns/empty-states.md` | empty state |
| Change the look of the product | `foundations/theming.md` | the theme generator output |
{Add rows for every intent the inventory supports. Remove rows for components Eluan doesn't have.}

## Component index

<!-- index:start -->
| Component | Use when | Instead, use | File |
| --- | --- | --- | --- |
<!-- index:end -->

## Foundations

| File | Read before |
| --- | --- |
| `foundations/theming.md` | applying or switching a theme |
| `foundations/colour.md` | choosing any colour |
| `foundations/typography.md` | setting any text style |
| `foundations/spacing.md` | any margin, padding or gap |
| `foundations/radius.md` | any corner |
| `foundations/elevation.md` | any shadow or layering |
| `foundations/motion.md` | any transition or animation |
| `foundations/iconography.md` | adding an icon |

## When nothing fits

Compose from existing components and tokens. Add a code comment `// eluan: composed, no component for {intent}`. Never introduce a new colour, radius, shadow or font.

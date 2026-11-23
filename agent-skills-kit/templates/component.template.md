---
name: {ComponentName}
use_when: {one line, the main reason to reach for it}
instead_of: {one line, e.g. "Link for navigation; IconButton for icon-only actions"}
source: {path to component source}
---

# {ComponentName}

## 1. Overview

{What it is, in one or two sentences.}

## 2. When to use

- {Situation}

### When not to use

- {Situation} → use [{Alternative}](./{alternative}.md)

## 3. Anatomy

1. **{Part}**: {what it is, the name to use when referring to it}

## 4. Variants

| Variant | Use for |
| --- | --- |
| {primary} | {the single main action in a view} |

## 5. Sizes

| Size | Use in |
| --- | --- |
| {md} | {default} |

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Default | | |
| Hover | | |
| Focus | | Never remove or restyle the focus ring. |
| Active | | |
| Disabled | | |
| Loading | | |
| Error | | |

Remove states the component doesn't have.

## 7. Content guidelines

- {Length, casing, tone}

| Do | Don't |
| --- | --- |
| {Save changes} | {Click here} |

## 8. Rules

1. {Hard constraint, e.g. "One primary button per view."}

## 9. Dos and don'ts

**Do:** {guidance}

```tsx
{correct snippet}
```

**Don't:** {guidance}

```tsx
{incorrect snippet}
```

## 10. Accessibility

- Role: {role}
- Label: {how it gets an accessible name}
- Keyboard: {keys and what they do}
- Focus: {where focus goes, focus trapping, return focus}
- Contrast: handled by the theme. Don't override colours.

## 11. Behaviour

- Responsive: {}
- Overflow and truncation: {}
- Motion: {}

## 12. API

<!-- api:start -->
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
<!-- api:end -->

## 13. Examples

```tsx
import { {ComponentName} } from "{importPath}";

{complete, realistic usage}
```

## 14. Related components

- [{Related}](./{related}.md): {how it relates}

## 15. Common agent mistakes

_Filled from evals._

---
name: motion
---

# Motion

## Overview

Eluan has no duration or easing tokens yet. Components own their motion: state transitions (hover, press) and loading animations are built in, and some components open and close without any animation (Accordion and Collapsible content). App code shouldn't animate Eluan components, and new motion must respect `prefers-reduced-motion`.

## Rules

1. Don't add transitions or animations to Eluan components or around them. Their motion is built in.
2. If you must animate your own element, gate it on reduced motion: under `prefers-reduced-motion: reduce`, remove the movement or shorten it to near zero.
3. Never animate layout properties (width, height, top, left) on content. Animate opacity or transform.
4. Use Spinner or Skeleton for loading. Never build your own loading animation.
5. Never autoplay looping motion that the user can't pause. Carousel doesn't autoplay; keep it that way.

## Tokens

<!-- tokens:start -->
| Token | Value (default theme) | Use for |
| --- | --- | --- |
| _No tokens yet_ | | Follow the rules above |
<!-- tokens:end -->

<!-- REVIEW: token plan, not yet implemented.
Source: about 50 component transitions use 150ms with cubic-bezier(0.4, 0, 0.2, 1); 200ms and 300ms appear 3 times each; enter animations use cubic-bezier(0, 0, 0.2, 1) or ease-out; spinners use linear. Only 8 component files gate motion on prefers-reduced-motion. Proposed custom properties (names shown without the leading dashes):
  1. Add to tokens (a motion.css layer, :root):
     duration-fast: 150ms    (hover, press, colour changes)
     duration-base: 200ms    (small reveals, accordions)
     duration-slow: 300ms    (overlays, sheets, drawers)
     easing-standard: cubic-bezier(0.4, 0, 0.2, 1)
     easing-enter: cubic-bezier(0, 0, 0.2, 1)
     easing-exit: cubic-bezier(0.4, 0, 1, 1)
  2. In the same file, under @media (prefers-reduced-motion: reduce), set every duration-* to 0.01ms so every consumer of the tokens is gated at once.
  3. Replace the literals in components and drop their per-file reduced-motion blocks.
Then add the token table here and allow "use duration-* and easing-* tokens" for app-level motion.
-->

## Choosing a value

| If you need… | Use |
| --- | --- |
| loading feedback in place | Spinner |
| a loading placeholder for layout | Skeleton |
| content that opens and closes | Accordion or Collapsible (they don't animate; don't add one) |
| a panel that slides in | Sheet (overlay) or Drawer (pushes content) |
| your own reveal animation | opacity or transform only, gated on reduced motion |

## Dos and don'ts

**Do:** open and close content with the component, as it ships.

```tsx
<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost">Show details</Button>
  </CollapsibleTrigger>
  <CollapsibleContent>Order #4821 shipped on 12 March.</CollapsibleContent>
</Collapsible>
```

**Don't:** hand-roll a height animation.

```tsx
<div style={{ height: open ? 120 : 0, transition: "height 0.3s ease", overflow: "hidden" }}>
  Order #4821 shipped on 12 March.
</div>
```

## Common agent mistakes

_Filled from evals._

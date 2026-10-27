---
name: HoverCard
use_when: A pointer user rests on a link or mention and sees a read-only preview of what it points to, such as a profile card.
instead_of: Popover for anything interactive or essential; Tooltip for a short text hint; a page or Sheet for full details.
source: packages/core/src/components/hover-card.tsx
---

# HoverCard

## 1. Overview

HoverCard shows a floating preview when the pointer rests on its trigger, or when the trigger gets keyboard focus. It's built on Radix HoverCard and portals a 16rem panel next to the trigger. The preview is extra: it never opens on touch, and nothing inside it can be reached with the keyboard.

## 2. When to use

- A profile preview on a username or @mention: avatar, name, short bio, join date.
- A preview of a linked record (an issue, a document) next to its link.
- Supplementary context the user could also get by following the link.

### When not to use

- The content has buttons, links or fields → use [Popover](./popover.md).
- The information is essential, or needed on touch screens → show it inline, or use [Popover](./popover.md) on click.
- A one-line hint or label for a control → use [Tooltip](./tooltip.md).
- Full details → link to the page, or open a [Sheet](./sheet.md).

## 3. Anatomy

1. **HoverCard**: the root. Holds open state and the open and close delays.
2. **HoverCardTrigger**: the element that opens the card. Renders an `<a>` by default; give it an `href`, or use `asChild` around your own link.
3. **HoverCardContent**: the floating panel. Renders in a portal with `--container-bg`, a `--container-border` border, `--curves-md` corners, `--spacing-md` padding and `--container-fg` text, 16rem wide.
4. **Your content**: read-only preview content inside HoverCardContent.

## 4. Variants

No variants. The panel's look is fixed; compose its content with Avatar and Typography.

## 5. Sizes

No size prop. The panel is a fixed 16rem wide and as tall as its content. <!-- REVIEW: Decide before coding; hover-card is 16rem and popover 18rem, neither from a token, and nothing says why they differ. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Closed | Only the trigger renders | Trigger has `data-state="closed"`. |
| Open | Panel floats beside the trigger | Opens 700ms after the pointer enters, or at once on keyboard focus. Closes 300ms after the pointer leaves both trigger and card, or on blur. |
| Focus | The trigger's own focus style | Never remove or restyle the focus ring. |

## 7. Content guidelines

- Preview the destination: who or what it is, plus one or two facts. "Maya Chen, Design lead, Joined March 2024."
- Keep it short enough to read at a glance. No paragraphs.
- No buttons, links or fields; they can't be reached by keyboard.
- Sentence case.

| Do | Don't |
| --- | --- |
| Avatar, name, role, one meta line | A full profile with Follow and Message buttons |
| "Joined March 2024" | "Click here to see more about this user!" |

## 8. Rules

1. Make the trigger a real link to the full content (`href`, or `asChild` around your router's link), so the card is a shortcut, not the only route.
2. Never put the only copy of information or an action in a HoverCard. Touch users never see it, and keyboard users can't reach its contents.
3. Keep the content read-only. HoverCard sets `tabindex="-1"` on every focusable element inside it.
4. Use Avatar and Typography inside the card; don't hand-style text.
5. Never pass `className` or `style` to HoverCard parts; they're dropped. Lay out content with your own wrapper inside HoverCardContent.

## 9. Dos and don'ts

**Do:** put a read-only preview on a link.

```tsx
<HoverCard>
  <HoverCardTrigger href="/people/maya-chen">@maya</HoverCardTrigger>
  <HoverCardContent>
    <Typography variant="label" as="p">Maya Chen</Typography>
    <Typography variant="caption" tone="muted">Design lead · Joined March 2024</Typography>
  </HoverCardContent>
</HoverCard>
```

**Don't:** put actions in it.

```tsx
<HoverCardContent>
  <Typography variant="label" as="p">Maya Chen</Typography>
  <Button>Follow</Button>
  <Button variant="outline">Message</Button>
</HoverCardContent>
```

**Do:** use a Popover when the preview needs actions.

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button type="button" variant="link">@maya</Button>
  </PopoverTrigger>
  <PopoverContent aria-label="Maya Chen">{/* profile with Follow and Message */}</PopoverContent>
</Popover>
```

**Don't:** use a non-focusable trigger; keyboard users can't open the card.

```tsx
<HoverCardTrigger asChild>
  <span>@maya</span>
</HoverCardTrigger>
```

## 10. Accessibility

- Role: the panel has no role, and its contents can't be focused. Treat it as invisible to screen reader and keyboard users.
- Label: the trigger's own text names it; give links descriptive text.
- Keyboard: focusing the trigger opens the card and moving focus away closes it. Escape closes it.
- Focus: stays on the trigger. Nothing inside the card is in the tab order.
- Touch: touch input never opens the card.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per component. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->

## 11. Behaviour

- Placement: below the trigger and centred on it (`side="bottom"`, `align="center"`), 4px away, keeping 8px from the viewport edge. It flips and shifts to stay inside the viewport.
- Timing: `openDelay` 700ms and `closeDelay` 300ms by default. The pointer can move from the trigger onto the card without it closing.
- Overflow and truncation: no maximum height. Keep content short.
- Motion: appears and disappears without animation. Don't add your own.
- Portal: HoverCardContent mounts in `document.body`. In a scoped theme, pass `portalContainer` to the scoped EluanProvider or wrap the region in `PortalContainerProvider`; `container` overrides it for one card. See `../foundations/theming.md`.

## 12. API

<!-- api:start -->
### HoverCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | | Called on every open and close. |
| `openDelay` | `number` | `700` | Milliseconds of hover before it opens. |
| `closeDelay` | `number` | `300` | Milliseconds before it closes after the pointer leaves. |

### HoverCardTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child (your link) instead of a bare `<a>`. |
| `...props` | Radix `HoverCard.Trigger` props | | Anchor attributes: `href`, `aria-*`. |

### HoverCardContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side of the trigger. |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Alignment along that side. |
| `sideOffset` | `number` | `4` | Distance from the trigger in px. |
| `collisionPadding` | `number \| Partial<Record<Side, number>>` | `8` | Space to keep from the viewport edges. |
| `container` | `HTMLElement \| null` | nearest `PortalContainerProvider`, then `document.body` | Element to portal into. |
| `...props` | Radix `HoverCard.Content` props without `className`, `style` | | |
<!-- api:end -->

## 13. Examples

A comment author's name that previews their profile.

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Typography,
} from "@eluan/core";

type Person = { handle: string; name: string; role: string; joined: string; avatarUrl: string; initials: string };

export function CommentAuthor({ person }: { person: Person }) {
  return (
    <HoverCard>
      <HoverCardTrigger href={`/people/${person.handle}`}>{person.name}</HoverCardTrigger>
      <HoverCardContent align="start">
        <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
          <Avatar>
            <AvatarImage src={person.avatarUrl} alt="" />
            <AvatarFallback>{person.initials}</AvatarFallback>
          </Avatar>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" }}>
            <Typography variant="label" as="p">
              {person.name}
            </Typography>
            <Typography variant="caption" tone="muted">
              {person.role}
            </Typography>
            <Typography variant="caption" tone="muted">
              Joined {person.joined}
            </Typography>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## 14. Related components

- [Popover](./popover.md): the click-to-open panel for interactive content.
- [Tooltip](./tooltip.md): a short text hint.
- [Avatar](./avatar.md) and [Typography](./typography.md): the usual card content.

## 15. Common agent mistakes

_Filled from evals._

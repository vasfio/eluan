---
name: Avatar
use_when: Showing a person or account as a small circular image with initials as the fallback, optionally with a presence dot or notification count.
instead_of: Media or Image for content pictures; Badge for status without a person; a plain img for profile pictures.
source: packages/core/src/components/avatar.tsx
---

# Avatar

## 1. Overview

Avatar shows a person or account as a circle. It wraps Radix Avatar: the image shows once it loads, and the fallback (usually initials) shows until then or if it fails. Optional overlays add a notification badge (AvatarBadge) or a presence dot (AvatarStatus), positioned by the AvatarWithStatus wrapper.

## 2. When to use

- Next to a person's name in lists, tables, comments and headers.
- As the visible part of an account menu trigger.
- With AvatarStatus to show presence (online, busy, away, offline).
- With AvatarBadge to show unread notifications for that person or account.

### When not to use

- Content images, thumbnails or illustrations → use Image from [Media](./media.md) or [AspectRatio](./aspect-ratio.md).
- A status label with no person attached → use [Badge](./badge.md).
- A logo or icon for a thing, not a person or account → use a Lucide icon; see [iconography.md](../foundations/iconography.md). <!-- REVIEW: drafted; source doesn't say what Avatar shouldn't represent. -->

## 3. Anatomy

1. **Avatar**: the circular root (`--size-lg` square, `--radius-radius-full`, clips its content).
2. **AvatarImage**: the `<img>`. Shown only once it has loaded.
3. **AvatarFallback**: shown while the image loads or when it fails. Initials on `--container-bg-alt` in `--font-size-xs`, weight 500.
4. **AvatarWithStatus** (optional): an inline wrapper that positions overlays. Put Avatar, AvatarBadge and AvatarStatus inside it as siblings.
5. **AvatarBadge** (optional): a destructive [Badge](./badge.md) on a corner, centred on the rim. A dot with no `count`; the number (capped at `max`, shown as "99+") with one.
6. **AvatarStatus** (optional): a presence dot on a corner, ringed in the surface colour.

## 4. Variants

Avatar has no `variant` prop. AvatarStatus's `status` picks the dot colour:

| Status | Use for |
| --- | --- |
| `online` | The person is active now (`--positive-fg`). |
| `busy` | Active but not available (`--destructive-fg`). |
| `away` | Idle for a while (`--cautionary-bg-alt`). |
| `offline` | Not connected (`--container-bg-alt`). |

<!-- REVIEW: meanings drafted from the status names; source gives no definitions. -->

## 5. Sizes

Avatar has no size prop; it is always `--size-lg`, which scales with density. To change it, set `--size-lg` to another size token on a wrapper around that one Avatar only, for example `style={{ "--size-lg": "var(--size-2xl)" }}`. Nothing else should sit inside that wrapper. <!-- REVIEW: the Sizes story re-sets --size-lg on a wrapper with raw rem values; the token-to-token form and the "only the avatar" limit are drafted. Consider a size prop. -->

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Loading | AvatarFallback | Set `delayMs` on AvatarFallback to avoid a flash of initials on fast connections. |
| Loaded | The image, cropped to the circle | |
| Error | AvatarFallback | Always provide one; with no fallback the circle is empty. |
| Status: online, busy | Saturated green or red dot | |
| Status: away, offline | Pale yellow dot; offline is the same colour as the fallback surface | Offline is invisible on an initials avatar and away barely reads. Show presence in text as well (for example "Away" next to the name). <!-- REVIEW: W2 #8 (fix/invisible-states): status dots come from mixed token families; offline reuses --container-bg-alt, the fallback's own background. --> |
| Badge with count 0 | A dot | AvatarBadge only shows a number for `count` above 0; `count={0}` falls back to the dot. Don't render AvatarBadge when there's nothing unread. <!-- REVIEW: source behaviour, not in the fix plan; probably unintended. --> |

## 7. Content guidelines

- Use one or two initials in the fallback: "AM" for Alex Morgan. Use the person's own name order.
- Set `alt` on AvatarImage to the person's name, or `alt=""` when the name is already shown next to the avatar. <!-- REVIEW: alt guidance drafted; stories use the name as alt. -->
- Keep badge counts as numbers; let `max` cap them ("99+").

| Do | Don't |
| --- | --- |
| AM | ALEX |
| `alt="Alex Morgan"` | `alt="avatar"` |
| `alt=""` when the name is shown beside it | Repeating the name in `alt` next to a visible name |

## 8. Rules

1. Always include an AvatarFallback with initials, after AvatarImage.
2. Put AvatarBadge and AvatarStatus inside AvatarWithStatus, next to the Avatar, never inside it; Avatar clips its children.
3. Don't render AvatarBadge for a zero count.
4. Don't rely on the status dot alone to convey presence; say it in text nearby.
5. Don't build a ring, border or shadow around an avatar yourself.
6. Make an avatar interactive only by wrapping it in a Button (`asChild` triggers included) with an `aria-label`; Avatar itself isn't focusable. AvatarWithStatus renders a `<div>`, so put it around the Button, not inside it. <!-- REVIEW: drafted, including the account menu example; no source shows an interactive avatar. -->
7. Never pass `className` or `style` to any Avatar part; they're dropped.

## 9. Dos and don'ts

**Do:** pair the image with initials.

```tsx
<Avatar>
  <AvatarImage src="/people/alex-morgan.jpg" alt="Alex Morgan" />
  <AvatarFallback>AM</AvatarFallback>
</Avatar>
```

**Don't:** leave the fallback out or use a bare img.

```tsx
<img src="/people/alex-morgan.jpg" style={{ width: 36, borderRadius: "50%" }} />
```

**Do:** put overlays beside the Avatar, inside AvatarWithStatus.

```tsx
<AvatarWithStatus>
  <Avatar>
    <AvatarFallback>SC</AvatarFallback>
  </Avatar>
  <AvatarStatus status="online" />
</AvatarWithStatus>
```

**Don't:** put overlays inside Avatar, where they're clipped.

```tsx
<Avatar>
  <AvatarFallback>SC</AvatarFallback>
  <AvatarStatus status="online" />
</Avatar>
```

## 10. Accessibility

- Role: Avatar is a plain `<span>`; AvatarImage is an `<img>`.
- Label: the image's `alt`, or the fallback text when the image isn't shown. AvatarStatus sets `aria-label` to the raw status ("online") on a span with no role, which most screen readers ignore; AvatarBadge has no label at all. Put presence and counts in the accessible name of the surrounding control or in visible text, for example `aria-label="Alex Morgan, 3 unread notifications"` on the trigger Button. <!-- REVIEW: not in the fix plan; aria-label on a generic span isn't reliably announced, and AvatarStatus accepts no other props. Label guidance drafted. -->
- Keyboard: none. Avatar isn't focusable; a wrapping Button provides focus and activation.
- Focus: the wrapping Button's outline.
- Contrast: handled by the theme. Don't override colours. See the status note in States.

## 11. Behaviour

- Responsive: fixed size; doesn't stretch or shrink in flex rows (`flex-shrink: 0`).
- Overflow and truncation: the image is cropped to a circle. Fallback text doesn't scale, so keep it to two characters.
- Image loading: the image swaps in once loaded. Use `onLoadingStatusChange` on AvatarImage if you need to react to failures.
- Groups: Eluan has no AvatarGroup. Show several avatars in a row with a `--spacing-xs` gap rather than overlapping them, since an overlap needs a ring the system has no token for. <!-- REVIEW: the Group story overlaps avatars with a hand-written box-shadow ring and negative margin; spacing advice drafted. -->
- Motion: none.

## 12. API

<!-- api:start -->
### Avatar

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | Radix `Avatar.Root` props (`HTMLAttributes<HTMLSpanElement>`) without `className`, `style` | | Renders the circular `<span>`. |

### AvatarImage

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | | Image URL. |
| `alt` | `string` | | The person's name, or `""` when it's shown beside the avatar. |
| `onLoadingStatusChange` | `(status: "idle" \| "loading" \| "loaded" \| "error") => void` | | Called as the image loads or fails. |
| `...props` | Radix `Avatar.Image` props without `className`, `style` | | Native img attributes. |

### AvatarFallback

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | | Initials. |
| `delayMs` | `number` | | Waits this long before showing, to avoid a flash while the image loads. |
| `...props` | Radix `Avatar.Fallback` props without `className`, `style` | | |

### AvatarWithStatus

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | The positioning wrapper for Avatar plus overlays. |

### AvatarBadge

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | | Shows the number. Omitted or 0 shows a dot. |
| `max` | `number` | `99` | Counts above this show as `"{max}+"`. |
| `position` | `"top-right" \| "bottom-right" \| "top-left" \| "bottom-left"` | `"top-right"` | Corner the badge sits on. |
| `...props` | `HTMLAttributes<HTMLSpanElement>` without `className`, `style` | | Applied to the positioning span. |

### AvatarStatus

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `status` | `"online" \| "offline" \| "busy" \| "away"` | | Required. Dot colour; also set as its `aria-label`. |
| `position` | `"top-right" \| "bottom-right" \| "top-left" \| "bottom-left"` | `"bottom-right"` | Corner the dot sits on. Accepts no other props and no ref. |
<!-- api:end -->

## 13. Examples

A team list with presence, and an account menu trigger with an unread count.

```tsx
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
  AvatarStatus,
  AvatarWithStatus,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Typography,
} from "@eluan/core";

const team = [
  { id: "1", name: "Alex Morgan", initials: "AM", role: "Design lead", photo: "/people/alex-morgan.jpg", status: "online" as const, statusLabel: "Online" },
  { id: "2", name: "Sarah Chen", initials: "SC", role: "Engineer", photo: "/people/sarah-chen.jpg", status: "away" as const, statusLabel: "Away" },
  { id: "3", name: "Marcus Lee", initials: "ML", role: "Product manager", photo: undefined, status: "offline" as const, statusLabel: "Offline" },
];

export function TeamList() {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      {team.map((person) => (
        <li key={person.id} style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
          <AvatarWithStatus>
            <Avatar>
              {person.photo && <AvatarImage src={person.photo} alt="" />}
              <AvatarFallback delayMs={300}>{person.initials}</AvatarFallback>
            </Avatar>
            <AvatarStatus status={person.status} />
          </AvatarWithStatus>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="label">{person.name}</Typography>
            <Typography variant="caption" tone="muted">
              {person.role} · {person.statusLabel}
            </Typography>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AccountMenu({ unread }: { unread: number }) {
  return (
    <DropdownMenu>
      {/* AvatarWithStatus renders a div, so it wraps the Button rather than sitting inside it. */}
      <AvatarWithStatus>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="iconInline"
            shape="round"
            aria-label={unread > 0 ? `Account menu, ${unread} unread notifications` : "Account menu"}
          >
            <Avatar>
              <AvatarImage src="/people/alex-morgan.jpg" alt="" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        {unread > 0 && <AvatarBadge count={unread} aria-hidden="true" />}
      </AvatarWithStatus>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Notifications</DropdownMenuItem>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```


## 14. Related components

- [Badge](./badge.md): AvatarBadge renders a destructive Badge; use Badge alone for status without a person.
- [DropdownMenu](./dropdown-menu.md): an account menu behind an avatar trigger.
- [Button](./button.md): makes an avatar focusable and clickable.
- [Media](./media.md): content images rather than people.
- [Table](./table.md): avatars beside names in a user list.

## 15. Common agent mistakes

_Filled from evals._

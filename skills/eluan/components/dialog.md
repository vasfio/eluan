---
name: Dialog
use_when: The user must confirm or finish one short task before going back to the page, including destructive confirmations.
instead_of: Sheet for long or form-heavy secondary content; Popover for a small non-blocking panel; Toast or Banner to report an outcome; never window.confirm or a custom modal.
source: packages/core/src/components/dialog.tsx
---

# Dialog

## 1. Overview

Dialog is a modal window built on Radix Dialog. `DialogContent` portals a centred panel and a scrim over the page, traps focus inside, and returns focus to the trigger when it closes. Eluan has no AlertDialog: a confirmation, destructive or not, is a Dialog with the right Button in its footer.

## 2. When to use

- Confirming a destructive or irreversible action: delete a project, remove a teammate, revoke a key.
- A short, focused task the user must finish or cancel before continuing: rename, invite one person.
- Warning about unsaved changes before the user leaves.
- A command palette, through [Command](./command.md)'s `CommandDialog` (which renders `DialogContent layout="command"` for you).

### When not to use

- Long forms, record details or filters that need room → use [Sheet](./sheet.md).
- A side panel the user keeps open while working → use [Drawer](./drawer.md).
- A small panel anchored to a control that doesn't block the page → use [Popover](./popover.md).
- Telling the user something happened → use [Toast](./toast.md) for a transient confirmation, [Banner](./banner.md) for a persistent message. See `../patterns/feedback.md`.
- Offering a list of actions → use [DropdownMenu](./dropdown-menu.md) or [ActionPopover](./action-popover.md).
- Revealing more content in the page flow → use [Collapsible](./collapsible.md) or [Accordion](./accordion.md).

### Choosing a confirmation pattern

| Situation | Use |
| --- | --- |
| Destructive or irreversible: delete, remove, revoke | Dialog. Title asks the question, description states the consequence, footer has Cancel and a `destructive` Button that repeats the verb. |
| Consequential but reversible: publish, send to 40 people | Dialog with a `default` (primary) confirm Button. |
| Low risk and easy to undo: archive, remove from a list | No Dialog. Run the action, then show a [Toast](./toast.md) with an Undo action. |
| Leaving with unsaved changes | Dialog: "Discard changes?" with Keep editing and a `destructive` Discard. |

<!-- REVIEW: the situation-to-pattern mapping is drafted; source only shows the destructive confirmation (dialog stories, docs SimpleDialogDemo). The Toast undo row assumes Sonner's action button, which toast.tsx styles but doesn't document. -->

## 3. Anatomy

1. **Dialog**: the root. Holds open state; renders nothing itself.
2. **DialogTrigger**: the control that opens the dialog. Wrap a Button with `asChild`. Focus returns here on close.
3. **DialogContent**: the panel. Renders the portal, the overlay (scrim in `--overlay-bg` at 80% opacity) and the panel (`--container-bg`, `--container-border`, `--curves-lg` corners, `--spacing-lg` padding, `--spacing-md` gap between children). Adds a close button (X icon, "Close" for screen readers) in the top-right corner, after your content in the DOM.
4. **DialogHeader**: a column holding the title and description, `--spacing-xs` apart.
5. **DialogTitle**: required. Renders an `h2` and names the dialog.
6. **DialogDescription**: a `p` in `--font-size-sm` that describes the dialog to screen readers.
7. **Body** (optional): your own content between header and footer.
8. **DialogFooter**: the button row.
9. **DialogClose**: closes the dialog. Wrap the Cancel Button with `asChild`.
10. **DialogOverlay**, **DialogPortal**: exported, but DialogContent already renders both. Don't add them yourself.

## 4. Variants

No `variant` prop. `layout` on DialogContent changes the panel:

| Layout | Use for |
| --- | --- |
| `default` | Every confirmation and task dialog. |
| `command` | Command palettes only: removes the padding and the close button. Use [Command](./command.md)'s `CommandDialog` rather than setting this yourself. |

## 5. Sizes

No size prop. The panel is the full viewport width minus `--spacing-2xl`, up to 32rem. If the content needs more room, use [Sheet](./sheet.md).

## 6. States

| State | Looks like | Notes |
| --- | --- | --- |
| Closed | Only the trigger renders | DialogContent is unmounted. |
| Open | Scrim over the page, panel centred | The page behind is inert: hidden from screen readers, not clickable, not scrollable. |
| Hover (close button) | Close icon goes from 70% to full opacity | No background change. <!-- REVIEW: W3; dialog.tsx puts a [data-state=open] rule on the close button, which Radix's Close never carries, so it never applies. --> |
| Focus (close button) | 1px outline in `--interactive-border`, 1px offset | Never remove or restyle the focus ring. |

The title declares no colour of its own and inherits; Sheet and Drawer titles each use a different token. It looks the same in the default theme; don't recolour titles to compensate. <!-- REVIEW: W5, three title colours for one slot across dialog, sheet and drawer. -->

## 7. Content guidelines

- Title: ask the question, naming the action and the object: "Delete Q3 roadmap?", "Remove Maya Chen from Acme?".
- Description: say what happens and whether it can be undone, in one or two sentences. Include what else is lost: "This deletes 14 environments and all deploy history."
- Confirm button: repeat the title's verb and object: "Delete project", not "OK" or "Yes".
- Dismiss button: "Cancel". For unsaved changes, "Keep editing".
- Sentence case everywhere. No exclamation marks.

| Do | Don't |
| --- | --- |
| Delete Q3 roadmap? | Are you sure? |
| This permanently deletes the roadmap and its 12 milestones. You can't undo this. | This action cannot be undone. |
| Delete roadmap | OK |
| Cancel | No |

## 8. Rules

1. Always render a DialogTitle. Radix logs an error without one.
2. Render a DialogDescription, or pass `aria-describedby={undefined}` to DialogContent when there's nothing to describe. Radix warns otherwise.
3. Open the dialog from a `DialogTrigger asChild` wrapping a Button. That's what returns focus on close.
4. When there's no DialogTrigger (a controlled dialog opened from a menu item or a keyboard shortcut), pass `onCloseAutoFocus` to DialogContent, call `event.preventDefault()`, and focus the control that opened it. <!-- REVIEW: pattern drafted from Radix behaviour; with no DialogTrigger, Radix's return-focus target is empty and focus falls to the body. -->
5. For a destructive confirmation, put Cancel (`DialogClose asChild` around an `outline` Button) first and the `destructive` Button last in DialogFooter. When the body has no fields, Cancel then receives focus as the dialog opens.
6. Use one `destructive` or `default` Button per dialog: the confirm action.
7. Always include a visible Cancel or Close Button in the footer. Don't rely on the built-in X alone.
8. Never build a modal from a `div`, and never use `window.confirm`.
9. Never pass `className` or `style` to any Dialog part; they're dropped. Lay out the body with your own wrapper element.

## 9. Dos and don'ts

**Do:** confirm a destructive action with a specific title and a matching button.

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button type="button" variant="dangerGhost">Delete roadmap</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Q3 roadmap?</DialogTitle>
      <DialogDescription>This permanently deletes the roadmap and its 12 milestones.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="outline">Cancel</Button>
      </DialogClose>
      <Button type="button" variant="destructive" onClick={deleteRoadmap}>Delete roadmap</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Don't:** use a browser confirm or a vague, generic dialog.

```tsx
<Button onClick={() => window.confirm("Are you sure?") && deleteRoadmap()}>Delete</Button>

<DialogContent>
  <DialogTitle>Are you sure?</DialogTitle>
  <DialogFooter>
    <Button>OK</Button>
  </DialogFooter>
</DialogContent>
```

**Do:** return focus yourself when a menu item opens the dialog.

```tsx
const menuTriggerRef = React.useRef<HTMLButtonElement>(null);

<DialogContent
  onCloseAutoFocus={(event) => {
    event.preventDefault();
    menuTriggerRef.current?.focus();
  }}
>
  {/* … */}
</DialogContent>
```

**Don't:** open a dialog from a bare `onClick` with no DialogTrigger and no `onCloseAutoFocus`. Focus is lost when it closes.

```tsx
<Button onClick={() => setOpen(true)}>Delete roadmap</Button>
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>{/* … */}</DialogContent>
</Dialog>
```

## 10. Accessibility

- Role: `dialog` on DialogContent. DialogTrigger gets `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`.
- Label: DialogTitle names the dialog (`aria-labelledby`); DialogDescription describes it (`aria-describedby`). The close button's name is "Close".
- Keyboard: Escape closes. Tab and Shift+Tab cycle through the dialog's controls and wrap at the ends. Enter and Space activate buttons.
- Focus: on open, focus moves to the first focusable element in your content (links are skipped). The close button comes last in the DOM, so it's only focused first when your content has no controls. Focus is trapped while open and returns to DialogTrigger on close. Everything outside the dialog is hidden from assistive technology and blocked from pointer input.
- Contrast: handled by the theme. Don't override colours. The focus outline token currently measures below 3:1; don't patch it per dialog. <!-- REVIEW: system-wide focus-ring contrast issue (W1), see foundations/colour.md. -->
- The built-in close button is a `--size-xxs` icon with no padding, a small pointer target. Rule 7's footer button is the reliable way to dismiss. <!-- REVIEW: W3, dialog close button hit target. -->

## 11. Behaviour

- Responsive: below 640px the header centres its text and the footer stacks its buttons full width with the last button (the confirm action) on top; from 640px the header aligns left and the footer is a right-aligned row.
- Overflow and truncation: the panel has no maximum height and doesn't scroll. Keep dialog content short; move anything long to a [Sheet](./sheet.md). <!-- REVIEW: dialog.tsx sets no max-height or overflow; long content runs off-screen. Not in the fix plan. -->
- Motion: the dialog appears and disappears without animation. Don't add your own.
- Dismissal: Escape, a click on the scrim, the close button or a DialogClose all close it and fire `onOpenChange(false)`. To keep it open while a request runs, ignore `onOpenChange` in that window (see the example).
- Portal: DialogContent mounts in `document.body`. In a scoped theme, pass `portalContainer` to the scoped EluanProvider or wrap the region in `PortalContainerProvider` so the dialog inherits the scope's tokens; `container` overrides it for one dialog. See `../foundations/theming.md`.

## 12. API

<!-- api:start -->
### Dialog

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Initial state when uncontrolled. |
| `onOpenChange` | `(open: boolean) => void` | | Called on every open and close. |
| `modal` | `boolean` | `true` | `false` removes the overlay, focus trap, scroll lock and page hiding. Keep `true`. |

### DialogTrigger, DialogClose

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child (a Button) instead of a bare `<button type="button">`. |
| `...props` | Radix `Dialog.Trigger` / `Dialog.Close` props | | Native button attributes. |

### DialogContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `layout` | `"default" \| "command"` | `"default"` | `"command"` removes padding and the close button, for CommandDialog. |
| `container` | `HTMLElement \| null` | nearest `PortalContainerProvider`, then `document.body` | Element to portal into. |
| `onOpenAutoFocus` | `(event: Event) => void` | | Runs as focus moves in. `preventDefault()` and focus another element to change the target. |
| `onCloseAutoFocus` | `(event: Event) => void` | | Runs as focus returns. `preventDefault()` and focus the opener when there's no DialogTrigger. |
| `onEscapeKeyDown` | `(event: KeyboardEvent) => void` | | `preventDefault()` keeps the dialog open. |
| `onPointerDownOutside` | `(event: CustomEvent) => void` | | `preventDefault()` keeps the dialog open on a scrim click. |
| `aria-describedby` | `string \| undefined` | DialogDescription's id | Pass `undefined` when there's no description. |
| `forceMount` | `true` | | Keeps the content mounted while closed. |
| `...props` | Radix `Dialog.Content` props without `className`, `style` | | |

### DialogHeader, DialogFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `...props` | `HTMLAttributes<HTMLDivElement>` without `className`, `style` | | Layout wrappers. |

### DialogTitle, DialogDescription

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Renders the child element instead of the `h2` / `p`. |
| `...props` | Radix `Dialog.Title` / `Dialog.Description` props without `className`, `style` | | |

### DialogOverlay, DialogPortal

Rendered by DialogContent. Radix `Dialog.Overlay` (without `className`, `style`) and `Dialog.Portal` props.
<!-- api:end -->

## 13. Examples

A destructive confirmation that stays open while the delete runs and returns focus to its trigger.

```tsx
import * as React from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@eluan/core";
import { Trash2 } from "lucide-react";

export function DeleteProjectDialog({
  projectName,
  environmentCount,
  onDelete,
}: {
  projectName: string;
  environmentCount: number;
  onDelete: () => Promise<void>;
}) {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDelete();
      setOpen(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !deleting && setOpen(next)}>
      <DialogTrigger asChild>
        <Button type="button" variant="dangerGhost">
          <Trash2 aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
          Delete project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {projectName}?</DialogTitle>
          <DialogDescription>
            This permanently deletes the project, its {environmentCount} environments and all deploy
            history. You can't undo this.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={deleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
            aria-busy={deleting}
          >
            Delete project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## 14. Related components

- [Button](./button.md): the trigger and the footer actions; `destructive` for the confirm action.
- [Sheet](./sheet.md): a modal panel from the screen edge for longer content.
- [Command](./command.md): `CommandDialog` builds a command palette on Dialog.
- [ActionPopover](./action-popover.md) and [DropdownMenu](./dropdown-menu.md): row actions that often open a confirmation Dialog.
- [Toast](./toast.md): confirm that the action finished.

## 15. Common agent mistakes

_Filled from evals._

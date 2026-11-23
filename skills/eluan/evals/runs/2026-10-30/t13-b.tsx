import { Button, DrawerClose } from "@eluan/core";
import { X } from "lucide-react";

type SidePanelCloseButtonProps = {
  /**
   * Accessible name for the button. Name the panel when more than one can be
   * open, for example "Close filters".
   */
  label?: string;
};

/**
 * Icon-only button that closes an Eluan Drawer (the inline side panel).
 *
 * Render it inside DrawerContent, typically at the top beside the DrawerHeader.
 * DrawerClose updates the Drawer's open state (so a controlled Drawer's
 * onOpenChange fires) and Drawer returns focus to where it was before the
 * panel opened.
 *
 * Sheet already renders its own close button, so don't add this to a Sheet.
 */
export default function SidePanelCloseButton({ label = "Close panel" }: SidePanelCloseButtonProps) {
  return (
    <DrawerClose asChild>
      <Button type="button" variant="ghost" size="icon" aria-label={label}>
        <X aria-hidden="true" style={{ width: "var(--size-xxs)", height: "var(--size-xxs)" }} />
      </Button>
    </DrawerClose>
  );
}

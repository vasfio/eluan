import { Button } from "@eluan/core";
import { X } from "lucide-react";

export interface ClosePanelButtonProps {
  /** Called when the button is pressed. Wire it to the panel's open state. */
  onClose: () => void;
  /**
   * Accessible name for the button. Name the panel when more than one can be
   * open at a time, e.g. "Close filters".
   */
  label?: string;
}

/**
 * Icon-only close button for a side panel.
 *
 * Works with any panel whose open state you own, including a controlled
 * Sheet or Drawer:
 *
 *   <Sheet open={open} onOpenChange={setOpen}>
 *     <SheetContent side="right">
 *       <ClosePanelButton onClose={() => setOpen(false)} label="Close details" />
 *       ...
 *     </SheetContent>
 *   </Sheet>
 *
 * Eluan's Button doesn't take className or style, so to position the button
 * (e.g. at the end of a panel header), wrap it in a layout element.
 */
export default function ClosePanelButton({
  onClose,
  label = "Close panel",
}: ClosePanelButtonProps) {
  return (
    <Button
      // Explicit so the button never submits a form the panel contains.
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={onClose}
    >
      <X size={16} aria-hidden />
    </Button>
  );
}

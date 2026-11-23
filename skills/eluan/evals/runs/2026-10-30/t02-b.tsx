import * as React from "react";
import {
  Banner,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from "@eluan/core";
import { CircleAlert, Trash2 } from "lucide-react";

const iconStyle: React.CSSProperties = {
  width: "var(--size-xxs)",
  height: "var(--size-xxs)",
};

export interface DeleteProjectActionProps {
  /** Name shown in the confirmation title, so the user knows exactly what they're deleting. */
  projectName: string;
  /**
   * Deletes the project. Resolve to close the dialog; reject to keep it open and
   * show an error so the user can retry or cancel. Navigation or list updates after
   * a successful delete are the caller's responsibility.
   */
  onDelete: () => Promise<void>;
}

/**
 * "Delete project" button that asks for confirmation in a Dialog before deleting.
 * The dialog stays open while the delete runs and reports a failure inline.
 */
export default function DeleteProjectAction({ projectName, onDelete }: DeleteProjectActionProps) {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  function handleOpenChange(next: boolean) {
    // Ignore Escape, scrim clicks and Cancel while the request is in flight.
    if (deleting) return;
    setOpen(next);
    if (next) setFailed(false);
  }

  async function handleDelete() {
    setFailed(false);
    setDeleting(true);
    try {
      await onDelete();
      setOpen(false);
    } catch {
      setFailed(true);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="dangerGhost">
          <Trash2 aria-hidden="true" style={iconStyle} />
          Delete project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {projectName}?</DialogTitle>
          <DialogDescription>
            This permanently deletes the project and all of its data. You can't undo this.
          </DialogDescription>
        </DialogHeader>
        {failed && (
          <Banner
            variant="destructive"
            position="inline"
            role="alert"
            icon={<CircleAlert aria-hidden="true" style={iconStyle} />}
          >
            We couldn't delete {projectName}. Check your connection and try again.
          </Banner>
        )}
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
            {deleting && <Spinner size="sm" aria-hidden="true" />}
            {deleting ? "Deleting…" : "Delete project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

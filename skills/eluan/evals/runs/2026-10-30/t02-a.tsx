import * as React from "react";
import {
  Banner,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from "@eluan/core";
import { Trash2 } from "lucide-react";

export interface DeleteProjectActionProps {
  /** Named in the confirmation copy so the user knows exactly what goes. */
  projectName: string;
  /**
   * Performs the deletion. Resolve once the project is gone; throw or reject
   * to keep the dialog open and show an error. Log or report the failure
   * inside this callback — the dialog only shows a generic message.
   */
  onDelete: () => void | Promise<void>;
}

const DELETE_FAILED_MESSAGE =
  "Couldn't delete the project. Check your connection and try again.";

export default function DeleteProjectAction({
  projectName,
  onDelete,
}: DeleteProjectActionProps) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    // While the request is in flight, ignore Escape, outside clicks and the
    // close button so the dialog can't hide an unfinished delete.
    if (isDeleting) return;
    setError(null);
    setOpen(nextOpen);
  };

  const handleConfirm = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await onDelete();
      setOpen(false);
    } catch {
      setError(DELETE_FAILED_MESSAGE);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="dangerGhost">
          <Trash2 size={16} aria-hidden="true" />
          Delete project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {projectName}?</DialogTitle>
          <DialogDescription>
            This permanently deletes <strong>{projectName}</strong> and
            everything in it. This can&apos;t be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Banner variant="destructive" role="alert">
            {error}
          </Banner>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => void handleConfirm()}
            disabled={isDeleting}
          >
            {isDeleting && (
              <span aria-hidden="true">
                <Spinner size="sm" />
              </span>
            )}
            {isDeleting ? "Deleting…" : "Delete project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

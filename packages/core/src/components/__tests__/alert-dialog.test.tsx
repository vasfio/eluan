import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../alert-dialog";

describe("AlertDialog", () => {
  const TestAlertDialog = ({ onConfirm }: { onConfirm?: () => void }) => (
    <AlertDialog>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );

  it("renders trigger", () => {
    render(<TestAlertDialog />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("shows dialog on trigger click", async () => {
    render(<TestAlertDialog />);
    await userEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
  });

  it("calls onConfirm on action click", async () => {
    const onConfirm = vi.fn();
    render(<TestAlertDialog onConfirm={onConfirm} />);
    await userEvent.click(screen.getByText("Delete"));
    await userEvent.click(screen.getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalled();
  });
});

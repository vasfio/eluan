import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../dialog";

const TestDialog = () => (
  <Dialog>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogDescription>Are you sure you want to continue?</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <button>Cancel</button>
        <button>Confirm</button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

describe("Dialog", () => {
  it("renders the trigger", () => {
    render(<TestDialog />);
    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("dialog content is not visible by default", () => {
    render(<TestDialog />);
    expect(screen.queryByText("Confirm Action")).not.toBeInTheDocument();
  });

  it("shows dialog content when trigger is clicked", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Open Dialog"));
    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to continue?")).toBeInTheDocument();
  });

  it("closes dialog when close button is pressed (Escape)", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Open Dialog"));
    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByText("Confirm Action")).not.toBeInTheDocument();
  });
});

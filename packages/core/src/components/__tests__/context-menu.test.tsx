import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "../context-menu";

describe("ContextMenu", () => {
  const TestMenu = ({ onSelect }: { onSelect?: () => void }) => (
    <ContextMenu>
      <ContextMenuTrigger>Right-click me</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={onSelect}>Open</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );

  it("renders trigger", () => {
    render(<TestMenu />);
    expect(screen.getByText("Right-click me")).toBeInTheDocument();
  });

  it("shows context menu on right-click", async () => {
    render(<TestMenu />);
    await userEvent.pointer({ target: screen.getByText("Right-click me"), keys: "[MouseRight]" });
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("calls onSelect when item clicked", async () => {
    const onSelect = vi.fn();
    render(<TestMenu onSelect={onSelect} />);
    await userEvent.pointer({ target: screen.getByText("Right-click me"), keys: "[MouseRight]" });
    await userEvent.click(screen.getByText("Open"));
    expect(onSelect).toHaveBeenCalled();
  });
});

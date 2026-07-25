import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ActionPopover } from "../action-popover";

const items = [
  { label: "Edit", onClick: vi.fn() },
  { label: "Duplicate" },
  { label: "Delete", destructive: true },
  { label: "Archive", disabled: true },
];

describe("ActionPopover", () => {
  it("renders a labelled trigger button", () => {
    render(<ActionPopover items={items} />);
    expect(
      screen.getByRole("button", { name: "Open actions menu" })
    ).toBeInTheDocument();
  });

  it("honours a custom aria-label", () => {
    render(<ActionPopover items={items} aria-label="Row actions" />);
    expect(
      screen.getByRole("button", { name: "Row actions" })
    ).toBeInTheDocument();
  });

  it("keeps items hidden until the trigger is clicked", () => {
    render(<ActionPopover items={items} />);
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("opens the menu and exposes items as menuitems", async () => {
    render(<ActionPopover items={items} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Open actions menu" })
    );
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument();
  });

  it("fires an item's onClick when selected", async () => {
    const onClick = vi.fn();
    render(<ActionPopover items={[{ label: "Rename", onClick }]} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Open actions menu" })
    );
    await userEvent.click(screen.getByRole("menuitem", { name: "Rename" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("marks a disabled item as disabled", async () => {
    render(<ActionPopover items={items} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Open actions menu" })
    );
    expect(screen.getByText("Archive")).toHaveAttribute("data-disabled");
  });
});

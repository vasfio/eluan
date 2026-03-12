import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../dropdown-menu";

const TestMenu = ({ onSelect }: { onSelect?: () => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>Options</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={onSelect}>Profile</DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem disabled>Disabled Item</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

describe("DropdownMenu", () => {
  it("renders trigger", () => {
    render(<TestMenu />);
    expect(screen.getByText("Options")).toBeInTheDocument();
  });

  it("menu hidden by default", () => {
    render(<TestMenu />);
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    render(<TestMenu />);
    await userEvent.click(screen.getByText("Options"));
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("calls onSelect when item clicked", async () => {
    const onSelect = vi.fn();
    render(<TestMenu onSelect={onSelect} />);
    await userEvent.click(screen.getByText("Options"));
    await userEvent.click(screen.getByText("Profile"));
    expect(onSelect).toHaveBeenCalled();
  });

  it("disabled item cannot be clicked", async () => {
    render(<TestMenu />);
    await userEvent.click(screen.getByText("Options"));
    expect(screen.getByText("Disabled Item")).toHaveAttribute("data-disabled");
  });
});

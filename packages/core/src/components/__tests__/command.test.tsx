import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../command";

const Palette = () => (
  <Command>
    <CommandInput placeholder="Type a command..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>Profile</CommandItem>
        <CommandItem>Settings</CommandItem>
        <CommandItem>Billing</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

describe("Command", () => {
  it("renders the search input and options", () => {
    render(<Palette />);
    expect(
      screen.getByPlaceholderText("Type a command...")
    ).toBeInTheDocument();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("filters options as the query changes", async () => {
    render(<Palette />);
    await userEvent.type(
      screen.getByPlaceholderText("Type a command..."),
      "sett"
    );
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("shows the empty state when nothing matches", async () => {
    render(<Palette />);
    await userEvent.type(
      screen.getByPlaceholderText("Type a command..."),
      "zzzz"
    );
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });
});

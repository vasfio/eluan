import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Popover, PopoverTrigger, PopoverContent } from "../popover";

describe("Popover", () => {
  const TestPopover = () => (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Popover content</PopoverContent>
    </Popover>
  );

  it("renders trigger", () => {
    render(<TestPopover />);
    expect(screen.getByText("Open")).toBeInTheDocument();
  });

  it("content hidden by default", () => {
    render(<TestPopover />);
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("shows content on trigger click", async () => {
    render(<TestPopover />);
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("closes on second click", async () => {
    render(<TestPopover />);
    await userEvent.click(screen.getByText("Open"));
    await userEvent.click(screen.getByText("Open"));
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });
});

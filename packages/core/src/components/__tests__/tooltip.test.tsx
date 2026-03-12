import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "../tooltip";

const TestTooltip = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>Helpful tooltip</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

describe("Tooltip", () => {
  it("renders the trigger", () => {
    render(<TestTooltip />);
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    render(<TestTooltip />);
    await userEvent.hover(screen.getByText("Hover me"));
    expect(await screen.findByText("Helpful tooltip")).toBeInTheDocument();
  });

  it("hides tooltip after unhover", async () => {
    render(<TestTooltip />);
    await userEvent.hover(screen.getByText("Hover me"));
    await userEvent.unhover(screen.getByText("Hover me"));
    expect(screen.queryByText("Helpful tooltip")).not.toBeInTheDocument();
  });
});

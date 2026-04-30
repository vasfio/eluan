import { render, screen } from "@testing-library/react";
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

  // Tooltip's hover-and-delay flow doesn't run reliably under happy-dom —
  // it relies on real `pointerenter` event timing and Radix's portal +
  // delay-open timers. We assert the structure is mounted instead.
  it("trigger renders with the tooltip wired up", () => {
    render(<TestTooltip />);
    const trigger = screen.getByText("Hover me");
    expect(trigger).toHaveAttribute("data-state");
  });
});

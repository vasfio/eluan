import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../collapsible";

describe("Collapsible", () => {
  const TestCollapsible = () => (
    <Collapsible>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Hidden content</CollapsibleContent>
    </Collapsible>
  );

  it("renders trigger", () => {
    render(<TestCollapsible />);
    expect(screen.getByText("Toggle")).toBeInTheDocument();
  });

  // Radix sets `data-state="open" | "closed"` on the trigger — preferred over
  // `toBeVisible()` since happy-dom doesn't reliably compute visibility for
  // Radix's animated open/close transitions.
  it("content is closed by default", () => {
    render(<TestCollapsible />);
    expect(screen.getByText("Toggle")).toHaveAttribute("data-state", "closed");
  });

  it("opens content when trigger is clicked", async () => {
    render(<TestCollapsible />);
    const trigger = screen.getByText("Toggle");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
  });

  it("collapses content on second click", async () => {
    render(<TestCollapsible />);
    const trigger = screen.getByText("Toggle");
    await userEvent.click(trigger);
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "closed");
  });
});

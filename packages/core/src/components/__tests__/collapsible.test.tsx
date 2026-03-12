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

  it("content is hidden by default", () => {
    render(<TestCollapsible />);
    expect(screen.queryByText("Hidden content")).not.toBeVisible();
  });

  it("shows content when trigger is clicked", async () => {
    render(<TestCollapsible />);
    await userEvent.click(screen.getByText("Toggle"));
    expect(screen.getByText("Hidden content")).toBeVisible();
  });

  it("collapses content on second click", async () => {
    render(<TestCollapsible />);
    await userEvent.click(screen.getByText("Toggle"));
    await userEvent.click(screen.getByText("Toggle"));
    expect(screen.queryByText("Hidden content")).not.toBeVisible();
  });
});

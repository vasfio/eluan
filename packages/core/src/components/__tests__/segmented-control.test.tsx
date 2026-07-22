import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "../segmented-control";

// Built on Radix Tabs, so segments render with role="tab".
const TestControl = (
  props: React.ComponentProps<typeof SegmentedControl>
) => (
  <SegmentedControl defaultValue="week" {...props}>
    <SegmentedControlItem value="day">Day</SegmentedControlItem>
    <SegmentedControlItem value="week">Week</SegmentedControlItem>
    <SegmentedControlItem value="month">Month</SegmentedControlItem>
  </SegmentedControl>
);

describe("SegmentedControl", () => {
  it("renders all segments", () => {
    render(<TestControl />);
    expect(screen.getByRole("tab", { name: "Day" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Week" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Month" })).toBeInTheDocument();
  });

  it("selects the defaultValue segment", () => {
    render(<TestControl />);
    expect(screen.getByRole("tab", { name: "Week" })).toHaveAttribute(
      "data-state",
      "active"
    );
    expect(screen.getByRole("tab", { name: "Day" })).toHaveAttribute(
      "data-state",
      "inactive"
    );
  });

  it("changes selection on click", async () => {
    const handler = vi.fn();
    render(<TestControl onValueChange={handler} />);
    const month = screen.getByRole("tab", { name: "Month" });
    await userEvent.click(month);
    expect(handler).toHaveBeenCalledWith("month");
    expect(month).toHaveAttribute("data-state", "active");
    expect(screen.getByRole("tab", { name: "Week" })).toHaveAttribute(
      "data-state",
      "inactive"
    );
  });

  it("does not select a disabled segment", async () => {
    const handler = vi.fn();
    render(
      <SegmentedControl defaultValue="standard" onValueChange={handler}>
        <SegmentedControlItem value="standard">Standard</SegmentedControlItem>
        <SegmentedControlItem value="express" disabled>
          Express
        </SegmentedControlItem>
      </SegmentedControl>
    );
    const express = screen.getByRole("tab", { name: "Express" });
    expect(express).toBeDisabled();
    await userEvent.click(express);
    expect(handler).not.toHaveBeenCalled();
    expect(express).toHaveAttribute("data-state", "inactive");
  });

  it("disables every segment when the root is disabled", () => {
    render(<TestControl disabled />);
    expect(screen.getByRole("tab", { name: "Day" })).toBeDisabled();
    expect(screen.getByRole("tab", { name: "Week" })).toBeDisabled();
    expect(screen.getByRole("tab", { name: "Month" })).toBeDisabled();
  });
});

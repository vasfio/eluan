import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "../progress";

describe("Progress", () => {
  it("renders a progressbar", () => {
    render(<Progress value={40} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("exposes a state attribute (Radix)", () => {
    render(<Progress value={75} />);
    // Radix sets data-state to "loading" / "complete" / "indeterminate"
    // depending on the value. We assert the attribute is present rather
    // than pinning a specific value, which keeps the test resilient to
    // Radix internal changes.
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-state");
  });

  it("renders at 0 value", () => {
    render(<Progress value={0} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("forwards className", () => {
    render(<Progress value={50} className="custom" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AnimatedCounter } from "../animated-counter";

describe("AnimatedCounter", () => {
  it("renders the target value", () => {
    render(<AnimatedCounter value={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders with prefix and suffix", () => {
    render(<AnimatedCounter value={99} prefix="$" suffix="k" />);
    expect(screen.getByText(/99/)).toBeInTheDocument();
  });

  it("applies size classes", () => {
    const { container } = render(<AnimatedCounter value={10} size="lg" />);
    expect(container.firstChild).toHaveClass("text-5xl");
  });

  it("forwards className", () => {
    const { container } = render(<AnimatedCounter value={5} className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });
});

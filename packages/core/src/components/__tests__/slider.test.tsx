import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Slider } from "../slider";

describe("Slider", () => {
  it("renders a slider", () => {
    render(<Slider defaultValue={[50]} />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("reflects the default value", () => {
    render(<Slider defaultValue={[30]} min={0} max={100} />);
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "30");
  });

  it("is marked as disabled when disabled prop is set", () => {
    render(<Slider disabled defaultValue={[50]} />);
    // Radix exposes disabled via `data-disabled` on the slider thumb (it's
    // a span, not a native input — `toBeDisabled()` doesn't apply).
    expect(screen.getByRole("slider")).toHaveAttribute("data-disabled");
  });

  it("does not forward className overrides", () => {
    const { container } = render(<Slider defaultValue={[50]} {...({ className: "custom" } as never)} />);
    expect(container.firstChild).not.toHaveClass("custom");
  });
});

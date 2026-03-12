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

  it("is disabled when disabled prop set", () => {
    render(<Slider disabled defaultValue={[50]} />);
    expect(screen.getByRole("slider")).toBeDisabled();
  });

  it("forwards className", () => {
    const { container } = render(<Slider defaultValue={[50]} className="custom" />);
    expect(container.firstChild).toHaveClass("custom");
  });
});

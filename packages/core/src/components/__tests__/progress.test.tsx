import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Progress } from "../progress";

describe("Progress", () => {
  it("renders a progressbar", () => {
    render(<Progress value={40} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("sets aria-valuenow", () => {
    render(<Progress value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "75");
  });

  it("renders at 0 value", () => {
    render(<Progress value={0} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("forwards className", () => {
    render(<Progress value={50} className="custom" />);
    expect(screen.getByRole("progressbar")).toHaveClass("custom");
  });
});

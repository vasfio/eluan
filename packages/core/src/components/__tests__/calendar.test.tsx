import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Calendar } from "../calendar";

describe("Calendar", () => {
  it("renders without crashing", () => {
    const { container } = render(<Calendar mode="single" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<Calendar mode="single" />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  it("forwards className", () => {
    const { container } = render(<Calendar mode="single" className="custom-cal" />);
    expect(container.firstChild).toHaveClass("custom-cal");
  });
});

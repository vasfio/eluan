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

  it("does not forward className overrides", () => {
    const { container } = render(
      <Calendar {...({ className: "custom-cal" } as never)} mode="single" />
    );
    expect(container.querySelector(".custom-cal")).toBeNull();
  });
});

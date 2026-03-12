import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Pill } from "../pill";

describe("Pill", () => {
  it("renders children", () => {
    render(<Pill>React</Pill>);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("forwards className", () => {
    const { container } = render(<Pill className="bg-red-100">Tag</Pill>);
    expect(container.firstChild).toHaveClass("bg-red-100");
  });
});

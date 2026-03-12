import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { GradientText } from "../gradient-text";

describe("GradientText", () => {
  it("renders text content", () => {
    render(<GradientText>Awesome</GradientText>);
    expect(screen.getByText("Awesome")).toBeInTheDocument();
  });

  it("forwards className", () => {
    render(<GradientText className="text-4xl">Big Text</GradientText>);
    expect(screen.getByText("Big Text")).toHaveClass("text-4xl");
  });
});

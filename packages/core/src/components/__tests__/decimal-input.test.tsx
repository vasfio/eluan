import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DecimalInput } from "../decimal-input";

describe("DecimalInput", () => {
  it("renders without crashing", () => {
    render(<DecimalInput data-testid="dec" />);
    expect(screen.getByTestId("dec")).toBeInTheDocument();
  });

  it("renders disabled", () => {
    render(<DecimalInput disabled data-testid="dec" />);
    expect(screen.getByTestId("dec")).toBeDisabled();
  });
});

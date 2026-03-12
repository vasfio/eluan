import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { NumberInput } from "../number-input";

describe("NumberInput", () => {
  it("renders a number input", () => {
    render(<NumberInput data-testid="num" />);
    const input = screen.getByTestId("num");
    expect(input).toBeInTheDocument();
  });

  it("accepts numeric input", async () => {
    render(<NumberInput data-testid="num" />);
    await userEvent.type(screen.getByTestId("num"), "42");
    expect(screen.getByTestId("num")).toHaveValue(42);
  });

  it("renders disabled", () => {
    render(<NumberInput disabled data-testid="num" />);
    expect(screen.getByTestId("num")).toBeDisabled();
  });

  it("respects min and max", () => {
    render(<NumberInput min={0} max={100} data-testid="num" />);
    expect(screen.getByTestId("num")).toHaveAttribute("min", "0");
    expect(screen.getByTestId("num")).toHaveAttribute("max", "100");
  });
});

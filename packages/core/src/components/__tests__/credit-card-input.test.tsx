import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CreditCardInput } from "../credit-card-input";

describe("CreditCardInput", () => {
  it("renders without crashing", () => {
    render(<CreditCardInput />);
    expect(document.body.firstChild).toBeInTheDocument();
  });

  it("renders an input field", () => {
    render(<CreditCardInput />);
    const inputs = document.querySelectorAll("input");
    expect(inputs.length).toBeGreaterThan(0);
  });
});

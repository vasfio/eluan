import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("exposes the fields as a labeled group with accessible field names", () => {
    render(<CreditCardInput />);
    expect(
      screen.getByRole("group", { name: "Credit card details" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Card number")).toBeInTheDocument();
    expect(screen.getByLabelText("Expiration date (MM/YY)")).toBeInTheDocument();
    expect(screen.getByLabelText("Security code (CVV)")).toBeInTheDocument();
  });

  it("surfaces an invalid card number via aria-invalid after blur", async () => {
    render(<CreditCardInput />);
    const numberField = screen.getByLabelText("Card number");

    // Not flagged while untouched, even with content.
    await userEvent.type(numberField, "1234");
    expect(numberField).not.toHaveAttribute("aria-invalid", "true");

    // Leaving the field (blur) with an invalid number flags it.
    await userEvent.tab();
    expect(numberField).toHaveAttribute("aria-invalid", "true");
    expect(numberField).toHaveAttribute("aria-describedby");
    expect(screen.getByText("Enter a valid card number")).toBeInTheDocument();
  });
});

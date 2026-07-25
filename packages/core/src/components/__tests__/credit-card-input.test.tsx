import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
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

  it("does not call onCardChange on mount", () => {
    const onCardChange = vi.fn();
    render(<CreditCardInput onCardChange={onCardChange} />);
    // Reporting now happens from the edit handlers, not an effect, so an
    // untouched card never fires a spurious empty change on mount.
    expect(onCardChange).not.toHaveBeenCalled();
  });

  it("calls onCardChange with the parsed card once a field is edited", async () => {
    const onCardChange = vi.fn();
    render(<CreditCardInput onCardChange={onCardChange} />);

    await userEvent.type(screen.getByLabelText("Card number"), "4111111111111111");

    expect(onCardChange).toHaveBeenCalled();
    const last = onCardChange.mock.calls.at(-1)![0];
    expect(last.number).toBe("4111111111111111");
    expect(last.cardType).toBe("visa");
  });
});

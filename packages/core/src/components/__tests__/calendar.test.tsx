import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
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

  it("reports navigation through onMonthChange when the month is controlled", async () => {
    const onMonthChange = vi.fn();
    render(
      <Calendar
        mode="single"
        month={new Date(2024, 0, 15)}
        onMonthChange={onMonthChange}
      />
    );

    // The custom next button now goes through the controllable-state setter,
    // which forwards to the consumer's onMonthChange (previously it only mutated
    // internal state, so a controlled parent never heard about it).
    await userEvent.click(screen.getByLabelText("Go to next month"));

    expect(onMonthChange).toHaveBeenCalledTimes(1);
    const next = onMonthChange.mock.calls[0][0] as Date;
    expect(next.getMonth()).toBe(1); // February — one month after the controlled January
  });

  it("advances the displayed month on navigation when uncontrolled", async () => {
    render(<Calendar mode="single" defaultMonth={new Date(2024, 0, 1)} />);
    expect(screen.getByText("January")).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("Go to next month"));
    expect(screen.getByText("February")).toBeInTheDocument();
  });
});

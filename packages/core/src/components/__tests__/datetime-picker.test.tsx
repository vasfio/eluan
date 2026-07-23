import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { DateTimePicker } from "../datetime-picker";

describe("DateTimePicker", () => {
  it("renders without crashing", () => {
    render(<DateTimePicker />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("uses the TimeInput component in the popover (Hours/Minutes segments)", async () => {
    const user = userEvent.setup();
    render(<DateTimePicker value={new Date(2024, 0, 15, 14, 30)} use24Hour />);
    await user.click(screen.getByRole("button"));
    expect(await screen.findByLabelText("Hours")).toBeInTheDocument();
    expect(screen.getByLabelText("Minutes")).toBeInTheDocument();
    // Seconds only appear when requested.
    expect(screen.queryByLabelText("Seconds")).toBeNull();
  });

  it("shows a seconds segment when showSeconds is set", async () => {
    const user = userEvent.setup();
    render(
      <DateTimePicker value={new Date(2024, 0, 15, 14, 30, 45)} use24Hour showSeconds />
    );
    await user.click(screen.getByRole("button"));
    expect(await screen.findByLabelText("Seconds")).toBeInTheDocument();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { TimeInput } from "../time-input";

function Controlled({
  initial,
  format,
  showSeconds,
}: {
  initial: string;
  format: "12" | "24";
  showSeconds?: boolean;
}) {
  const [v, setV] = useState(initial);
  return (
    <TimeInput value={v} onValueChange={setV} format={format} showSeconds={showSeconds} />
  );
}

describe("TimeInput", () => {
  it("renders the hours and minutes segments from the value", () => {
    render(<TimeInput value="14:30" format="24" />);
    expect((screen.getByLabelText("Hours") as HTMLInputElement).value).toBe("14");
    expect((screen.getByLabelText("Minutes") as HTMLInputElement).value).toBe("30");
  });

  it("keeps focus after the first hour digit so a two-digit hour can be entered (24h)", async () => {
    const user = userEvent.setup();
    render(<Controlled initial="14:30" format="24" />);
    const hours = screen.getByLabelText("Hours") as HTMLInputElement;
    const minutes = screen.getByLabelText("Minutes") as HTMLInputElement;

    await user.click(hours);
    await user.keyboard("1");
    // The first digit must not auto-advance or be discarded.
    expect(hours).toHaveFocus();
    expect(hours.value).toBe("1");

    await user.keyboard("5");
    // The second digit is preserved (regression: it used to be clobbered by
    // a stale blur when focus advanced, saving only the first digit).
    expect(hours.value).toBe("15");
    await waitFor(() => expect(minutes).toHaveFocus());
  });

  it("keeps focus after the first hour digit (12h) and completes a two-digit hour", async () => {
    const user = userEvent.setup();
    render(<Controlled initial="09:30 AM" format="12" />);
    const hours = screen.getByLabelText("Hours") as HTMLInputElement;
    const minutes = screen.getByLabelText("Minutes") as HTMLInputElement;

    await user.click(hours);
    await user.keyboard("1");
    expect(hours).toHaveFocus();
    expect(hours.value).toBe("1");

    await user.keyboard("2");
    expect(hours.value).toBe("12");
    await waitFor(() => expect(minutes).toHaveFocus());
  });

  it("auto-advances when the first digit cannot be extended (24h first digit >= 3)", async () => {
    const user = userEvent.setup();
    render(<Controlled initial="14:30" format="24" />);
    const hours = screen.getByLabelText("Hours") as HTMLInputElement;
    const minutes = screen.getByLabelText("Minutes") as HTMLInputElement;

    await user.click(hours);
    await user.keyboard("3");
    await waitFor(() => expect(minutes).toHaveFocus());
    expect(hours.value).toBe("03");
  });

  it("emits the entered time via onValueChange", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<TimeInput value="14:30" format="24" onValueChange={onValueChange} />);
    const hours = screen.getByLabelText("Hours") as HTMLInputElement;

    await user.click(hours);
    await user.keyboard("0");
    await user.keyboard("9");
    expect(onValueChange).toHaveBeenLastCalledWith("09:30");
  });

  it("increments the hour with ArrowUp", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<TimeInput value="14:30" format="24" onValueChange={onValueChange} />);
    const hours = screen.getByLabelText("Hours") as HTMLInputElement;

    await user.click(hours);
    await user.keyboard("{ArrowUp}");
    expect(onValueChange).toHaveBeenLastCalledWith("15:30");
  });

  it("renders a seconds segment and emits HH:MM:SS when showSeconds is set (24h)", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <TimeInput value="14:30:45" format="24" showSeconds onValueChange={onValueChange} />
    );
    const seconds = screen.getByLabelText("Seconds") as HTMLInputElement;
    expect(seconds.value).toBe("45");

    await user.click(seconds);
    await user.keyboard("0");
    await user.keyboard("9");
    expect(onValueChange).toHaveBeenLastCalledWith("14:30:09");
  });

  it("emits HH:MM:SS AM/PM with seconds in 12h format", () => {
    render(<TimeInput value="09:08:07 PM" format="12" showSeconds />);
    expect((screen.getByLabelText("Hours") as HTMLInputElement).value).toBe("09");
    expect((screen.getByLabelText("Minutes") as HTMLInputElement).value).toBe("08");
    expect((screen.getByLabelText("Seconds") as HTMLInputElement).value).toBe("07");
  });

  it("advances focus from minutes to seconds after a two-digit minute", async () => {
    const user = userEvent.setup();
    render(<Controlled initial="14:30:45" format="24" showSeconds />);
    const minutes = screen.getByLabelText("Minutes") as HTMLInputElement;
    const seconds = screen.getByLabelText("Seconds") as HTMLInputElement;

    await user.click(minutes);
    await user.keyboard("1");
    expect(minutes.value).toBe("1");
    await user.keyboard("5");
    expect(minutes.value).toBe("15");
    await waitFor(() => expect(seconds).toHaveFocus());
  });

  it("does not render a seconds segment by default", () => {
    render(<TimeInput value="14:30" format="24" />);
    expect(screen.queryByLabelText("Seconds")).toBeNull();
  });
});
